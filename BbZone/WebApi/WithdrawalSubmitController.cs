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
                    var results = (new BroadbandZoneEntities()).GetWithdrawalToSubmit(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                    !currentUser.IsAdmin ? currentUser.Username : filterBy.Agent ,
                                                                                    filterBy.Keyword,
                                                                                    filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                                    filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                                    totalRecord).ToList();

                    return Ok(new Gridview<GetWithdrawalToSubmit_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                    //Withdrawal newRecord = new Withdrawal();
                    //newRecord.ApplicationId = newRecord.ApplicationId;
                    newRecord.Agent = currentUser.Username;
                    newRecord.Status = WithdrawalStatus.Pending.ToString();
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.Withdrawals.Add(newRecord);
                    db.SaveChanges();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

    }
}