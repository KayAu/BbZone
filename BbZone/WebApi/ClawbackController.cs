using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class ClawbackController : ApiController
    {
        // GET: api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                SearchClawbackParams filterBy = JsonConvert.DeserializeObject<SearchClawbackParams>(searchParams);
                var results = LoadClawback(currentPage, pageSize, sortColumn, sortInAsc, filterBy);
                return Ok(results);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]Clawback newRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.Clawbacks.Add(newRecord);
                    db.SaveChanges();

                    var results = LoadClawback(1, Constants.DefaultPageSize, string.Empty, false, new SearchClawbackParams());
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody]Clawback editedRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    db.Entry(editedRecord).State = EntityState.Modified;
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.SaveChanges();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var deleteRecord = db.Clawbacks.Find(id);
                    if (deleteRecord != null)
                    {
                        AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                        deleteRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                        deleteRecord.Cancelled = true;
                        db.SaveChanges();
                    }
                    return Ok(deleteRecord);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.NotImplemented, ex.Message);
            }
        }

        private Gridview<GetClawback_Result> LoadClawback(int currentPage, int pageSize, string sortColumn, bool sortInAsc, SearchClawbackParams filterBy)
        {
            AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
            ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
            var results = (new BroadbandZoneEntities()).GetClawback(currentPage,
                                                                    pageSize,
                                                                    sortColumn,
                                                                    sortInAsc,
                                                                    filterBy.Keyword,
                                                                    filterBy.IsDeducted,
                                                                    currentUser.AgentId,
                                                                    currentUser.IsAdmin,
                                                                    totalRecord).ToList();
            return (new Gridview<GetClawback_Result>()
            {
                DisplayData = results,
                TotalRecords = Convert.ToInt32(totalRecord.Value)
            });
        }
    }
}