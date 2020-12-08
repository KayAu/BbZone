using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BroadbandZone_App
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Ignnore reference loop handling
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            config.Routes.MapHttpRoute(
              name: "API Default",
              routeTemplate: "api/{controller}/{action}/{id}",
              defaults: new { id = RouteParameter.Optional }
            );

            // route.RouteHandler = new MyHttpControllerRouteHandler();
        }

        public static string UrlPrefix { get { return "api"; } }
        public static string UrlPrefixRelative { get { return "~/api"; } }
    
    }
}
