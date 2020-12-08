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
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class AgentController : ApiController
    {
        private AuthenticatedUser currentUser;
        public AgentController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }

        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                StatusAndKeywordParams filterBy = JsonConvert.DeserializeObject<StatusAndKeywordParams>(searchParams);
                var records = ModelHelper.GetListdata((new BroadbandZoneEntities()).GetAgents, currentPage, pageSize, sortColumn, sortInAsc, filterBy.Keyword, filterBy.IsActive);
                return Ok(records);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Agent/GetAgents/{agentId}")]
        public IHttpActionResult GetAgents(string agentId)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    //var agentName = db.Agents.Where(a => a.AgentId == agentId).Select(a => a.Fullname).FirstOrDefault();
                    var agents = db.Agents.Where(a => a.UserLogin.StartsWith(agentId)).Select(a => new { Fullname = a.UserLogin, AgentId = a.AgentId }).ToList();
                    return Ok(agents);
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
                using (var db = new BroadbandZoneEntities())
                {
                    var agent = db.GetAgentProfile(currentUser.Username, null).FirstOrDefault();
                    return Ok(agent);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var agent = db.GetAgentProfile(null, id).FirstOrDefault();
                    return Ok(agent);
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
        public IHttpActionResult Put(int id, [FromBody]Agent editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.Entry(editedRecord).Property(e => e.UserLogin).IsModified = false;
                    db.Entry(editedRecord).Property(e => e.PasswordHash).IsModified = false;
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");

                    db.SaveChanges();
                    return Ok(editedRecord);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


    }
}