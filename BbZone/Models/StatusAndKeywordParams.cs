using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BroadbandZone_App.Models
{
    public class DateRange {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class StatusAndKeywordParams
    {
        public bool? IsActive { get; set; }
        public string Keyword { get; set; }
    }

    public class SearchClawbackParams
    {
        public bool? IsDeducted { get; set; }
        public string Keyword { get; set; }
    }

    public class ApprovalAndKeywordParams
    {
        public int ApprovalMode { get; set; }
        public string Keyword { get; set; }
    }

    public class SearchOrderParams
    {
        public int? ProductId { get; set; }
        public int? ProductCategoryId { get; set; }
        public int? ProductPackageId { get; set; }
        public int? OrderStatusId { get; set; }
        public string Agent { get; set; }
        public DateRange SubmittedDate { get; set; }
        public DateRange ActivationDate { get; set; }
        public string ResidentialType { get; set; }
        public string Keyword { get; set; }
        public bool? DocumentCompleted { get; set; }
        public int FilterByMode { get; set; }
    }

    public class SearchCompletedOrderParams
    {
        public int? ProductId { get; set; }
        public int? ProductCategoryId { get; set; }
        public int? ProductPackageId { get; set; }
        public string Agent { get; set; }
        public DateRange ActivatedDate { get; set; }
        public DateRange PaymentDate { get; set; }
        public bool? DocumentCompleted { get; set; }
        public string Keyword { get; set; }
        public string CommissionStatus { get; set; }
    }

    public class SearchWithdrawalParams
    {
        public string Keyword { get; set; }
        public string Agent { get; set; }
        public string Status { get; set; }
        
        public DateRange SubmittedDate { get; set; }
        public DateRange CompletedDate { get; set; }
    }
    public class SearchAnnouncementParams
    {
        public string Title { get; set; }
        public bool? IsActive { get; set; }
        public DateRange AnnouncementDate { get; set; }
    }
    public class SearchIncentivesParams
    {
        public string Keyword { get; set; }
        public int? ProductId { get; set; }
        public int? ProductCategoryId { get; set; }
        public int? ProductPackageId { get; set; }
        public DateRange ReceivedDate { get; set; }
        public bool? PaymentReceived { get; set; }
    }

    public class SearchAgentPocketdParams
    {
        public bool? IsActive { get; set; }
        public string Keyword { get; set; }
        public string FlowType { get; set; }
    }
}
