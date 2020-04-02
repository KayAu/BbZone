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
    public class AdminUserController : ApiController
    {

        [HttpGet]
        // GET: api/StorageLocations
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                var records = ModelHelper.GetListdata((new BroadbandZoneEntities()).GetAdminUsers, currentPage, pageSize, sortColumn, sortInAsc);
                return Ok(records);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]AdminUser newRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.PasswordHash = db.GenerateEncryptedPwd(newRecord.Password).FirstOrDefault();
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.AdminUsers.Add(newRecord);
                    db.SaveChanges();

                    var records = ModelHelper.GetListdata(db.GetAdminUsers, 1, Constants.DefaultPageSize, string.Empty, false);
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
        public IHttpActionResult Put(int id, [FromBody]AdminUser editedRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    db.Entry(editedRecord).State = EntityState.Modified;
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");

                    if (editedRecord.Password != "******")
                    {
                        editedRecord.PasswordHash = db.GenerateEncryptedPwd(editedRecord.Password).FirstOrDefault();
                    }

                    db.SaveChanges();
                    return Ok(editedRecord);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

    }
}