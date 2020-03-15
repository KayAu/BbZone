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

namespace BroadbandZone_App.WebApi
{
    public class AnnouncementController : ApiController
    {
        [HttpGet]
        [Route("api/Announcement/GetAnnouncements")]
        public IHttpActionResult GetAnnouncements()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var annc = db.Announcements.Where(a => a.IsActive == true)
                                                .Select(a => new
                                                {
                                                    AnncId = a.AnncId,
                                                    Title = a.Title,
                                                    Descriptions = a.Descriptions,
                                                    IsActive = a.IsActive,
                                                    CreatedOn = a.CreatedOn,
                                                    AnnouncementDocuments = a.AnnouncementDocuments.Select(d=>d.Name).ToList()
                                                })
                                                .OrderBy(a => a.CreatedOn).ToList();
                    return Ok(annc);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // GET: api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                StatusAndKeywordParams filterBy = JsonConvert.DeserializeObject<StatusAndKeywordParams>(searchParams);

                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    var results = (new BroadbandZoneEntities()).GetAnnouncement(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                filterBy.Keyword,
                                                                                filterBy.IsActive,
                                                                                totalRecord).ToList();
                    return Ok(new Gridview<GetAnnouncement_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    Announcement annc = db.Announcements.Include(a => a.AnnouncementDocuments)
                                                        .Where(a => a.AnncId == id).FirstOrDefault();

                    return Ok(annc);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST api/<controller>
        public async Task<IHttpActionResult> Post()//[FromBody]CustomerOrder newRecord
        {
            try
            {
                Announcement newRecord = new Announcement();
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.AnnouncementFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                // save new customer order 
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord = JsonConvert.DeserializeObject<Announcement>(result.FormData["data"]);
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.Announcements.Add(newRecord);
                    db.SaveChanges();
                }

                // save uploaded file details to database
                SaveUploadedFilePath(result.FileData, newRecord.AnncId);

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // PUT api/<controller>/5
        public async Task<IHttpActionResult> Put(int id)
        {
            try
            {
                Console.Write(HttpContext.Current.User.Identity.Name);
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.AnnouncementFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                Announcement editedRecord = JsonConvert.DeserializeObject<Announcement>(result.FormData["data"]);
                RemoveUnwantedFiles(editedRecord.AnnouncementDocuments);

                // save new customer order 
                using (var db = new BroadbandZoneEntities(true))
                {
                    editedRecord.AnnouncementDocuments = null;
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();
                }

                // save uploaded file details to database
                SaveUploadedFilePath(result.FileData, id);

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void SaveUploadedFilePath(Collection<MultipartFileData> multipartFiles, int announcementId)
        {
            try
            {
                if (multipartFiles is null || multipartFiles.Count() == 0) return;
                FileUploadHelper fileUploadHelper = new FileUploadHelper(Properties.Settings.Default.AnnouncementFilePath);

                using (var db = new BroadbandZoneEntities())
                {
                    foreach (UploadedFile file in fileUploadHelper.UploadStreams(multipartFiles.ToArray(), announcementId))
                    {
                        db.AnnouncementDocuments.Add(new AnnouncementDocument { Name = file.Name, Size = file.Size, AnncId = announcementId });
                        db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private void RemoveUnwantedFiles(ICollection<AnnouncementDocument> announcementDocs)
        {
            try
            {
                FileUploadHelper fileUploadHelper = new FileUploadHelper(Properties.Settings.Default.AnnouncementFilePath);

                using (var db = new BroadbandZoneEntities())
                {
                    foreach (AnnouncementDocument doc in announcementDocs)
                    {
                        if (doc.Deleted.HasValue && doc.Deleted == true)
                        {
                            var removeDoc = db.AnnouncementDocuments.Find(doc.DocId);
                            db.AnnouncementDocuments.Remove(removeDoc);
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