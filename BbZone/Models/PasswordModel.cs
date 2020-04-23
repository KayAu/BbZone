using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class MyPassword
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class AgentPasswordReset
    {
        public string Agent { get; set; }
        public string NewPassword { get; set; }
    }
}