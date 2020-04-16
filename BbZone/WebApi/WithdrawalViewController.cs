using BroadbandZone_App.Enums;
using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class WithdrawalViewController : ApiController
    {
        private AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

        [HttpGet]
        //[Route("api/Incentives/Download/{searchParams}")]
        public HttpResponseMessage Download([FromUri] SearchWithdrawalParams filterBy)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        var results = db.GetWithdrawalSubmittedForDownload(filterBy.Status,
                                                                        filterBy.Agent,
                                                                        filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                        filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                        filterBy.CompletedDate != null ? filterBy.CompletedDate.StartDate : null,
                                                                        filterBy.CompletedDate != null ? filterBy.CompletedDate.EndDate : null).ToList();
                        DataTable dt = results.ToDataTable();
                        wb.Worksheets.Add(dt, "Withdrawals");
                        MemoryStream stream = new MemoryStream();
                        wb.SaveAs(stream);

                        var result = new HttpResponseMessage(HttpStatusCode.OK);
                        result.Content = new ByteArrayContent(stream.ToArray());
                        result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                        result.Content.Headers.ContentDisposition.FileName = $"Withdrawals_{DateTime.Now.ToShortDateString()}.xlsx";
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                        return result;

                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return null;
            }
        }

        // GET: /api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                SearchWithdrawalParams filterBy = JsonConvert.DeserializeObject<SearchWithdrawalParams>(searchParams);
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    ObjectParameter totalAmountClaimed = new ObjectParameter("oTotalAmountClaimed", typeof(decimal));
                    ObjectParameter totalAmountPayout = new ObjectParameter("oTotalAmountPayout", typeof(decimal));

                    var results = (new BroadbandZoneEntities()).GetWithdrawalSubmitted(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                filterBy.Status,
                                                                                !currentUser.IsAdmin ? currentUser.Username : filterBy.Agent,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                                filterBy.CompletedDate != null ? filterBy.CompletedDate.StartDate : null,
                                                                                filterBy.CompletedDate != null ? filterBy.CompletedDate.EndDate : null,
                                                                                totalRecord,
                                                                                totalAmountClaimed,
                                                                                totalAmountPayout).ToList();

                    return Ok(new WithdrawalView<GetWithdrawalSubmitted_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value),
                        TotalAmountClaimed = Convert.ToDecimal(totalAmountClaimed.Value),
                        TotalAmountPayout = Convert.ToDecimal(totalAmountPayout.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities(true))
                {
                    var withdrawal = db.Withdrawals.Find(id);
                    withdrawal.AllowEdit = !currentUser.IsAdmin ||
                                            withdrawal.Status == WithdrawalStatus.Completed.ToString() ||
                                            withdrawal.Status == WithdrawalStatus.Terminated.ToString() ? false : true;
                    withdrawal.AllowTerminate = withdrawal.Status == WithdrawalStatus.Pending.ToString() ? true : false;
                    withdrawal.WithdrawalItems = db.GetWithdrawalItems(withdrawal.WithdrawalId).ToList();
                    withdrawal.TotalAmountToDeduct = withdrawal.WithdrawalItems.Select(w => w.DeductAmount).Sum();
                    withdrawal.TotalSelectedAmount = withdrawal.Amount + withdrawal.TotalAmountToDeduct;
                    return Ok(withdrawal);
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
        public IHttpActionResult Put([FromUri]int id, [FromBody] Withdrawal editRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    if (editRecord.Status == WithdrawalStatus.Completed.ToString())
                    {
                        editRecord.SetDateAndAuthor("Kaye", "CompletedOn", "CompletedBy", "ModifiedBy", "ModifiedOn");
                    }
                    else
                    {
                        editRecord.SetDateAndAuthor("Kaye", "ModifiedBy", "ModifiedOn");
                    }
                    db.Entry(editRecord).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok(editRecord);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        [HttpGet]
        [Route("api/WithdrawalView/Cancel/{id}")]
        // DELETE api/<controller>/5
        public IHttpActionResult Cancel(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    Withdrawal editRecord = db.Withdrawals.Find(id);

                    if (editRecord is null)
                        return Content(HttpStatusCode.BadRequest, "Invalid ID");

                    editRecord.Status = WithdrawalStatus.Terminated.ToString();
                    editRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editRecord).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/WithdrawalView/GetPaymentVoucher/{id}")]
        // DELETE api/<controller>/5
        public IHttpActionResult GetPaymentVoucher(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    Withdrawal withdrawal = db.Withdrawals.Find(id);

                    if (withdrawal is null)
                        return Content(HttpStatusCode.BadRequest, "Invalid ID");

                    PaymentVoucher paymentVoucher = new PaymentVoucher();
                    paymentVoucher.RefNumber = withdrawal.ReferenceNo;
                    paymentVoucher.PaymentAmount = $"RM {string.Format("{0:C2}", withdrawal.Amount)}";
                    paymentVoucher.PaymentDate = withdrawal.CreatedOn.ToString("yyyy-MM-dd");
                    paymentVoucher.PaymentItems = db.GetPaymentDetails(id).ToList();

                    Agent agent = db.Agents.Where(a => a.UserLogin == withdrawal.Agent).FirstOrDefault();

                    if (agent != null)
                    {
                        paymentVoucher.AgentFullname = agent.Fullname;
                        paymentVoucher.AgentId = agent.AgentId.ToString();
                        paymentVoucher.IcNo = agent.Nric;
                        paymentVoucher.Bank = agent.BankName;
                        paymentVoucher.BankAccount = agent.BankAccNo;
                    }

                    return Ok(paymentVoucher);
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