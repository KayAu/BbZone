using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Security;

namespace BroadbandZone_App.WebApi
{
    public class UserController : ApiController
    {
        //// GET: User
        //// POST api/<controller>
        //public IHttpActionResult Authenticate([FromBody]AuthenticatedUser userLogin)
        //{
        //    try
        //    {               
        //        var user = UserIdentityHelper.AuthenticateUser(userLogin.Username, userLogin.Password, userLogin.IsAdmin ,false);
        //        if (user.IsAuthenticated == true)
        //        {
        //            FormsAuthentication.SetAuthCookie(userLogin.Username, false);
        //            UserIdentityHelper.SetLoginAccountToCookie(user);
        //            LogUserAccess(user);
        //        }
 
        //        return Ok(user);
        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
        //        return Content(HttpStatusCode.BadRequest, ex.Message);
        //    }
        //}

        [HttpGet]
        [Route("api/User/HasLoginExists/{userLogin}")]
        public IHttpActionResult HasLoginExists(string userLogin)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var agentFound = db.Agents.Where(a => a.UserLogin == userLogin).Count();
                    return Ok(agentFound > 0 ? true : false);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public IHttpActionResult UpdateAgentPassword(int id, [FromBody]MyPassword editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter validUpdate = new ObjectParameter("oValidUpdate", typeof(bool));
                    db.UpdateMyPasswordAgent(id, editedRecord.OldPassword, editedRecord.NewPassword, validUpdate);
                    return Ok(validUpdate.Value);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        //UpdateAdminPassword
        [HttpPut]
        public IHttpActionResult UpdateAdminPassword(string id, [FromBody]MyPassword editedRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter validUpdate = new ObjectParameter("oValidUpdate", typeof(bool));
                    db.UpdateMyPasswordAdmin(id, editedRecord.OldPassword, editedRecord.NewPassword, validUpdate);
                    return Ok(validUpdate.Value);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
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