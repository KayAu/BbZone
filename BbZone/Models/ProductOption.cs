using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class ProductOption
    {
        public string ProductId { get; set;}
        public string ProductName { get; set; }
        public string ProductImgPath { get; set; }
        public bool ImageExisted { get; set; }
    }
}