using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BroadbandZone_Data
{
    public partial class BroadbandZoneEntities : DbContext
    {
        public BroadbandZoneEntities(bool disabledLazyLoading)
          : base("name=BroadbandZoneEntities")
        {
            this.Configuration.LazyLoadingEnabled = !disabledLazyLoading;

        }
    }
}
