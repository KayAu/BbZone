using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{

    public class ProductController : ApiController
    {
        public object editedProdPackage { get; private set; }

        // GET: api/Product

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
               throw ex;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody]Product newRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
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
                throw ex;
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody]Product editedRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                using (var db = new BroadbandZoneEntities())
                {
                    editedRecord.SetDateAndAuthor(currentUser.Fullname, "ModifiedBy", "ModifiedOn");
                    db.Entry(editedRecord).State = EntityState.Modified;
                    db.SaveChanges();
                   // ModelHelper.CopyPropertiesTo<Product, GetProducts_Result>(editedRecord, out GetProducts_Result returnRec);
                    return Ok(editedRecord);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
