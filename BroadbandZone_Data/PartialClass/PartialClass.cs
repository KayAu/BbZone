using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BroadbandZone_Data
{
    public partial class CustomerDocument
    {
        public bool? Deleted { get; set; }
    }

    public partial class Registration
    {
        public string Password { get; set; }
    }


}
