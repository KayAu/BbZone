using BroadbandZone_App.Enums;
using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using DropdownItem = BroadbandZone_App.Models.DropdownItem;

namespace BroadbandZone_App.WebApi
{
    public class DropdownController : ApiController
    {
        
        [Route("api/Dropdown/GetDocStatus")]
        // GET api/<controller>
        public IHttpActionResult GetDocStatus()
        {
            try
            {
                List<DropdownItem> dropdownItems = new List<DropdownItem>();
                dropdownItems.Add(new DropdownItem { Key = "true", Value = "Yes" });
                dropdownItems.Add(new DropdownItem { Key = "false", Value = "No" });
                return Ok(dropdownItems);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        [Route("api/Dropdown/GetProductsWithImage")]
        // GET api/<controller>
        public IHttpActionResult GetProductsWithImage()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var results = db.Products.Where(pc => pc.IsActive == true).ToList();
                    List<ProductOption> dropdownItems = results.Select(r => new ProductOption
                                                                                {
                                                                                    ProductId = r.ProductId.ToString(),
                                                                                    ProductName = r.ProductName,
                                                                                    ProductImgPath = $"/images/{r.ProductName}.png",
                                                                                    ImageExisted = File.Exists(HttpContext.Current.Server.MapPath($"/images/{r.ProductName}.png"))
                                                                                }).ToList();
                    
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                 throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        [Route("api/Dropdown/GetAgents")]
        public IHttpActionResult GetAgents()
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                using (var db = new BroadbandZoneEntities())
                {
                    var agentId = !currentUser.IsAdmin ? currentUser.AgentId : null;
                    List <DropdownItem> dropdownItems = db.GetMyEntireTeam(agentId).Select(r => new DropdownItem { Key = r.UserLogin, Value = r.FullName }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
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
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }


        [Route("api/Dropdown/GetWithdrawalStatus")]
        public IHttpActionResult GetWithdrwalStatus()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var withdrawalStatuses = Enum.GetValues(typeof(WithdrawalStatus)).Cast<WithdrawalStatus>();   
                    List<DropdownItem> dropdownItems = withdrawalStatuses.Select(i => new DropdownItem { Key = i.ToString(), Value = i.ToString()}).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }



    }


}