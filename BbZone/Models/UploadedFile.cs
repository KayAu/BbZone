using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class UploadedFile
    {
        public string Name { get; set; }
        public string FilePath { get; set; }
        public double? Size { get; set; }
    }
}