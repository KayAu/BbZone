﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class BroadbandZoneEntities : DbContext
    {
        public BroadbandZoneEntities()
            : base("name=BroadbandZoneEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AdminUser> AdminUsers { get; set; }
        public virtual DbSet<Agent> Agents { get; set; }
        public virtual DbSet<AgentCommission> AgentCommissions { get; set; }
        public virtual DbSet<Announcement> Announcements { get; set; }
        public virtual DbSet<AnnouncementDocument> AnnouncementDocuments { get; set; }
        public virtual DbSet<ApplicationStatu> ApplicationStatus { get; set; }
        public virtual DbSet<Communication> Communications { get; set; }
        public virtual DbSet<CustomerDocument> CustomerDocuments { get; set; }
        public virtual DbSet<DropdownItem> DropdownItems { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<ProductPackage> ProductPackages { get; set; }
        public virtual DbSet<Registration> Registrations { get; set; }
        public virtual DbSet<Withdrawal> Withdrawals { get; set; }
        public virtual DbSet<CustomerApplication> CustomerApplications { get; set; }
    
        public virtual ObjectResult<GetProductCategory_Result> GetProductCategory(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, string prSearchKeyword, Nullable<bool> prRecordStatus, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prSearchKeywordParameter = prSearchKeyword != null ?
                new ObjectParameter("prSearchKeyword", prSearchKeyword) :
                new ObjectParameter("prSearchKeyword", typeof(string));
    
            var prRecordStatusParameter = prRecordStatus.HasValue ?
                new ObjectParameter("prRecordStatus", prRecordStatus) :
                new ObjectParameter("prRecordStatus", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetProductCategory_Result>("GetProductCategory", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prSearchKeywordParameter, prRecordStatusParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<GetProductPackages_Result> GetProductPackages(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, string prSearchKeyword, Nullable<bool> prRecordStatus, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prSearchKeywordParameter = prSearchKeyword != null ?
                new ObjectParameter("prSearchKeyword", prSearchKeyword) :
                new ObjectParameter("prSearchKeyword", typeof(string));
    
            var prRecordStatusParameter = prRecordStatus.HasValue ?
                new ObjectParameter("prRecordStatus", prRecordStatus) :
                new ObjectParameter("prRecordStatus", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetProductPackages_Result>("GetProductPackages", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prSearchKeywordParameter, prRecordStatusParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<GetProducts_Result> GetProducts(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, string prSearchKeyword, Nullable<bool> prRecordStatus, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prSearchKeywordParameter = prSearchKeyword != null ?
                new ObjectParameter("prSearchKeyword", prSearchKeyword) :
                new ObjectParameter("prSearchKeyword", typeof(string));
    
            var prRecordStatusParameter = prRecordStatus.HasValue ?
                new ObjectParameter("prRecordStatus", prRecordStatus) :
                new ObjectParameter("prRecordStatus", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetProducts_Result>("GetProducts", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prSearchKeywordParameter, prRecordStatusParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<GetCustomerApplication_Result> GetCustomerApplication(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, Nullable<int> prProduct, Nullable<int> prProductCategory, Nullable<int> prProductPackage, Nullable<int> prStatus, string prAgent, Nullable<System.DateTime> prSubmittedFrom, Nullable<System.DateTime> prSubmittedTo, string prResidentialType, string prResidentialName, Nullable<bool> prIsAdmin, Nullable<int> prAgentId, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prProductParameter = prProduct.HasValue ?
                new ObjectParameter("prProduct", prProduct) :
                new ObjectParameter("prProduct", typeof(int));
    
            var prProductCategoryParameter = prProductCategory.HasValue ?
                new ObjectParameter("prProductCategory", prProductCategory) :
                new ObjectParameter("prProductCategory", typeof(int));
    
            var prProductPackageParameter = prProductPackage.HasValue ?
                new ObjectParameter("prProductPackage", prProductPackage) :
                new ObjectParameter("prProductPackage", typeof(int));
    
            var prStatusParameter = prStatus.HasValue ?
                new ObjectParameter("prStatus", prStatus) :
                new ObjectParameter("prStatus", typeof(int));
    
            var prAgentParameter = prAgent != null ?
                new ObjectParameter("prAgent", prAgent) :
                new ObjectParameter("prAgent", typeof(string));
    
            var prSubmittedFromParameter = prSubmittedFrom.HasValue ?
                new ObjectParameter("prSubmittedFrom", prSubmittedFrom) :
                new ObjectParameter("prSubmittedFrom", typeof(System.DateTime));
    
            var prSubmittedToParameter = prSubmittedTo.HasValue ?
                new ObjectParameter("prSubmittedTo", prSubmittedTo) :
                new ObjectParameter("prSubmittedTo", typeof(System.DateTime));
    
            var prResidentialTypeParameter = prResidentialType != null ?
                new ObjectParameter("prResidentialType", prResidentialType) :
                new ObjectParameter("prResidentialType", typeof(string));
    
            var prResidentialNameParameter = prResidentialName != null ?
                new ObjectParameter("prResidentialName", prResidentialName) :
                new ObjectParameter("prResidentialName", typeof(string));
    
            var prIsAdminParameter = prIsAdmin.HasValue ?
                new ObjectParameter("prIsAdmin", prIsAdmin) :
                new ObjectParameter("prIsAdmin", typeof(bool));
    
            var prAgentIdParameter = prAgentId.HasValue ?
                new ObjectParameter("prAgentId", prAgentId) :
                new ObjectParameter("prAgentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetCustomerApplication_Result>("GetCustomerApplication", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prProductParameter, prProductCategoryParameter, prProductPackageParameter, prStatusParameter, prAgentParameter, prSubmittedFromParameter, prSubmittedToParameter, prResidentialTypeParameter, prResidentialNameParameter, prIsAdminParameter, prAgentIdParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<GetDropdownItems_Result> GetDropdownItems(string prFieldName)
        {
            var prFieldNameParameter = prFieldName != null ?
                new ObjectParameter("prFieldName", prFieldName) :
                new ObjectParameter("prFieldName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetDropdownItems_Result>("GetDropdownItems", prFieldNameParameter);
        }
    
        public virtual ObjectResult<byte[]> GenerateEncryptedPwd(string prUserLogin)
        {
            var prUserLoginParameter = prUserLogin != null ?
                new ObjectParameter("prUserLogin", prUserLogin) :
                new ObjectParameter("prUserLogin", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<byte[]>("GenerateEncryptedPwd", prUserLoginParameter);
        }
    
        public virtual ObjectResult<AuthenticatedUser> AuthenticateUser(string prLogin, string prPassword, Nullable<bool> prIsAdmin, Nullable<bool> prImpersonate)
        {
            var prLoginParameter = prLogin != null ?
                new ObjectParameter("prLogin", prLogin) :
                new ObjectParameter("prLogin", typeof(string));
    
            var prPasswordParameter = prPassword != null ?
                new ObjectParameter("prPassword", prPassword) :
                new ObjectParameter("prPassword", typeof(string));
    
            var prIsAdminParameter = prIsAdmin.HasValue ?
                new ObjectParameter("prIsAdmin", prIsAdmin) :
                new ObjectParameter("prIsAdmin", typeof(bool));
    
            var prImpersonateParameter = prImpersonate.HasValue ?
                new ObjectParameter("prImpersonate", prImpersonate) :
                new ObjectParameter("prImpersonate", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<AuthenticatedUser>("AuthenticateUser", prLoginParameter, prPasswordParameter, prIsAdminParameter, prImpersonateParameter);
        }
    
        public virtual ObjectResult<GetAgentRegistration_Result> GetAgentRegistration(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, string prSearchKeyword, Nullable<int> prRecordStatus, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prSearchKeywordParameter = prSearchKeyword != null ?
                new ObjectParameter("prSearchKeyword", prSearchKeyword) :
                new ObjectParameter("prSearchKeyword", typeof(string));
    
            var prRecordStatusParameter = prRecordStatus.HasValue ?
                new ObjectParameter("prRecordStatus", prRecordStatus) :
                new ObjectParameter("prRecordStatus", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAgentRegistration_Result>("GetAgentRegistration", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prSearchKeywordParameter, prRecordStatusParameter, oTotalRecord);
        }
    
        public virtual int SendActivationCode(Nullable<int> prRegistrationId, string prEmail)
        {
            var prRegistrationIdParameter = prRegistrationId.HasValue ?
                new ObjectParameter("prRegistrationId", prRegistrationId) :
                new ObjectParameter("prRegistrationId", typeof(int));
    
            var prEmailParameter = prEmail != null ?
                new ObjectParameter("prEmail", prEmail) :
                new ObjectParameter("prEmail", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("SendActivationCode", prRegistrationIdParameter, prEmailParameter);
        }
    
        public virtual ObjectResult<Nullable<bool>> ActivateAgent(string prActivationCode)
        {
            var prActivationCodeParameter = prActivationCode != null ?
                new ObjectParameter("prActivationCode", prActivationCode) :
                new ObjectParameter("prActivationCode", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<bool>>("ActivateAgent", prActivationCodeParameter);
        }
    
        public virtual ObjectResult<GetAgentProfile_Result> GetAgentProfile(string prUsername, Nullable<int> prAgentId)
        {
            var prUsernameParameter = prUsername != null ?
                new ObjectParameter("prUsername", prUsername) :
                new ObjectParameter("prUsername", typeof(string));
    
            var prAgentIdParameter = prAgentId.HasValue ?
                new ObjectParameter("prAgentId", prAgentId) :
                new ObjectParameter("prAgentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAgentProfile_Result>("GetAgentProfile", prUsernameParameter, prAgentIdParameter);
        }
    
        public virtual ObjectResult<GetRegistrationDetails_Result> GetRegistrationDetails(Nullable<int> prRegId)
        {
            var prRegIdParameter = prRegId.HasValue ?
                new ObjectParameter("prRegId", prRegId) :
                new ObjectParameter("prRegId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetRegistrationDetails_Result>("GetRegistrationDetails", prRegIdParameter);
        }
    
        public virtual ObjectResult<GetAgents_Result> GetAgents(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, string prSearchKeyword, Nullable<bool> prRecordStatus, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prSearchKeywordParameter = prSearchKeyword != null ?
                new ObjectParameter("prSearchKeyword", prSearchKeyword) :
                new ObjectParameter("prSearchKeyword", typeof(string));
    
            var prRecordStatusParameter = prRecordStatus.HasValue ?
                new ObjectParameter("prRecordStatus", prRecordStatus) :
                new ObjectParameter("prRecordStatus", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAgents_Result>("GetAgents", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prSearchKeywordParameter, prRecordStatusParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<SelectItem> GetMyAgents(Nullable<int> prSuperiorId, ObjectParameter oAllowCommConfig)
        {
            var prSuperiorIdParameter = prSuperiorId.HasValue ?
                new ObjectParameter("prSuperiorId", prSuperiorId) :
                new ObjectParameter("prSuperiorId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SelectItem>("GetMyAgents", prSuperiorIdParameter, oAllowCommConfig);
        }
    
        public virtual int InsertCommissionSettings(string prAgents, string prCreatedBy)
        {
            var prAgentsParameter = prAgents != null ?
                new ObjectParameter("prAgents", prAgents) :
                new ObjectParameter("prAgents", typeof(string));
    
            var prCreatedByParameter = prCreatedBy != null ?
                new ObjectParameter("prCreatedBy", prCreatedBy) :
                new ObjectParameter("prCreatedBy", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("InsertCommissionSettings", prAgentsParameter, prCreatedByParameter);
        }
    
        public virtual ObjectResult<CommissionSettings> GetCommissionSettings(Nullable<int> prProductId, string prAgentAcc)
        {
            var prProductIdParameter = prProductId.HasValue ?
                new ObjectParameter("prProductId", prProductId) :
                new ObjectParameter("prProductId", typeof(int));
    
            var prAgentAccParameter = prAgentAcc != null ?
                new ObjectParameter("prAgentAcc", prAgentAcc) :
                new ObjectParameter("prAgentAcc", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<CommissionSettings>("GetCommissionSettings", prProductIdParameter, prAgentAccParameter);
        }
    
        public virtual ObjectResult<CommissionSettings> GetAgentCommissionSettings(Nullable<int> prAgentId, Nullable<int> prProductId)
        {
            var prAgentIdParameter = prAgentId.HasValue ?
                new ObjectParameter("prAgentId", prAgentId) :
                new ObjectParameter("prAgentId", typeof(int));
    
            var prProductIdParameter = prProductId.HasValue ?
                new ObjectParameter("prProductId", prProductId) :
                new ObjectParameter("prProductId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<CommissionSettings>("GetAgentCommissionSettings", prAgentIdParameter, prProductIdParameter);
        }
    
        public virtual ObjectResult<DashboardMyTeamSubmissions_Result> DashboardMyTeamSubmissions(Nullable<int> prSuperiorId, ObjectParameter oTotalAllAgents)
        {
            var prSuperiorIdParameter = prSuperiorId.HasValue ?
                new ObjectParameter("prSuperiorId", prSuperiorId) :
                new ObjectParameter("prSuperiorId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<DashboardMyTeamSubmissions_Result>("DashboardMyTeamSubmissions", prSuperiorIdParameter, oTotalAllAgents);
        }
    
        public virtual ObjectResult<GetAnnouncement_Result> GetAnnouncement(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, string prTitle, Nullable<bool> prIsActive, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prTitleParameter = prTitle != null ?
                new ObjectParameter("prTitle", prTitle) :
                new ObjectParameter("prTitle", typeof(string));
    
            var prIsActiveParameter = prIsActive.HasValue ?
                new ObjectParameter("prIsActive", prIsActive) :
                new ObjectParameter("prIsActive", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAnnouncement_Result>("GetAnnouncement", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prTitleParameter, prIsActiveParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<GetWithdrawal_Result> GetWithdrawal(Nullable<int> prCurrentPage, Nullable<int> prPageSize, string prSortColumn, Nullable<bool> prSortInAsc, Nullable<bool> prIsCompleted, string prAgent, Nullable<System.DateTime> prSubmittedFrom, Nullable<System.DateTime> prSubmittedTo, Nullable<System.DateTime> prCompletedFrom, Nullable<System.DateTime> prCompletedTo, ObjectParameter oTotalRecord)
        {
            var prCurrentPageParameter = prCurrentPage.HasValue ?
                new ObjectParameter("prCurrentPage", prCurrentPage) :
                new ObjectParameter("prCurrentPage", typeof(int));
    
            var prPageSizeParameter = prPageSize.HasValue ?
                new ObjectParameter("prPageSize", prPageSize) :
                new ObjectParameter("prPageSize", typeof(int));
    
            var prSortColumnParameter = prSortColumn != null ?
                new ObjectParameter("prSortColumn", prSortColumn) :
                new ObjectParameter("prSortColumn", typeof(string));
    
            var prSortInAscParameter = prSortInAsc.HasValue ?
                new ObjectParameter("prSortInAsc", prSortInAsc) :
                new ObjectParameter("prSortInAsc", typeof(bool));
    
            var prIsCompletedParameter = prIsCompleted.HasValue ?
                new ObjectParameter("prIsCompleted", prIsCompleted) :
                new ObjectParameter("prIsCompleted", typeof(bool));
    
            var prAgentParameter = prAgent != null ?
                new ObjectParameter("prAgent", prAgent) :
                new ObjectParameter("prAgent", typeof(string));
    
            var prSubmittedFromParameter = prSubmittedFrom.HasValue ?
                new ObjectParameter("prSubmittedFrom", prSubmittedFrom) :
                new ObjectParameter("prSubmittedFrom", typeof(System.DateTime));
    
            var prSubmittedToParameter = prSubmittedTo.HasValue ?
                new ObjectParameter("prSubmittedTo", prSubmittedTo) :
                new ObjectParameter("prSubmittedTo", typeof(System.DateTime));
    
            var prCompletedFromParameter = prCompletedFrom.HasValue ?
                new ObjectParameter("prCompletedFrom", prCompletedFrom) :
                new ObjectParameter("prCompletedFrom", typeof(System.DateTime));
    
            var prCompletedToParameter = prCompletedTo.HasValue ?
                new ObjectParameter("prCompletedTo", prCompletedTo) :
                new ObjectParameter("prCompletedTo", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetWithdrawal_Result>("GetWithdrawal", prCurrentPageParameter, prPageSizeParameter, prSortColumnParameter, prSortInAscParameter, prIsCompletedParameter, prAgentParameter, prSubmittedFromParameter, prSubmittedToParameter, prCompletedFromParameter, prCompletedToParameter, oTotalRecord);
        }
    
        public virtual ObjectResult<DboardSubmissionStatusCount_Result> DboardSubmissionStatusCount(Nullable<int> prSuperiorId, Nullable<int> prYear)
        {
            var prSuperiorIdParameter = prSuperiorId.HasValue ?
                new ObjectParameter("prSuperiorId", prSuperiorId) :
                new ObjectParameter("prSuperiorId", typeof(int));
    
            var prYearParameter = prYear.HasValue ?
                new ObjectParameter("prYear", prYear) :
                new ObjectParameter("prYear", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<DboardSubmissionStatusCount_Result>("DboardSubmissionStatusCount", prSuperiorIdParameter, prYearParameter);
        }
    }
}
