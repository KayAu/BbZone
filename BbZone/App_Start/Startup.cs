using BroadbandZone_App.Helper;
using BroadbandZone_App.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.Http;
[assembly: OwinStartup(typeof(BroadbandZone_App.App_Start.Startup))]
namespace BroadbandZone_App.App_Start
{
    public class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        static Startup()
        {
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/api/token"),
                Provider = new OAuthProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                AllowInsecureHttp = true
            };
        }

        public void Configuration(IAppBuilder app)
        {
            app.UseOAuthBearerTokens(OAuthOptions);
            app.UseOAuthAuthorizationServer(OAuthOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions
            {
                Provider = new OAuthBearerAuthenticationProvider()
            });
        
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
        }
    }
}