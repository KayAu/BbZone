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
    
    public partial class IncentiveReceived
    {
        public int IncPymntId { get; set; }
        public int ApplicationId { get; set; }
        public decimal IncentiveAmt { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    
        public virtual CustomerApplication CustomerApplication { get; set; }
    }
}
