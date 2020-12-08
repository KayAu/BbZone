using System;
using Microsoft.Owin.Security;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Owin.Security.OAuth;
using BroadbandZone_App.Helper;
using BroadbandZone_App.App_Start;
using BroadbandZone_Data;
using System.Web;

namespace BroadbandZone_App.Providers
{
    public class OAuthProvider : OAuthAuthorizationServerProvider
    {
        private bool IsAdmin = false;

        #region[GrantResourceOwnerCredentials]
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            return Task.Factory.StartNew(() =>
            {
                var user = UserIdentityHelper.AuthenticateUser(context.UserName, context.Password, IsAdmin);

                if (user != null)
                {
                    var claims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.Sid, Convert.ToString(user.Username)),
                        new Claim(ClaimTypes.Name, user.Fullname),
                        new Claim(ClaimTypes.UserData, Newtonsoft.Json.JsonConvert.SerializeObject(user))
                    };
                    ClaimsIdentity oAuthIdentity = new ClaimsIdentity(claims, Startup.OAuthOptions.AuthenticationType);

                    var properties = CreateProperties(user);
                    var ticket = new AuthenticationTicket(oAuthIdentity, properties);
                    context.Validated(ticket);
                    context.Request.Context.Authentication.SignIn(new AuthenticationProperties() { IsPersistent = true }, oAuthIdentity);
                }
                else
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect");
                }
            });
        }
        #endregion

        #region[ValidateClientAuthentication]
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null)
            {
                this.IsAdmin = Convert.ToBoolean(context.Parameters.Get("IsAdmin"));
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }
        #endregion

        #region[TokenEndpoint]
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        #endregion

        #region[CreateProperties]
        public static AuthenticationProperties CreateProperties(AuthenticatedUser user)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "username", user.Username },
                { "fullname", user.Fullname },
                { "role", user.Role },
                { "isAuthenticated", user.IsAuthenticated.ToString() },
                { "isImpersonated", user.IsImpersonated.ToString() },
                { "isAdmin", user.IsAdmin.ToString() },
                { "agentId", user.AgentId.ToString() },
                { "hasFullControl", user.HasFullControl.ToString() }
            };

            return new AuthenticationProperties(data);
        }
        #endregion
    }

}