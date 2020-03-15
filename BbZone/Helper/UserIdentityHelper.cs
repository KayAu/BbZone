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
        //    public static ApplicationUser GetUserDetails(string username)
        //    {
        //        try
        //        {
        //            ApplicationUser currentUser = new ApplicationUser();

        //            using(var context = new PrincipalContext(ContextType.Domain, Properties.Settings.Default.ADDomain))
        //            {
        //                UserPrincipal user = UserPrincipal.FindByIdentity(context, username.StripADDomain());
        //                if (user != null)
        //                {
        //                    currentUser.Fullname = user.DisplayName;
        //                    currentUser.Email = user.EmailAddress;
        //                    currentUser.JobTitle = user.GetProperty("title");
        //                }
        //            }

        //            return currentUser;
        //        }
        //        catch(Exception ex)
        //        {
        //            throw new Exception($"UserIdentityHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
        //        }
        //    }

        //    /// <summary>
        //    /// Get property value from DirectoryEntry   
        //    /// </summary>
        //    /// <param name="principal">UserPrincipal object</param>
        //    /// <param name="property">Property name</param>
        //    /// <returns></returns>
        //    public static String GetProperty(this Principal principal, String property)
        //    {

        //        DirectoryEntry directoryEntry = principal.GetUnderlyingObject() as DirectoryEntry;
        //        if (directoryEntry.Properties.Contains(property))
        //            return directoryEntry.Properties[property].Value.ToString();
        //        else
        //            return String.Empty;

        //    }

        //    /// <summary>
        //    /// Find user by search keyword
        //    /// </summary>
        //    /// <param name="dataValue">Search value</param>
        //    /// <returns></returns>
        //    public static List<EmployeeAccountModel> FindUserInAD(string dataValue)
        //    {
        //        try
        //        {
        //            PrincipalContext ctx = new PrincipalContext(ContextType.Domain, Properties.Settings.Default.ADDomain);

        //            UserPrincipal qbeUser = new UserPrincipal(ctx);
        //            qbeUser.DisplayName = $"{dataValue}*";

        //            // create your principal searcher passing in the QBE principal
        //            PrincipalSearcher srch = new PrincipalSearcher(qbeUser);
        //            var results = srch.FindAll();

        //            if (results != null)
        //            {
        //                var lstEmployee = results.Select(r => new EmployeeAccountModel
        //                {
        //                    Account = r.SamAccountName,
        //                    FullName = r.DisplayName,
        //                    JobTitle = ((UserPrincipal)r).GetProperty("Title"),
        //                    Email = ((UserPrincipal)r).EmailAddress
        //                }).Take(20);

        //                return lstEmployee.ToList();
        //            }

        //            return null;
        //        }
        //        catch (Exception ex)
        //        {
        //            throw new Exception($"UserIdentityHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
        //        }
        //    }

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

                var cookieName = GetCookieName();
                var expiredOn = DateTime.Now.AddDays(1); // persistInCookie ? DateTime.Now.AddDays(1) : DateTime.Now + System.Web.Security.FormsAuthentication.Timeout;
                var authTicket = new System.Web.Security.FormsAuthenticationTicket(1,
                                                                                    cookieName,
                                                                                    DateTime.Now,
                                                                                    expiredOn,
                                                                                    persistInCookie,
                                                                                    Newtonsoft.Json.JsonConvert.SerializeObject(user));
                var encrypt = System.Web.Security.FormsAuthentication.Encrypt(authTicket);
                var authCookie = new HttpCookie(cookieName, encrypt) { HttpOnly = true, Expires = expiredOn };
                HttpCookie userIdCookie = HttpContext.Current.Response.Cookies.Get(cookieName);

                if (userIdCookie == null)
                {
                    HttpContext.Current.Response.Cookies.Add(authCookie);
                }
                else
                {
                    HttpContext.Current.Response.Cookies.Set(authCookie);
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
                var cookieName = GetCookieName();
                var authCookie = HttpContext.Current.Request.Cookies[cookieName];
                if (authCookie != null && authCookie.Value != null)
                {
                    FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                    if (authTicket != null && authTicket.UserData != null)
                    {
                        user = Newtonsoft.Json.JsonConvert.DeserializeObject<AuthenticatedUser>(authTicket.UserData);
                        //user.PersistInCookie = authTicket.IsPersistent;
                    }
                }
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
            finally
            {
                // Ensure impersonation is reverted
                //ctx.Undo();
            }
        }

        private static string GetCookieName()
        {
            string solutionName = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name;
            return $"{System.Web.Security.FormsAuthentication.FormsCookieName}_{solutionName}";
        }
    }
}
