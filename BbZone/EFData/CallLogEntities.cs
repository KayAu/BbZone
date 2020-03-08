using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.EFData
{
    public partial class CallLogEntities : DbContext
    {
        public CallLogEntities(bool disabledLazyLoading)
          : base("name=CallLogEntities")
        {
            this.Configuration.LazyLoadingEnabled = !disabledLazyLoading;

        }
    }
}