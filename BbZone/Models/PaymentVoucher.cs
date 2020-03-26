using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class PaymentVoucher
    {
        public string AgentId { get; set; }
        public string AgentFullname { get; set; }
        public string IcNo { get; set; }
        public string PaymentDate { get; set; }
        public string Bank { get; set; }
        public string BankAccount { get; set; }
        public string PaymentAmount { get; set; }
        public string RefNumber { get; set; }
        public List<GetPaymentDetails_Result> PaymentItems { get; set; }
    }
}