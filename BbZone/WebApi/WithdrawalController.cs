using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
	public class WithdrawalController : ApiController
	{
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
                    var results = (new BroadbandZoneEntities()).GetWithdrawal(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                filterBy.IsCompleted,
                                                                                filterBy.Agent,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.StartDate : null,
                                                                                filterBy.SubmittedDate != null ? filterBy.SubmittedDate.EndDate : null,
                                                                                filterBy.CompletedDate != null ? filterBy.CompletedDate.StartDate : null,
                                                                                filterBy.CompletedDate != null ? filterBy.CompletedDate.EndDate : null,
                                                                                totalRecord).ToList();
                    return Ok(new Gridview<GetWithdrawal_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET api/<controller>/5
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    Withdrawal withdrawal = db.Withdrawals.Where(wd => wd.WithdrawalId == id).FirstOrDefault();

                    return Ok(withdrawal);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody] Withdrawal newWithdrawal)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {                    
                    newWithdrawal.SetDateAndAuthor("Kaye", "CreatedBy", "CreatedOn");
                    db.Withdrawals.Add(newWithdrawal);
                    db.SaveChanges();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult Put([FromUri]int id, [FromBody] Withdrawal editedWithdrawal)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    editedWithdrawal.SetDateAndAuthor("Kaye", "CompletedBy", "CompletedOn");
                    db.Entry(editedWithdrawal).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok(editedWithdrawal);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}