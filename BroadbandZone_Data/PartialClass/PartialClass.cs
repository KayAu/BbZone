using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BroadbandZone_Data
{
    public partial class Communication
    {
        public int UnreadMessages { get; set; }
    }
    public partial class CustomerDocument
    {
        public bool? Deleted { get; set; }
    }

    public partial class AnnouncementDocument
    {
        public bool? Deleted { get; set; }
    }

    public partial class Registration
    {
        public string Password { get; set; }
    }

    public partial class AdminUser
    {
        public string Password { get; set; }
    }

    public partial class Withdrawal
    {
        public bool AllowEdit { get; set; }
        public bool AllowTerminate { get; set; }
        public decimal? TotalAmountToDeduct { get; set; }
        public decimal? TotalSelectedAmount { get; set; }
        public List<GetWithdrawalItems_Result> WithdrawalItems { get; set; }
    }

}
