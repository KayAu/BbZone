using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class IncentivesController : ApiController
    {
       
        [HttpGet]
        //[Route("api/Incentives/Download/{searchParams}")]
        public HttpResponseMessage Download([FromUri] SearchIncentivesParams filterBy)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        //SearchIncentivesParams filterBy = JsonConvert.DeserializeObject<SearchIncentivesParams>(searchParams);
                        var results = db.GetIncentivesReceivedForDownload(filterBy.ProductId,
                                                                        filterBy.ProductCategoryId,
                                                                        filterBy.ProductPackageId,
                                                                        filterBy.Keyword,
                                                                        filterBy.ReceivedDate != null ? filterBy.ReceivedDate.StartDate : null,
                                                                        filterBy.ReceivedDate != null ? filterBy.ReceivedDate.EndDate : null).ToList();
                        DataTable dt = results.ToDataTable();
                        wb.Worksheets.Add(dt, "Incentives Received");
                        MemoryStream stream = new MemoryStream();
                        wb.SaveAs(stream);

                        var result = new HttpResponseMessage(HttpStatusCode.OK);
                        result.Content = new ByteArrayContent(stream.ToArray());
                        result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                        result.Content.Headers.ContentDisposition.FileName = $"IncentivesReceived_{DateTime.Now.ToShortDateString()}.xlsx";
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                        return result;

                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return new HttpResponseMessage(System.Net.HttpStatusCode.ExpectationFailed);
            }
        }

        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                SearchIncentivesParams filterBy = JsonConvert.DeserializeObject<SearchIncentivesParams>(searchParams);
                var records = GetIncentivesReceived(currentPage, pageSize, sortColumn, sortInAsc, filterBy);
                return Ok(records);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public IHttpActionResult Post([FromBody]IncentiveReceived newRecord)//[FromBody]CustomerOrder newRecord
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.IncentiveReceiveds.Add(newRecord);
                    db.SaveChanges();

                    var records = GetIncentivesReceived(1, Constants.DefaultPageSize, string.Empty, false, new SearchIncentivesParams());
                    return Ok(records);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private IncentivesView<GetIncentivesReceived_Result> GetIncentivesReceived(int currentPage, int pageSize, string sortColumn, bool sortInAsc, SearchIncentivesParams filterBy)
        {
            using (var db = new BroadbandZoneEntities())
            {
                ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                var results = (new BroadbandZoneEntities()).GetIncentivesReceived(currentPage, pageSize, sortColumn, sortInAsc,
                                                                            filterBy.ProductId,
                                                                            filterBy.ProductCategoryId,
                                                                            filterBy.ProductPackageId,
                                                                            filterBy.Keyword,
                                                                            filterBy.ReceivedDate != null ? filterBy.ReceivedDate.StartDate : null,
                                                                            filterBy.ReceivedDate != null ? filterBy.ReceivedDate.EndDate : null,
                                                                            totalRecord).ToList();
                return new IncentivesView<GetIncentivesReceived_Result>()
                {
                    DisplayData = results,
                    TotalRecords = Convert.ToInt32(totalRecord.Value),
                    TotalAmountReceived = results.Select(r => r.IncentiveAmt).Sum()
                };
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody]IncentiveReceived editedRecord)
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                using (var db = new BroadbandZoneEntities())
                {
                    var deleteRecord = db.IncentiveReceiveds.Find(id);
                    if (deleteRecord != null)
                    {
                        deleteRecord.IsActive = false;
                        deleteRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                        db.Entry(deleteRecord).State = EntityState.Modified;
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