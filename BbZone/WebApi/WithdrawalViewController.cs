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
    public class WithdrawalViewController : ApiController
    {
        private AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
        // GET: /api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try

            {
                SearchWithdrawalParams filterBy = JsonConvert.DeserializeObject<SearchWithdrawalParams>(searchParams);

                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    var results = (new BroadbandZoneEntities()).GetWithdrawalSubmitted(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                filterBy.Status,
                                                                                filterBy.Agent,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                                filterBy.CompletedDate != null ? filterBy.CompletedDate.StartDate : null,
                                                                                filterBy.CompletedDate != null ? filterBy.CompletedDate.EndDate : null,
                                                                                totalRecord).ToList();
                    return Ok(new Gridview<GetWithdrawalSubmitted_Result>()
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

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var withdrawal = db.Withdrawals.Find(id);
                    withdrawal.WithdrawalItems = db.GetWithdrawalItems(withdrawal.WithdrawalId).ToList();
                    return Ok(withdrawal);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                        editRecord.SetDateAndAuthor("Kaye", "CompletedOn","CompletedBy", "ModifiedBy", "ModifiedOn");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }


        [HttpPut]
        [Route("api/WithdrawalSubmit/Cancel/{id}")]
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

                    editRecord.Status = WithdrawalStatus.Cancelled.ToString();
                    editRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editRecord).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }
    }
}