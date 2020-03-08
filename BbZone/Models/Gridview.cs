using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BroadbandZone_App.Models
{
    public class Gridview<T>
    {
        public List<T> DisplayData { get; set; }
        public int TotalRecords{ get; set; }
    }


}
