using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class PasswordController : ApiController
    {
        [HttpPost]
        public IHttpActionResult ResetPassword([FromBody]AgentPasswordReset editedRecord)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
                var agent = (new BroadbandZoneEntities()).ResetAgentPassword(editedRecord.Agent, editedRecord.NewPassword, currentUser.Fullname).FirstOrDefault();
                MailHelper.SendPasswordResetEmail(agent.Email, agent.Fullname, editedRecord.NewPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}