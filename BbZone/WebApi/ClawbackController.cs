using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
                StatusAndKeywordParams filterBy = JsonConvert.DeserializeObject<StatusAndKeywordParams>(searchParams);

                var records = Helper.ModelHelper.GetListdata((new BroadbandZoneEntities()).GetClawback, currentPage, pageSize, sortColumn, sortInAsc, filterBy.Keyword);
                return Ok(records);

            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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

                    var records = ModelHelper.GetListdata(db.GetClawback, 1, Constants.DefaultPageSize, string.Empty, false, string.Empty);
                    return Ok(records);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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

                return Ok(editedRecord);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                        db.Clawbacks.Remove(deleteRecord);
                        db.SaveChanges();
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.NotImplemented, ex.Message);
            }
        }
    }
}