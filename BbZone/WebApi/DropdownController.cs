using BroadbandZone_App.Enums;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class DropdownController : ApiController
    {
        [Route("api/Dropdown/GetProducts")]
        // GET api/<controller>
        public IHttpActionResult GetProducts()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.Products.Where(pc => pc.IsActive == true)
                                                                           .Select(r => new DropdownItem { Key = r.ProductId.ToString(), Value = r.ProductName }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetCategories")]
        public IHttpActionResult GetCategories()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductCategories.Where(pc => pc.IsActive == true)
                                                                         .Select(r => new DropdownItem
                                                                         {
                                                                             Key = r.CategoryId.ToString(),
                                                                             Value = r.Category,
                                                                             ParentId = r.Product.ProductId.ToString()
                                                                         }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetProductPackages")]
        public IHttpActionResult GetProductPackages()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductPackages.Where(pc => pc.IsActive == true)
                                                                         .Select(r => new DropdownItem { Key = r.ProdPkgId.ToString(),
                                                                                                         Value = r.PackageName,
                                                                                                         ParentId = r.ProductCategory.CategoryId.ToString() }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetCategoriesByProduct/{id}")]
        public IHttpActionResult GetCategoriesByProduct(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductCategories.Where(pc => pc.IsActive == true && pc.ProductId == id)
                                                                         .Select(r => new DropdownItem
                                                                         {
                                                                             Key = r.CategoryId.ToString(),
                                                                             Value = r.Category,
                                                                             ParentId = id.ToString()
                                                                         }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetPackagesByCategory/{id}")]
        public IHttpActionResult GetPackagesByCategory(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductPackages.Where(pc => pc.IsActive == true && pc.CategoryId == id)
                                                                         .Select(r => new DropdownItem
                                                                         {
                                                                             Key = r.ProdPkgId.ToString(),
                                                                             Value = r.PackageName,
                                                                             ParentId = r.ProductCategory.CategoryId.ToString()
                                                                         }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetStates")]
        public IHttpActionResult GetStates()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    string[] states = { "Johor",
                                        "Kedah",
                                        "Kelantan",
                                        "Kuala Lumpur",
                                        "Labuan",
                                        "Melaka",
                                        "Negeri Sembilan",
                                        "Pahang",
                                        "Perak",
                                        "Perlis",
                                        "Pulau Pinang",
                                        "Putrajaya",
                                        "Sabah",
                                        "Sarawak",
                                        "Selangor",
                                        "Terengganu"
                                        };
                    List<DropdownItem> dropdownItems = states .Select(r => new DropdownItem { Key = r, Value = r }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetAgents")]
        public IHttpActionResult GetAgents()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.Agents.Where(pc => pc.IsActive == true)
                                                               .Select(r => new DropdownItem { Key = r.UserLogin, Value = r.Fullname }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetStatus")]
        public IHttpActionResult GetStatus()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ApplicationStatus.Select(r => new DropdownItem { Key = r.AppStatusId.ToString(), Value = r.Status }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Dropdown/GetResidentialType")]
        public IHttpActionResult GetResidentialType()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.GetDropdownItems(DropdownField.ResidentialType.ToString()).Select(i => new DropdownItem { Key = i.Item, Value = i.Item }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }


}