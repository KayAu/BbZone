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
                    var results = (new BroadbandZoneEntities()).GetAgentRegistration(currentPage, pageSize, sortColumn, sortInAsc,
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.UploadFilePath));
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

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
        //// POST api/<controller>
        //public IHttpActionResult Post([FromBody] Registration newRecord)
        //{
        //    try
        //    {

        //        using (var db = new BroadbandZoneEntities())
        //        {
        //            newRecord.PasswordHash = db.GenerateEncryptedPwd(newRecord.Password).FirstOrDefault();
        //            newRecord.CreatedOn = DateTime.Now;
        //            db.Registrations.Add(newRecord);
        //            db.SaveChanges();
        //            return Ok();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
        //    }
        //}

        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, [FromBody] Registration editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    editedRecord.ApprovalDate = DateTime.Now;
                    editedRecord.ApprovedBy = this.User.Identity.Name;
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();

                    if (editedRecord.IsApproved == true)
                    {
                        // send activation code to agent
                        db.SendActivationCode(id, editedRecord.Email);
                    }

                    return Ok(editedRecord);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}