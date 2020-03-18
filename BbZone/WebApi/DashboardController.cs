using BroadbandZone_App.Helper;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class DashboardController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        [Route("api/Dashboard/GetMyTeamSubmissions")]
        // GET api/<controller>
        public IHttpActionResult GetMyTeamSubmissions()
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalAgents = new ObjectParameter("oTotalAllAgents", typeof(int));
                    var results = (new BroadbandZoneEntities()).DashboardMyTeamSubmissions(currentUser.AgentId, totalAgents).ToList();
                    return Ok(new
                    {
                        DisplayData = results,
                        TotalAgents =  Convert.ToInt32(totalAgents.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET api/<controller>
        [HttpGet]
        [Route("api/Dashboard/GetSubmissionStatusCount/{year}")]
        // GET api/<controller>
        public IHttpActionResult GetSubmissionStatusCount(int year)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalAgents = new ObjectParameter("oTotalAllAgents", typeof(int));
                    var results = (new BroadbandZoneEntities()).DboardSubmissionStatusCount(currentUser.AgentId, year).FirstOrDefault();
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}