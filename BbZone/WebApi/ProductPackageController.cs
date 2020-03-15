using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{

    public class ProductPackageController : ApiController
    {
        // GET: api/Product

        [HttpGet]
        // GET: api/StorageLocations
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                StatusAndKeywordParams filterBy = JsonConvert.DeserializeObject<StatusAndKeywordParams>(searchParams);

                var records = ModelHelper.GetListdata((new BroadbandZoneEntities()).GetProductPackages, currentPage, pageSize, sortColumn, sortInAsc, filterBy.Keyword, filterBy.IsActive);
                return Ok(records);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]ProductPackage newProdPackage)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    newProdPackage.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                    db.ProductPackages.Add(newProdPackage);
                    db.SaveChanges();

                    var records = ModelHelper.GetListdata(db.GetProductPackages, 1, Constants.DefaultPageSize, string.Empty, false, string.Empty, null);
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
        public IHttpActionResult Put(int id, [FromBody]ProductPackage editedRecord)
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
                throw ex;
            }
        }

        private GetProductPackages_Result UpdateEditedRecord(int recordId)
        {
            using (var db = new BroadbandZoneEntities())
            {
                var record = db.ProductPackages.Find(recordId);

                ModelHelper.CopyPropertiesTo<ProductPackage, GetProductPackages_Result>(record, out GetProductPackages_Result returnRec);
                returnRec.Category = record.ProductCategory.Category;
                return returnRec;
            }
        }
    }

}