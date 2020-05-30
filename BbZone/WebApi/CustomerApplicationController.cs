using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Net.Http.Headers;

namespace BroadbandZone_App.WebApi
{
    public class CustomerApplicationController : ApiController
    {


        [HttpGet]
        [Route("api/CustomerApplication/CheckCommissionSettings/{categoryId}/{agent}")]
        public IHttpActionResult CheckCommissionSettings(int categoryId, string agent)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    var results = db.HasCommissionSet(categoryId, agent).FirstOrDefault();
                    return Ok(results != null ? results.IsConfigured : false);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.NotImplemented, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/CustomerApplication/FindClaimedApplication/{keyword}")]
        public IHttpActionResult Find(string keyword)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    var results = db.FindClaimedApplication(keyword).ToList();
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.NotImplemented, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/CustomerApplication/FindCompletedApplication/{keyword}")]
        public IHttpActionResult FindCompleated(string keyword)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    var results = db.FindCompletedApplication(keyword).ToList();
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.NotImplemented, ex.Message);
            }
        }

      
        // GET: api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                SearchOrderParams filterBy = JsonConvert.DeserializeObject<SearchOrderParams>(searchParams);

                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    ObjectParameter totalUnreadMsg = new ObjectParameter("oTotalUnreadMsg", typeof(int));
                    ObjectParameter totalCommINotConfig = new ObjectParameter("oTotalCommINotConfig", typeof(int));
                    ObjectParameter totalOddClaimed = new ObjectParameter("oTotalOddClaimed", typeof(int));

                    var results = (new BroadbandZoneEntities()).GetCustomerApplication(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                filterBy.ProductId,
                                                                                filterBy.ProductCategoryId,
                                                                                filterBy.ProductPackageId,
                                                                                filterBy.OrderStatusId,
                                                                                filterBy.Agent,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                                filterBy.ActivationDate != null ? filterBy.ActivationDate.StartDate : null,
                                                                                filterBy.ActivationDate != null ? filterBy.ActivationDate.EndDate : null,
                                                                                filterBy.ResidentialType,
                                                                                filterBy.Keyword,
                                                                                filterBy.DocumentCompleted,
                                                                                currentUser.IsAdmin,
                                                                                currentUser.AgentId,
                                                                                filterBy.FilterByMode,
                                                                                totalRecord,
                                                                                totalUnreadMsg,
                                                                                totalCommINotConfig,
                                                                                totalOddClaimed).ToList();
                    return Ok(new 
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value),
                        TotalUnreadMsg = Convert.ToInt32(totalUnreadMsg.Value),
                        TotalCommINotConfig = Convert.ToInt32(totalCommINotConfig.Value),
                        TotalOddClaimed = Convert.ToInt32(totalOddClaimed.Value)
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
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities(true))
                {
                    GetApplicationDetails_Result results = db.GetApplicationDetails(id, currentUser.IsAdmin).FirstOrDefault();
                    if (results != null)
                    {
                        ModelHelper.CopyPropertiesTo<GetApplicationDetails_Result, CustomerApplication>(results, out CustomerApplication appDetails);
                        appDetails.CustomerDocuments = db.CustomerDocuments.Where(d => d.ApplicationId == id).ToList();
                        return Ok(appDetails);
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        public async Task<IHttpActionResult> Post()//[FromBody]CustomerOrder newRecord
        {
            try
            {
                CustomerApplication newRecord = new CustomerApplication();
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.UploadFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                // save new customer order 
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord = JsonConvert.DeserializeObject<CustomerApplication>(result.FormData["data"]);
                    newRecord.AppStatusId = newRecord.SubmitByAgent.GetValueOrDefault() == true ? 8 : 1 ;
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.CustomerApplications.Add(newRecord);
                    db.SaveChanges();
                }
                
                // save uploaded file details to database
                SaveUploadedFilePath(result.FileData, newRecord.ApplicationId);

                // send email notification to admin
                MailHelper.SendNewApplicationEmail(newRecord);

                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        
        public async Task<IHttpActionResult> Put(int id)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.UploadFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                CustomerApplication editedRecord = JsonConvert.DeserializeObject<CustomerApplication>(result.FormData["data"]);
                RemoveUnwantedFiles(editedRecord.CustomerDocuments);

                // save new customer order 
                using (var db = new BroadbandZoneEntities(true))
                {
                    editedRecord.CustomerDocuments = null;
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();

                    // Update agent current commission if the application is completed as well as the activation date
                    db.UpdateCompletedAppCommission(id, editedRecord.Agent, currentUser.Fullname);
                }

                // save uploaded file details to database
                SaveUploadedFilePath(result.FileData, id);

                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private void SaveUploadedFilePath(Collection<MultipartFileData> multipartFiles,  int appId)
        {
            try
            {
                if (multipartFiles is null || multipartFiles.Count() == 0) return;
            
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.UploadFilePath);
                using (var db = new BroadbandZoneEntities())
                {
                    foreach (UploadedFile file in fileUploadHelper.UploadStreams(multipartFiles.ToArray(), appId))
                    {
                        db.CustomerDocuments.Add(new CustomerDocument { Name = file.Name, Path = file.FilePath, Size = file.Size, ApplicationId = appId });
                        db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private void RemoveUnwantedFiles(ICollection<CustomerDocument> customerDocs)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.UploadFilePath);

                using (var db = new BroadbandZoneEntities())
                {
                    foreach (CustomerDocument doc in customerDocs)
                    {
                        if (doc.Deleted.HasValue && doc.Deleted == true)
                        {
                            db.CustomerDocuments.Remove(db.CustomerDocuments.Find(doc.DocId));
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

    }
}