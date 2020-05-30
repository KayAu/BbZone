using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.IO;
using System.Threading.Tasks;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System.Net;

namespace BroadbandZone_App.Helper
{
    public class FileHelper
    {
        private string _UploadFilePath;

        //private BroadbandZoneEntities db = new BroadbandZoneEntities();
        public FileHelper (string uploadFilePath)
        {
            this._UploadFilePath =  uploadFilePath;
        }

        public IEnumerable<UploadedFile> UploadStreams(MultipartFileData[] multipartFiles, dynamic fileId)
        {
            foreach (MultipartFileData file in multipartFiles)
            {
                if (!string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName))
                {
                    double filesize = File.ReadAllBytes(file.LocalFileName).Length;
                    string fileName = GetFileUploadDetails(file.Headers.ContentDisposition.FileName, fileId, out string destLocation);
                    if (!File.Exists(destLocation))
                    {
                        File.Move(file.LocalFileName, destLocation);
                    }

                    yield return new UploadedFile { Name = fileName, FilePath = $"{this._UploadFilePath}/{fileName}", Size = filesize };
                }
            }
        }

        public UploadedFile UploadStreams(MultipartFileData file, dynamic fileId)
        {
            if (!string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName))
            {
                double filesize = File.ReadAllBytes(file.LocalFileName).Length;
                string fileName = GetFileUploadDetails(file.Headers.ContentDisposition.FileName, fileId, out string destLocation);
                File.Move(file.LocalFileName, destLocation);

                return new UploadedFile { Name = fileName, FilePath = $"{this._UploadFilePath}/{fileName}", Size = filesize };
            }
            return null;
        }

        public void RemoveFile(string fileName)
        {
            try
            {
                var fileOnDisk = Path.Combine(HttpContext.Current.Server.MapPath(this._UploadFilePath), fileName);
                File.Delete(fileOnDisk);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public HttpResponseMessage DownloadFile(string fileName, HttpRequestMessage thisRequest)
        {
            var filePath = Path.Combine(HttpContext.Current.Server.MapPath(this._UploadFilePath), fileName);
            var dataBytes = File.ReadAllBytes(filePath);
            var dataStream = new MemoryStream(dataBytes);
            HttpResponseMessage httpResponseMessage = thisRequest.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(dataStream);
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileName;
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            return httpResponseMessage;
        }

        private string GetFileUploadDetails(string uploadedFileName, dynamic fileId, out string destLocation)
        {
            uploadedFileName = uploadedFileName.Insert(uploadedFileName.IndexOf("."), $"_{fileId.ToString()}").Replace("\"", "");
            destLocation = Path.Combine(HttpContext.Current.Server.MapPath(this._UploadFilePath), uploadedFileName);

            return uploadedFileName;
        }
    }
}