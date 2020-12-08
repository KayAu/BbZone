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
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class AgentPocketController : ApiController
    {
        private AuthenticatedUser currentUser;
        public AgentPocketController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }

        // GET: api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                SearchAgentPocketdParams filterBy = JsonConvert.DeserializeObject<SearchAgentPocketdParams>(searchParams);
                var records = LoadAgentPockets(currentPage, pageSize, sortColumn, sortInAsc, filterBy);
                return Ok(records);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]AgentPocket newRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.AgentPockets.Add(newRecord);
                    db.SaveChanges();

                    var records = LoadAgentPockets(1, Constants.DefaultPageSize, string.Empty, false, new SearchAgentPocketdParams());
                    return Ok(records);
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
        public IHttpActionResult Put(int id, [FromBody]AgentPocket editedRecord)
        {
            try
            {
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
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private WithdrawalSubmit<GetAgentPocket_Result> LoadAgentPockets(int currentPage, int pageSize, string sortColumn, bool sortInAsc, SearchAgentPocketdParams filterBy)
        {
            ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
            var records = (new BroadbandZoneEntities()).GetAgentPocket(currentPage,
                                                                        pageSize,
                                                                        sortColumn,
                                                                        sortInAsc,
                                                                        filterBy.Keyword,
                                                                        filterBy.FlowType,
                                                                        filterBy.IsActive,
                                                                        totalRecord).ToList();
            return new WithdrawalSubmit<GetAgentPocket_Result>()
            {
                DisplayData = records,
                TotalRecords = Convert.ToInt32(totalRecord.Value),
            };
        }
    }

}