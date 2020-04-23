using BroadbandZone_App.Enums;
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
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
	public class WithdrawalSubmitController : ApiController
	{
        private AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    SearchWithdrawalParams filterBy = JsonConvert.DeserializeObject<SearchWithdrawalParams>(searchParams);
                    AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                    
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    ObjectParameter totalIncentives = new ObjectParameter("oTotalIncentives", typeof(decimal));
                    ObjectParameter totalDeduction = new ObjectParameter("oTotalDeduction", typeof(decimal));
                    totalDeduction.Value = 100000.00m;
                    totalIncentives.Value = 100000.00m;
                    var results = (new BroadbandZoneEntities()).GetWithdrawalToSubmit(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                    currentUser.Username ,
                                                                                    filterBy.Keyword,
                                                                                    filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                                    filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                                    totalRecord,
                                                                                    totalIncentives,
                                                                                    totalDeduction).ToList();
                    return Ok(new 
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value),
                        TotalAmountToDeduct = Convert.ToDecimal(totalDeduction.Value),
                        TotalIncentives = Convert.ToDecimal(totalIncentives.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody] Withdrawal newRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    // Create Withdrawal transaction
                    newRecord.Agent = currentUser.Username;
                    newRecord.Status = WithdrawalStatus.Pending.ToString();
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.Withdrawals.Add(newRecord);
                    db.SaveChanges();

                    // Update claim able commission with the new Withdrawal transaction id
                    db.UpdateClaimableCommission(newRecord.WithdrawalId);

                    // update agent charges with the newly submitted withdrawal Id
                    db.UpdateAgentPocket(currentUser.Username, newRecord.WithdrawalId);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    }
}