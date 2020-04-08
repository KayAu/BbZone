using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Security;

namespace BroadbandZone_App.WebApi
{
    public class UserController : ApiController
    {
        // GET: User
        // POST api/<controller>
        public IHttpActionResult Authenticate([FromBody]AuthenticatedUser userLogin)
        {
            try
            {               
                var user = UserIdentityHelper.AuthenticateUser(userLogin.Username, userLogin.Password, userLogin.IsAdmin ,false);

                if (user.IsAuthenticated == true)
                {
                    FormsAuthentication.SetAuthCookie(userLogin.Username, false);
                    UserIdentityHelper.SetLoginAccountToCookie(user);
                    LogUserAccess(user);
                }
 
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        private void LogUserAccess(AuthenticatedUser user)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    LoginTrail loginTrail = new LoginTrail();
                    loginTrail.AgentId = !user.IsAdmin ? user.AgentId: null;
                    loginTrail.LoginName = user.Username;
                    loginTrail.LoginDate = DateTime.Now;

                    db.LoginTrails.Add(loginTrail);
                    db.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }
    }
}