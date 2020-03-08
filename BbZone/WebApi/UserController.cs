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
                var user = UserIdentityHelper.AuthenticateUser(userLogin.Username, userLogin.Password, userLogin.IsAdmin.Value ,false);

                if (user.IsAuthenticated == true)
                {
                    FormsAuthentication.SetAuthCookie(userLogin.Username, false);
                    UserIdentityHelper.SetLoginAccountToCookie(user);
                }
 
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}