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
                using (var db = new BroadbandZoneEntities())
                {
                    GetRegistrationDetails_Result record = db.GetRegistrationDetails(id).FirstOrDefault();
                    return Ok(record);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody] Registration newRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.PasswordHash = db.GenerateEncryptedPwd(newRecord.Password).FirstOrDefault();
                    newRecord.CreatedOn = DateTime.Now;
                    db.Registrations.Add(newRecord);
                    db.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

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