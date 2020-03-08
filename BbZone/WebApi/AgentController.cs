using BroadbandZone_App.Helper;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class AgentController : ApiController
    {
        [HttpGet]
        [Route("api/Agent/CheckValidity/{agentId}")]
        public IHttpActionResult CheckValidity(int agentId)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var agentName = db.Agents.Where(a => a.AgentId == agentId).Select(a=>a.Fullname).FirstOrDefault();
                    return Ok(agentName);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    
        public IHttpActionResult GetProfile()
        {
            try
            {
                // GET api/<controller>
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                using (var db = new BroadbandZoneEntities())
                {
                    var agent = db.GetAgentProfile(currentUser.Username).FirstOrDefault();
                    return Ok(agent);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //[HttpGet]
        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpPost]
        // POST api/<controller>
        public void Post([FromBody]Agent value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody]Agent editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.Entry(editedRecord).Property(e => e.UserLogin).IsModified = false;
                    db.Entry(editedRecord).Property(e => e.PasswordHash).IsModified = false;
                    editedRecord.SetDateAndAuthor("ModifiedBy", "ModifiedOn");
                  
                    db.SaveChanges();
                    return Ok(editedRecord);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}