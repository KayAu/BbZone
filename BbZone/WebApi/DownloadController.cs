using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class DownloadController : ApiController
    {

        // GET api/<controller>
        [HttpGet]
        [Route("api/Download/CustomerApplicationDocument/{fileName}")]
        public HttpResponseMessage CustomerApplicationDocument(string fileName)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.UploadFilePath);
                return fileUploadHelper.DownloadFile(fileName, Request);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return null;
            }
        }

        [HttpGet]
        [Route("api/Download/Announcement/{fileName}")]
        public HttpResponseMessage Announcement(string fileName)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.AnnouncementFilePath);
                return fileUploadHelper.DownloadFile(fileName, Request);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return null;
            }
        }

        [HttpGet]
        [Route("api/Download/RegistrationDocument/{fileName}")]
        public HttpResponseMessage RegistrationDocument(string fileName)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.RegistrationFilePath);
                return fileUploadHelper.DownloadFile(fileName, Request);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return null;
            }
        }

        [HttpPost]  
        public HttpResponseMessage CustomerApplication([FromBody] SearchOrderParams filterBy)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities(true))
                {
                    var results = (new BroadbandZoneEntities()).GetCustomerApplicationForDownload(
                                                                            filterBy.ProductId,
                                                                            filterBy.ProductCategoryId,
                                                                            filterBy.ProductPackageId,
                                                                            filterBy.OrderStatusId,
                                                                            filterBy.Agent,
                                                                            filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                            filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                            filterBy.ActivationDate != null ? filterBy.ActivationDate.StartDate : null,
                                                                            filterBy.ActivationDate != null ? filterBy.ActivationDate.EndDate : null,
                                                                            filterBy.ResidentialType,
                                                                            filterBy.Keyword,
                                                                            filterBy.DocumentCompleted,
                                                                            currentUser.IsAdmin,
                                                                            currentUser.AgentId).ToList();

                    return ExcelHelper.ReadDataToExcel<GetCustomerApplicationForDownload_Result>(results, "CustomerApplication");
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return new HttpResponseMessage(System.Net.HttpStatusCode.ExpectationFailed);
            }
        }

        [HttpPost]
        [Route("api/Download/Incentives")]
        public HttpResponseMessage Incentives([FromBody] SearchIncentivesParams filterBy)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        var results = db.GetIncentivesReceivedForDownload(filterBy.ProductId,
                                                                        filterBy.ProductCategoryId,
                                                                        filterBy.ProductPackageId,
                                                                        filterBy.Keyword,
                                                                        filterBy.ReceivedDate != null ? filterBy.ReceivedDate.StartDate : null,
                                                                        filterBy.ReceivedDate != null ? filterBy.ReceivedDate.EndDate : null).ToList();

                        return ExcelHelper.ReadDataToExcel<GetIncentivesReceivedForDownload_Result>(results, "IncentivesReceived");
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return new HttpResponseMessage(System.Net.HttpStatusCode.ExpectationFailed);
            }
        }

        [HttpPost]
        [Route("api/Download/Agent")]
        public HttpResponseMessage Agent()
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        var results = db.GetAgentsForDownload().ToList();
                        return ExcelHelper.ReadDataToExcel<GetAgentsForDownload_Result>(results, "Agents");
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return new HttpResponseMessage(System.Net.HttpStatusCode.ExpectationFailed);
            }
        }

        [HttpPost]
        [Route("api/Download/CompletedOrders")]
        public HttpResponseMessage CompletedOrders([FromBody] SearchCompletedOrderParams filterBy)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities(true))
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        var results = db.GetCompletedCustAppForDownload(filterBy.ProductId,
                                                                        filterBy.ProductCategoryId,
                                                                        filterBy.ProductPackageId,
                                                                        filterBy.CommissionStatus,
                                                                        filterBy.Agent,
                                                                        filterBy.ActivatedDate != null ? filterBy.ActivatedDate.StartDate : null,
                                                                        filterBy.ActivatedDate != null ? filterBy.ActivatedDate.EndDate : null,
                                                                        filterBy.PaymentDate != null ? filterBy.PaymentDate.StartDate : null,
                                                                        filterBy.PaymentDate != null ? filterBy.PaymentDate.EndDate : null,
                                                                        filterBy.Keyword,
                                                                        filterBy.DocumentCompleted,
                                                                        currentUser.IsAdmin,
                                                                        currentUser.AgentId).ToList();
                        return ExcelHelper.ReadDataToExcel<GetCompletedCustAppForDownload_Result>(results, "CompletedOrders");
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return new HttpResponseMessage(System.Net.HttpStatusCode.ExpectationFailed);
            }
        }
    }
}