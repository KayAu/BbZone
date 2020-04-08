using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.IO;
using System.Threading.Tasks;
using BroadbandZone_App.Models;

namespace BroadbandZone_App.Helper
{
    public class FileUploadHelper
    {
        private string _UploadFilePath;

        public FileUploadHelper (string uploadFilePath)
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
                    string fileName = file.Headers.ContentDisposition.FileName;
                    fileName = fileName.Insert(fileName.IndexOf("."), $"_{fileId.ToString()}").Replace("\"", "");
                    string destLocation = GetFileUploadLocation(fileName);
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
                string fileName = file.Headers.ContentDisposition.FileName;
                fileName = fileName.Insert(fileName.IndexOf("."), $"_{fileId.ToString()}").Replace("\"", "");
                File.Move(file.LocalFileName, GetFileUploadLocation(fileName));

                return new UploadedFile { Name = fileName, FilePath = $"{this._UploadFilePath}/{fileName}", Size = filesize };
            }
            return null;
        }

        public void RemoveFile(string fileName)
        {
            try
            {
                var fileOnDisk = HttpContext.Current.Server.MapPath(fileName);
                File.Delete(fileOnDisk);
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private string GetFileUploadLocation(string fileName)
        {
            return Path.Combine(HttpContext.Current.Server.MapPath(this._UploadFilePath), fileName);
        }

    }
}