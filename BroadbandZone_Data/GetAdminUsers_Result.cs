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
    
    public partial class GetAdminUsers_Result
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string UserLogin { get; set; }
        public string Password { get; set; }
        public Nullable<bool> HasFullControl { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public byte[] PasswordHash { get; set; }
    }
}
