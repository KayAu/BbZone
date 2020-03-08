using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
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
                 throw ex;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]ProductCategory newProdCategory)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    newProdCategory.SetDateAndAuthor("Kaye", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.ProductCategories.Add(newProdCategory);
                    db.SaveChanges();

                    var records = ModelHelper.GetListdata(db.GetProductCategory, 1, Constants.DefaultPageSize, string.Empty, false, string.Empty, null);
                    return Ok(records);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody]ProductCategory editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    editedRecord.SetDateAndAuthor("Kaye", "ModifiedBy", "ModifiedOn");
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();
                }

                return Ok(UpdateEditedRecord(id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private GetProductCategory_Result UpdateEditedRecord(int recordId )
        {
            using (var db = new BroadbandZoneEntities())
            {
                var record = db.ProductCategories.Find(recordId);

                ModelHelper.CopyPropertiesTo<ProductCategory, GetProductCategory_Result>(record, out GetProductCategory_Result returnRec);
                returnRec.ProductName = record.Product.ProductName;
                return returnRec;
            }
        }
       
    }
}
