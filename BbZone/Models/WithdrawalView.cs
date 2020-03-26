using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class WithdrawalView<T>
    {
        public List<T> DisplayData { get; set; }
        public int TotalRecords { get; set; }
        public decimal? TotalAmountToDeduct { get; set; }
    }

 
}