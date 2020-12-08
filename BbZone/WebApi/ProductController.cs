using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Net;
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class ProductController : ApiController
    {
        public object editedProdPackage { get; private set; }
        private AuthenticatedUser currentUser;
        public ProductController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }

        [HttpGet]
        // GET: api/StorageLocations
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                StatusAndKeywordParams filterBy = JsonConvert.DeserializeObject<StatusAndKeywordParams>(searchParams);
                var records = ModelHelper.GetListdata((new BroadbandZoneEntities()).GetProducts, currentPage, pageSize, sortColumn, sortInAsc, filterBy.Keyword, filterBy.IsActive);
                return Ok(records);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]Product newRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.Products.Add(newRecord);
                    db.SaveChanges();

                    var records = ModelHelper.GetListdata(db.GetProducts, 1, Constants.DefaultPageSize, string.Empty, false, string.Empty, null);
                    return Ok(records);
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
        public IHttpActionResult Put(int id, [FromBody]Product editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok(editedRecord);
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
