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
        public DateRange submittedDate { get; set; }
    }

    public class SearchWithdrawalParams
    {
        public string Agent { get; set; }
        public bool? IsCompleted { get; set; }
        public DateRange SubmittedDate { get; set; }
        public DateRange CompletedDate { get; set; }
    }
    public class SearchAnnouncementParams
    {
        public string Title { get; set; }
        public bool? IsActive { get; set; }
        public DateRange AnnouncementDate { get; set; }
    }
}
