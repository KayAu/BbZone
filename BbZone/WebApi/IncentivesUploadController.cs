using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    public class IncentivesUploadController : ApiController
    {
        // POST api/<controller>
        public async Task<IHttpActionResult> Post()//[FromBody]CustomerOrder newRecord
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                // get the form data contents
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath(Properties.Settings.Default.UploadFilePath));
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                if (result.FileData != null && result.FileData.Count() > 0)
                {
                    string fileLocation = SaveUploadedFilePath(result.FileData[0]);
                    if (!string.IsNullOrEmpty(fileLocation))
                    {
                        DataTable dt = ExcelHelper.ExtractToDatatable(fileLocation);
                        TryAddIncentives(dt, out DataTable dataNotAdded);
                        return Ok(dataNotAdded);
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private string SaveUploadedFilePath(MultipartFileData multipartFile)
        {
            try
            {
                FileHelper fileUploadHelper = new FileHelper(Properties.Settings.Default.IncentiveFilesPath);
                UploadedFile file = fileUploadHelper.UploadStreams(multipartFile, DateTime.Now.ToString("yyyyMMdd_HHss"));
                return file != null ? file.FilePath : string.Empty;
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private void TryAddIncentives(DataTable dtIncentives, out DataTable dt)
        {
            try
            {
                dt = new DataTable();
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();

                using (var db = new BroadbandZoneEntities())
                {
                    db.Database.Connection.Open();
                    using (var cmd = db.Database.Connection.CreateCommand())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "prc_InsertIncentives";

                        var prIncentivePayment = new SqlParameter("prIncentivePayment", SqlDbType.Structured);
                        prIncentivePayment.Value = dtIncentives;
                        prIncentivePayment.TypeName = "dbo.udt_IncentivePayment";

                        var prAdmin = new SqlParameter("prAdmin", SqlDbType.VarChar);
                        prAdmin.Value = currentUser.Fullname;

                        cmd.Parameters.Add(prIncentivePayment);
                        cmd.Parameters.Add(prAdmin);

                        using (var reader = cmd.ExecuteReader())
                        {
                            dt.Load(reader);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

    }
}