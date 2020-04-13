using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{

    public class ProductCategoryController : ApiController
    {
        // GET: api/<controller>
        [HttpGet]
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                StatusAndKeywordParams filterBy = JsonConvert.DeserializeObject<StatusAndKeywordParams>(searchParams);
                var records = ModelHelper.GetListdata((new BroadbandZoneEntities()).GetProductCategory, currentPage, pageSize, sortColumn, sortInAsc, filterBy.Keyword, filterBy.IsActive);
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
        public IHttpActionResult Post([FromBody]ProductCategory newProdCategory)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    newProdCategory.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.ProductCategories.Add(newProdCategory);
                    db.SaveChanges();

                    var records = ModelHelper.GetListdata(db.GetProductCategory, 1, Constants.DefaultPageSize, string.Empty, false, string.Empty, null);
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
        public IHttpActionResult Put(int id, [FromBody]ProductCategory editedRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();
                }
                return Ok(UpdateEditedRecord(id));
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private GetProductCategory_Result UpdateEditedRecord(int recordId )
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var record = db.ProductCategories.Find(recordId);

                    ModelHelper.CopyPropertiesTo<ProductCategory, GetProductCategory_Result>(record, out GetProductCategory_Result returnRec);
                    returnRec.ProductName = record.Product.ProductName;
                    return returnRec;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }
       
    }
}
