using BroadbandZone_App.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class DownloadController : ApiController
    {

        // GET api/<controller>
        [HttpGet]
        [Route("api/Download/CustomerApplication/{fileName}")]
        public HttpResponseMessage CustomerApplication(string fileName)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.UploadFilePath);
                return fileUploadHelper.DownloadFile(fileName, Request);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        [HttpGet]
        [Route("api/Download/Announcement/{fileName}")]
        public HttpResponseMessage Announcement(string fileName)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.AnnouncementFilePath);
                return fileUploadHelper.DownloadFile(fileName, Request);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }
    }
}