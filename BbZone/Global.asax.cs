using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace BroadbandZone_App
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private const string RootUrl = "~/Home/Index";

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            HttpConfiguration config = GlobalConfiguration.Configuration;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            //Bootstrapping logging
            DatabaseFactory.SetDatabaseProviderFactory(new DatabaseProviderFactory());
            IConfigurationSource configurationSource = ConfigurationSourceFactory.Create();
            LogWriterFactory logWriterFactory = new LogWriterFactory(configurationSource);
            Logger.SetLogWriter(logWriterFactory.Create());
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            // Gets incoming request path
            var path = Request.Url.AbsolutePath;

            // To allow access to api via url during testing (if you're using api controllers) - you may want to remove this in production unless you wish to grant direct access to api calls from client...
            var isApi = path.StartsWith("/api", StringComparison.InvariantCultureIgnoreCase);
            // To allow access to my .net MVCController for login
            var isAccount = path.StartsWith("/account", StringComparison.InvariantCultureIgnoreCase);
            if (isApi || isAccount)
            {
                return;
            }

            // Redirects to the RootUrl you specified above if the server can't find anything else
            if (!System.IO.File.Exists(Context.Server.MapPath(path)))
                Context.RewritePath(RootUrl);
        }

        protected void Session_End(object sender, EventArgs e)
        {
            var ctx = HttpContext.Current;
            ctx.Response.Redirect("~/Home/Index");      
        }
    }
}
