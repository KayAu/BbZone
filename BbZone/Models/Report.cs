using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BroadbandZone_App.EFData;
namespace BroadbandZone_App.Models
{
    public class RecordCounts
    {
        public int TotalCallNotCompleted {get; set;}
        public int TotalOpenCall { get; set; }
        public int TotalUnassignedCall { get; set; }
        public int TotalDueForCall { get; set; }
        public int TotalPatient { get; set; }
    }
}