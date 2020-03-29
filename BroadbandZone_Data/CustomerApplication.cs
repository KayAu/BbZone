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
    
    public partial class CustomerApplication
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CustomerApplication()
        {
            this.Communications = new HashSet<Communication>();
            this.CustomerDocuments = new HashSet<CustomerDocument>();
            this.ClaimableCommissions = new HashSet<ClaimableCommission>();
            this.Clawbacks = new HashSet<Clawback>();
        }
    
        public int ApplicationId { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public int ProdPkgId { get; set; }
        public string Agent { get; set; }
        public string CompanyName { get; set; }
        public string CompanyRegNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerId { get; set; }
        public string ResidentialType { get; set; }
        public string ResidentialName { get; set; }
        public string CustomerAddr { get; set; }
        public string City { get; set; }
        public string Postcode { get; set; }
        public string State { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string CustomerRemarks { get; set; }
        public string AdminRemarks { get; set; }
        public Nullable<int> AppStatusId { get; set; }
        public string OrderNo { get; set; }
        public string UserId { get; set; }
        public string TelNo { get; set; }
        public Nullable<bool> SubmitByAgent { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<decimal> PackagePriceOnDate { get; set; }
        public Nullable<short> AgentCommOnDate { get; set; }
        public Nullable<short> SuperiorCommOnDate { get; set; }
    
        public virtual ApplicationStatu ApplicationStatu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Communication> Communications { get; set; }
        public virtual ProductPackage ProductPackage { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CustomerDocument> CustomerDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ClaimableCommission> ClaimableCommissions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Clawback> Clawbacks { get; set; }
    }
}
