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
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
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
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Dashboard/GetMonthlyApplications")]
        public IHttpActionResult GetMonthlyApplications()
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                ChartHelper chartHelper = new ChartHelper();
                using (var db = new BroadbandZoneEntities())
                {
                    var monthlyApplications = chartHelper.TranslateStackBarData(db.DboardMonthlyApplications().ToDataTable<DboardMonthlyApplications_Result>());
                    var topSellers = db.DboardTopSalesPackage(currentUser.AgentId, currentUser.Username).ToList();
                    var sales = db.DboardTotalSalesAndCommission(currentUser.AgentId, currentUser.Username).FirstOrDefault();
                    return Ok(new { MonthlyApplications = monthlyApplications,
                                    TopSellers = topSellers,
                                    TotalApplications = sales.TotalApplications,
                                    TotalCommission = sales.TotalCommission});
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