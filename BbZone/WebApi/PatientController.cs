using CallCenterApp.EFData;
using CallCenterApp.Helper;
using CallCenterApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CallCenterApp.WebApi
{
    public class PatientController : ApiController
    {
        [Route("api/Patient/GetStates")]
        // GET api/<controller>
        public IHttpActionResult GetStates()
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    var states = db.GetPatientStates().Select(s=> new DropdownItem { DataText = s.StateName, DataValue = s.StateCode }).ToList();
                    return Ok(states);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Patient/GetCallAgents")]
        public IHttpActionResult GetCallAgents()
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    var callAgents = db.Users.Select(s => new DropdownItem { DataText = s.Fullname, DataValue = s.LoginAcc }).ToList();
                    return Ok(callAgents);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Patient/GetDevices")]
        public IHttpActionResult GetDevices()
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    var devices = db.PatientDevices.Select(d => new DropdownItem { DataValue = d.ModelNo, DataText = d.ModelName }).Distinct().ToList();
                    return Ok(devices);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Patient/GetSalesRegion")]
        public IHttpActionResult GetSalesRegion()
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    var devices = db.PatientCalls.Select(d => new DropdownItem { DataValue = d.Region, DataText = d.Region }).Distinct().OrderBy(pc=>pc.DataText).ToList();
                    return Ok(devices);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Patient/GetRegions")]
        public IHttpActionResult GetRegions()
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    var regions = db.PatientCalls.Select(d => new DropdownItem { DataValue = d.Region, DataText = d.Region }).Distinct().OrderBy(pc => pc.DataText).ToList();
                    return Ok(regions);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        //[Route("api/Patient/SearchBy")]
        public Gridview<SearchPatients_Result> SearchBy(int currentPage, int pageSize, string sortColumn, bool sortInAsc, string filterParams)
        {
            PatientFilterParams filter = JsonConvert.DeserializeObject<PatientFilterParams>(filterParams);
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));

                    var results = db.SearchPatients(currentPage, pageSize, sortColumn, sortInAsc, filter.Keyword, filter.State, filter.Region, filter.CallAgent, filter.AgreeToCall, totalRecord).ToList();

                    return new Gridview<SearchPatients_Result>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    };
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return null;
            }
        }

        [Route("api/Patient/GetPatientDetails/{patientKey}")]
        public IHttpActionResult GetPatientDetails(long patientKey)
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    var rPatient = db.GetPatientDetails(patientKey).FirstOrDefault();
                    var rDevices = db.GetPatientDevices(patientKey).ToList();
                    return Ok(new { patient = rPatient, devices = rDevices });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPut]
        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, [FromBody]PatientCall editedItem)
        {
            try
            {
                using (var db = new CallLogEntities(true))
                {
                    editedItem.SetDateAndAuthor(this.User.Identity.Name, "ModifiedBy", "ModifiedOn");
                    db.Entry(editedItem).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok(editedItem);
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