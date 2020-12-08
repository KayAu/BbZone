using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyEarn_Data
{
    public partial class EasyEarnEntities : DbContext
    {
        public EasyEarnEntities(bool disabledLazyLoading)
          : base("name=EasyEarnEntities")
        {
            this.Configuration.LazyLoadingEnabled = !disabledLazyLoading;

        }
    }
}
