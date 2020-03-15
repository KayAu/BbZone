using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class NewAgentCommission
    {
        public string[] Agents { get; set; }
        public CommissionSettings[] CommissionSettings { get; set; }
    }

    //public class ComissionSetting
    //{
    //    public int CategoryId { get; set; }
    //    public string Category { get; set; }
    //    public decimal? DefaultCommission { get; set; }
    //    public int  CommissionPer { get; set; }
    //}
}