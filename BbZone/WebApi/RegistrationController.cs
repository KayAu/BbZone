using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class RegistrationController : ApiController
    {
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                ApprovalAndKeywordParams filterBy = JsonConvert.DeserializeObject<ApprovalAndKeywordParams>(searchParams);
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    var results = (new BroadbandZoneEntities()).GetAgentRegistration(currentPage, 
                                                                                    pageSize, 
                                                                                    sortColumn, 
                                                                                    sortInAsc,
                                                                                    filterBy.Keyword, 
                                                                                    filterBy.ApprovalMode,
                                                                                    totalRecord).ToList();
                    return Ok(new Gridview<GetAgentRegistration_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    GetRegistrationDetails_Result record = db.GetRegistrationDetails(id).FirstOrDefault();
                    List<RegistrationDocument> registrationDocuments =  db.RegistrationDocuments.Where(d => d.RegId == id).ToList();

                    return Ok(new { RegistrationDetails = record, registrationDocuments = registrationDocuments });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        public async Task<IHttpActionResult> Post()
        {
            try
            {
                Registration newRecord = new Registration();
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.RegistrationFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                // save new customer order 
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord = JsonConvert.DeserializeObject<Registration>(result.FormData["data"]);
                    newRecord.PasswordHash = db.GenerateEncryptedPwd(newRecord.Password).FirstOrDefault();
                    newRecord.CreatedOn = DateTime.Now;
                    db.Registrations.Add(newRecord);
                    db.SaveChanges();
                }

                // save uploaded file details to database
                SaveUploadedFilePath(result.FileData, newRecord.RegId);

                // send email notification to admin
                MailHelper.SendNewRegistrationEmail(newRecord);

                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private void SaveUploadedFilePath(Collection<MultipartFileData> multipartFiles, int regId)
        {
            try
            {
                if (multipartFiles is null || multipartFiles.Count() == 0) return;

                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.RegistrationFilePath);
                using (var db = new BroadbandZoneEntities())
                {
                    foreach (UploadedFile file in fileUploadHelper.UploadStreams(multipartFiles.ToArray(), regId))
                    {
                        db.RegistrationDocuments.Add(new RegistrationDocument { Name = file.Name, Path = file.FilePath, Size = file.Size, RegId = regId });
                        db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public async Task<IHttpActionResult> Put(int id)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.RegistrationFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                Registration editedRecord = JsonConvert.DeserializeObject<Registration>(result.FormData["data"]);
                RemoveUnwantedFiles(editedRecord.RegistrationDocuments);

                // save uploaded file details to database
                SaveUploadedFilePath(result.FileData, id);

                using (var db = new BroadbandZoneEntities())
                {
                    if (editedRecord.IsApproved != null)
                    {
                        editedRecord.ApprovalDate = DateTime.Now;
                        editedRecord.ApprovedBy = currentUser.Username;
                    }
                    editedRecord.RegistrationDocuments = null;
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();

                    if (editedRecord.IsApproved == true)
                    {
                        ObjectParameter activationCode = new ObjectParameter("oActivationCode", typeof(string));
                        db.GenerateActivationCode(editedRecord.RegId, activationCode);
                        MailHelper.SendActivationEmail(editedRecord.Email, editedRecord.Fullname, activationCode.Value);
                    }

                    return Ok(editedRecord);
                }    
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private void RemoveUnwantedFiles(ICollection<RegistrationDocument> agentDocs)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.RegistrationFilePath);

                using (var db = new BroadbandZoneEntities())
                {
                    foreach (RegistrationDocument doc in agentDocs)
                    {
                        if (doc.Deleted.HasValue && doc.Deleted == true)
                        {
                            db.RegistrationDocuments.Remove(db.RegistrationDocuments.Find(doc.RegId));
                            db.SaveChanges();

                            // remove file from disk
                            fileUploadHelper.RemoveFile(doc.Name);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        //// PUT api/<controller>/5
        //public IHttpActionResult Put(int id, [FromBody] Registration editedRecord)
        //{
        //    try
        //    {
        //        AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
        //        using (var db = new BroadbandZoneEntities())
        //        {
        //            if (editedRecord.IsApproved != null)
        //            {
        //                editedRecord.ApprovalDate = DateTime.Now;
        //                editedRecord.ApprovedBy = currentUser.Username;
        //            }

        //            db.Entry(editedRecord).State = EntityState.Modified;
        //            db.SaveChanges();

        //            if (editedRecord.IsApproved == true)
        //            {
        //                ObjectParameter activationCode = new ObjectParameter("oActivationCode", typeof(string));
        //                db.GenerateActivationCode(editedRecord.RegId, activationCode);
        //                MailHelper.SendActivationEmail(editedRecord.Email, editedRecord.Fullname, activationCode.Value);
        //            }

        //            return Ok(editedRecord);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
        //        return Content(HttpStatusCode.BadRequest, ex.Message);
        //    }
        //}


    }
}