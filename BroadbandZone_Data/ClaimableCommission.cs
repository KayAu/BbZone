//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BroadbandZone_Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class ClaimableCommission
    {
        public int ClaimCommId { get; set; }
        public int ApplicationId { get; set; }
        public int AgentId { get; set; }
        public decimal PackageCommOnDate { get; set; }
        public short AgentCommOnDate { get; set; }
        public Nullable<bool> IsOverride { get; set; }
        public Nullable<int> ClaimWithdrawalId { get; set; }
        public Nullable<int> DeductedWithdrawalId { get; set; }
        public Nullable<System.DateTime> DeductedOn { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
    
        public virtual Withdrawal Withdrawal { get; set; }
        public virtual Withdrawal Withdrawal1 { get; set; }
    }
}
