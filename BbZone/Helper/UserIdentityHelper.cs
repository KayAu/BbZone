using System;
using System.Collections.Generic;
using System.Linq;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using BroadbandZone_App.Models;
using BroadbandZone_App.EFData;
using System.Web;
using System.Web.Security;
using System.Security.Principal;
using System.Diagnostics;
using BroadbandZone_Data;

namespace BroadbandZone_App.Helper
{
    public static class UserIdentityHelper
    {
        public static AuthenticatedUser AuthenticateUser(string username, string password, bool isAdmin = false, bool impersonating = false)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    var loginDetails = db.AuthenticateUser(username, password, isAdmin, impersonating).FirstOrDefault();
                    return loginDetails != null ? loginDetails : new AuthenticatedUser { IsAuthenticated = false };
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"UserIdentityHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }
        }

        /// <summary>
        /// Set login account to cookie
        /// </summary>
        /// <param name="userLoginName">User login account</param>
        public static void SetLoginAccountToCookie(AuthenticatedUser user, bool persistInCookie = true)
        {
            try
            {
                //var authTicket = new System.Web.Security.FormsAuthenticationTicket(1,
                //                                                                    FormsAuthentication.FormsCookieName,
                //                                                                    DateTime.Now,
                //                                                                    DateTime.Now.AddDays(1),
                //                                                                    false,
                //                                                                    Newtonsoft.Json.JsonConvert.SerializeObject(user),
                //                                                                     FormsAuthentication.FormsCookiePath);
                //var encrypt = System.Web.Security.FormsAuthentication.Encrypt(authTicket);
                //var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encrypt)
                //{
                //    HttpOnly = true,
                //    Secure = true,
                //    Path = FormsAuthentication.FormsCookiePath
                //};
                //HttpContext.Current.Response.Cookies.Add(cookie);
                var session = HttpContext.Current.Session;
                if (session != null)
                {
                    session["user"] = user;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"UserIdentityHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }
        }

        /// <summary>
        /// Get login account from cookie
        /// </summary>
        /// <returns></returns>
        public static AuthenticatedUser GetLoginAccountFromCookie()
        {
            AuthenticatedUser user = null;

            try
            {
                var session = HttpContext.Current.Session;
                user = session["user"] as AuthenticatedUser;
                //var authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                //if (authCookie != null && authCookie.Value != null)
                //{
                //    FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                //    if (authTicket != null && authTicket.UserData != null)
                //    {
                //        user = Newtonsoft.Json.JsonConvert.DeserializeObject<AuthenticatedUser>(authTicket.UserData);
                //        //user.PersistInCookie = authTicket.IsPersistent;
                //    }
                //}
            }
            catch (Exception ex)
            {
                throw new Exception($"UserIdentityHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }

            return user;
        }

        /// <summary>
        /// Impersonate user
        /// </summary>
        /// <param name="username">User name of the person to impersonate</param>
        public static void Impersonate(string username, string userRole)
        {
            try
            {
                WindowsIdentity identity = new WindowsIdentity(username);

                string[] userRoles = { userRole };  //Roles.GetRolesForUser(identity.Name);
                var prin = new GenericPrincipal(identity, userRoles);
                HttpContext.Current.User = prin;
            }
            catch (Exception ex)
            {
                throw new Exception($"UserIdentityHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }
        }

        private static string GetCookieName()
        {
            string solutionName = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name;
            return $"{System.Web.Security.FormsAuthentication.FormsCookieName}_{solutionName}";
        }
    }
}
