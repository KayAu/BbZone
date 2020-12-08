using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class CompletedApplicationController : ApiController
    {
        private AuthenticatedUser currentUser;
        public CompletedApplicationController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }

        //

        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
             try
            {
                //AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
                SearchCompletedOrderParams filterBy = JsonConvert.DeserializeObject<SearchCompletedOrderParams>(searchParams);

                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    var results = (new BroadbandZoneEntities()).GetCompletedCustomerApplication(currentPage, pageSize, sortColumn, sortInAsc,
                                                                                filterBy.ProductId,
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
                                                                                currentUser.AgentId,
                                                                                totalRecord).ToList();
                    return Ok(new Gridview<GetCompletedCustomerApplication_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    });
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