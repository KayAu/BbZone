using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class LoginBannerController : ApiController
    {
        private BroadbandZoneEntities db = new BroadbandZoneEntities();
        private AuthenticatedUser currentUser;
        public LoginBannerController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }

        [HttpGet]
        // GET: api/StorageLocations
        public IHttpActionResult GetAll(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string searchParams)
        {
            try
            {
                var records = ModelHelper.GetListdata((new BroadbandZoneEntities()).GetLoginBanners, currentPage, pageSize, sortColumn, sortInAsc);
                return Ok(records);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var records = db.LoginPageBanners.OrderByDescending(b => b.BannerId).FirstOrDefault();
                return Ok(records is null ? string.Empty : records.FilePath);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        public async Task<IHttpActionResult> Post()
        {
            try
            {
                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.LoginBannerPath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                if (result.FileData != null && result.FileData.Count() > 0)
                {
                    // save the uploaded file
                    UploadedFile file = SaveUploadedFilePath(result.FileData[0]);                 
                    LoginPageBanner newRecord = new LoginPageBanner();
                    newRecord.FilePath = file.FilePath;
                    newRecord.FileName = file.Name;
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn");
                    db.LoginPageBanners.Add(newRecord);
                    db.SaveChanges();
                }

                var records = ModelHelper.GetListdata(db.GetLoginBanners, 1, Constants.DefaultPageSize, string.Empty, false);
                return Ok(records);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private UploadedFile SaveUploadedFilePath(MultipartFileData multipartFile)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.LoginBannerPath);
                UploadedFile file = fileUploadHelper.UploadStreams(multipartFile, DateTime.Now.ToString("yyyyMMdd_HHss"));
                return file;
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                var deleteRecord = db.LoginPageBanners.Find(id);
                if (deleteRecord != null)
                {
                    db.LoginPageBanners.Remove(deleteRecord);
                    //db.Entry(deleteRecord).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.NotImplemented, ex.Message);
            }
        }
    }
}