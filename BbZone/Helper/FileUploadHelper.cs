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
        //public string UploadFilePath { get { return _UploadFilePath; }}

        public FileUploadHelper ()
        {
            this._UploadFilePath = HttpContext.Current.Server.MapPath(Properties.Settings.Default.UploadFilePath);
        }

        public IEnumerable<UploadedFile> UploadStreams(MultipartFileData[] multipartFiles, int fileId)
        {
            foreach (MultipartFileData file in multipartFiles)
            {
                if (!string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName))
                {
                    double filesize = Math.Round((File.ReadAllBytes(file.LocalFileName).Length * 1.0) / 1024);
                    string fileName = file.Headers.ContentDisposition.FileName;
                    fileName = fileName.Insert(fileName.IndexOf("."), $"_{fileId.ToString()}").Replace("\"", "");
                    File.Move(file.LocalFileName, Path.Combine(this._UploadFilePath, fileName));

                    yield return new UploadedFile { Name = fileName, Size = filesize };
                }
            }
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
        //public List<UploadedFile> UploadStreams(MultipartFileData[] multipartFiles, int fileId)
        //{
        //    List<UploadedFile> uploadedFiles = new List<UploadedFile>();
        //    try
        //    {
        //        foreach (MultipartFileData file in multipartFiles)
        //        {

        //            if (!string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName))
        //            {
        //                string fileName = file.Headers.ContentDisposition.FileName;
        //                fileName = fileName.Insert(fileName.IndexOf("."), $"_{fileId.ToString()}").Replace("\"", "");
        //                File.Move(file.LocalFileName, Path.Combine(this._UploadFilePath, fileName));
        //                uploadedFiles.Add(new UploadedFile { Name = $"{Properties.Settings.Default.UploadFilePath}/{fileName}", Size = file.Headers.ContentDisposition.Size });
        //            }
        //        }

        //        return uploadedFiles;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
        //    }
        //}



    }
}