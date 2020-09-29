using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace BroadbandZone_App.WebApi
{
    public class ReportAgentWithdrawalController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                DateRange filterBy = JsonConvert.DeserializeObject<DateRange>(searchParams);

                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalAgents = new ObjectParameter("oTotalRecord", typeof(int));
                    var results = (new BroadbandZoneEntities()).ReportAgentWithdrawal(currentPage, 
                                                                                        pageSize, 
                                                                                        sortColumn, 
                                                                                        sortInAsc,
                                                                                        filterBy.StartDate,
                                                                                        filterBy.EndDate,
                                                                                        totalAgents).ToList();
                    return Ok(new
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalAgents.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [Route("api/ReportAgentWithdrawal/Download")]
        public HttpResponseMessage Download([FromBody] DateRange filterBy)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        //DateRange filterBy = JsonConvert.DeserializeObject<DateRange>(searchParams);
                        var results = db.ReportAgentWithdrawalDownload(filterBy.StartDate, filterBy.EndDate).ToList();
                        return ExcelHelper.ReadDataToExcel<ReportAgentWithdrawalDownload_Result>(results, "AgentWithdrawal");
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return null;
            }
        }
    }
}