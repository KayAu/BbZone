﻿using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class CommissionController : ApiController
    {
        private AuthenticatedUser currentUser;
        public CommissionController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }

        //GetAppWithoutCommissionSet
        [HttpGet]
        [Route("api/Commission/GetAppWithoutCommissionSet")]
        // Get product categories given the product id
        public IHttpActionResult GetAppWithoutCommissionSet()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var commSettings = db.GetAppWithoutCommAssigned(currentUser.AgentId).ToList();
                    return Ok(commSettings);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Commission/GetCommissionSettings/{productId}")]
        // Get product categories given the product id
        public IHttpActionResult GetCommissionSettings(int productId)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var commSettings = db.GetCommissionSettings(productId, currentUser.Username).ToList();
                    return Ok(commSettings);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Commission/GetMyAgentsForCommissionSetting/{productId}")]
        // GET api/<controller>
        public IHttpActionResult GetMyAgentsForCommissionSetting(int productId)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter allowCommConfig = new ObjectParameter("oAllowCommConfig", typeof(bool));
                    var results = (new BroadbandZoneEntities()).GetMyAgentsForCommissionSetting(currentUser.AgentId, productId, allowCommConfig).ToList();
                    return Ok(new 
                    {
                        DisplayData = results,
                        AllowCommConfig = Convert.ToBoolean(allowCommConfig.Value)
                    });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Commission/GetAgentCommissionSettings/{agentId}/{productId}")]
        // Get list of agents who haven't have theor commissions  set up yet
        public IHttpActionResult GetAgentCommissionSettings(int agentId, int productId)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var agent = db.GetAgentCommissionSettings(agentId, productId).ToList();
                    return Ok(agent);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Commission/GetMyAgentsCommission/{productId}")]
        // GET api/<controller>
        public IHttpActionResult GetMyAgentsCommission(int productId)
        {
            try
            {
                DataTable dt = new DataTable();
                using (var db = new BroadbandZoneEntities())
                {
                    db.Database.Connection.Open();
                    using (var cmd = db.Database.Connection.CreateCommand())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "prc_GetMyAgentCommission";   
                        
                        DbParameter prProductId = cmd.CreateParameter();
                        prProductId.ParameterName = "@prProductId";
                        prProductId.DbType = System.Data.DbType.Int32;
                        prProductId.Value = productId;

                        DbParameter prUsername = cmd.CreateParameter();
                        prUsername.ParameterName = "@prSuperiorId";
                        prUsername.DbType = System.Data.DbType.String;
                        prUsername.Value = currentUser.AgentId;

                        cmd.Parameters.Add(prProductId);
                        cmd.Parameters.Add(prUsername);
                        using (var reader = cmd.ExecuteReader())
                        {
                            dt.Load(reader);
                            return Ok(dt);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("api/Commission/GetMyCommission/{agentId}/{productId}")]
        // GET api/<controller>
        public IHttpActionResult GetMyCommission(int agentId, int productId)
        {
            try
            {
                DataTable dt = new DataTable();
                using (var db = new BroadbandZoneEntities())
                {
                    db.Database.Connection.Open();
                    using (var cmd = db.Database.Connection.CreateCommand())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "prc_GetMyCommission";

                        DbParameter prProductId = cmd.CreateParameter();
                        prProductId.ParameterName = "@prProductId";
                        prProductId.DbType = System.Data.DbType.Int32;
                        prProductId.Value = productId;

                        DbParameter prUsername = cmd.CreateParameter();
                        prUsername.ParameterName = "@prAgentId";
                        prUsername.DbType = System.Data.DbType.String;
                        prUsername.Value = agentId;

                        cmd.Parameters.Add(prProductId);
                        cmd.Parameters.Add(prUsername);
                        using (var reader = cmd.ExecuteReader())
                        {
                            dt.Load(reader);
                            return Ok(dt);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        // POST api/<controller>
        public IHttpActionResult Post([FromBody]NewAgentCommission newRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    string strAgents = string.Join(";", newRecord.Agents);
                    DataTable commSettings = newRecord.CommissionSettings.ToDataTable();

                    string command = "EXEC prc_InsertCommissionSettings @prAgents, @prCommissionSetting, @prCreatedBy";
                    var prAgent = new SqlParameter("prAgents", SqlDbType.VarChar);
                    prAgent.Value = strAgents;

                    var prCommissionSetting = new SqlParameter("prCommissionSetting", SqlDbType.Structured);
                    prCommissionSetting.Value = commSettings;
                    prCommissionSetting.TypeName = "dbo.udt_CommissionSetting";

                    var prCreatedBy = new SqlParameter("prCreatedBy", SqlDbType.VarChar);
                    prCreatedBy.Value = currentUser.Fullname;

                    db.Database.ExecuteSqlCommand(command, prAgent, prCommissionSetting, prCreatedBy);
                    
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, CommissionSettings[] editedRecords)
        {
            try {
                using (var db = new BroadbandZoneEntities())
                {
                    DataTable commSettings = editedRecords.ToDataTable();

                    string command = "EXEC prc_UpdateCommissionSettings @prAgentId, @prCommissionSetting, @prCreatedBy";
                    var prAgentId = new SqlParameter("prAgentId", SqlDbType.Int);
                    prAgentId.Value = id;

                    var prCommissionSetting = new SqlParameter("prCommissionSetting", SqlDbType.Structured);
                    prCommissionSetting.Value = commSettings;
                    prCommissionSetting.TypeName = "dbo.udt_CommissionSetting";

                    var prCreatedBy = new SqlParameter("prCreatedBy", SqlDbType.VarChar);
                    prCreatedBy.Value = currentUser.Fullname;

                    db.Database.ExecuteSqlCommand(command, prAgentId, prCommissionSetting, prCreatedBy);

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


    }
}