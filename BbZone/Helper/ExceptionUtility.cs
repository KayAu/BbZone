using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Practices.EnterpriseLibrary.Logging;


namespace BroadbandZone_App.Helper
{
    public static class ExceptionUtility
    {
        // set the solutionName variable to the appliation name
        private static string solutionName = "CallLog";

        public static void LogError(Exception ex, params string[] moreInfo)
        {
            if (Logger.IsLoggingEnabled())
            {
                try
                {
                    LogEntry log = GetLogEntry();
                    log.Categories.Add(solutionName);
                    log.Priority = 9;
                    log.Severity = System.Diagnostics.TraceEventType.Error;
                    log.Message = ex.Message + " : " + String.Join(" ", moreInfo);
                    log.ExtendedProperties.Add("Stack Trace", ex.StackTrace);
                    log.ExtendedProperties.Add("Target Site", ex.TargetSite);
                    Logger.Write(log);
                }
                catch
                {
                    Console.Write("Testing");
                }
            }
        }

        public static void LogEFException(Exception ex, string methodName)
        {
            if (Logger.IsLoggingEnabled())
            {
                try
                {
                    LogEntry log = GetLogEntry();
                    log.Categories.Add(solutionName);
                    log.Priority = 9;
                    log.Severity = System.Diagnostics.TraceEventType.Error;
                    log.Message = $"{methodName} : {ex.Message}";
                    log.Message += ex.InnerException != null ? $" => {ex.InnerException.Message}" : string.Empty ;
                    log.ExtendedProperties.Add("Stack Trace", ex.StackTrace);
                    log.ExtendedProperties.Add("Target Site", ex.TargetSite);
                    Logger.Write(log);
                }
                catch
                {
                    Console.Write("Testing");
                }
            }
        }
        public static void LogMessage(string message)
        {
            if (Logger.IsLoggingEnabled())
            {
                try
                {
                    LogEntry log = GetLogEntry();
                    log.Categories.Add(solutionName);
                    log.Priority = 5;
                    log.Severity = System.Diagnostics.TraceEventType.Information;
                    log.Message = message;
                    Logger.Write(log);
                }
                catch { }
            }
        }

        public static string GenerateEFValidationMesssage(System.Data.Entity.Validation.DbEntityValidationException e)
        {
            string rs = "";
            foreach (var eve in e.EntityValidationErrors)
            {
                rs = string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:", eve.Entry.Entity.GetType().Name, eve.Entry.State);
                Console.WriteLine(rs);

                foreach (var ve in eve.ValidationErrors)
                {
                    rs += "<br />" + string.Format("- Property: \"{0}\", Error: \"{1}\"", ve.PropertyName, ve.ErrorMessage);
                }
            }

            return rs;
        }

        private static LogEntry GetLogEntry()
        {
            LogEntry log = new LogEntry();
            log.TimeStamp = DateTime.Now;
            log.Title = solutionName;
            log.Priority = 5;                       // default priority
            log.Severity = System.Diagnostics.TraceEventType.Verbose;  // default severity
            log.MachineName = System.Environment.MachineName;
            log.ProcessId = System.Diagnostics.Process.GetCurrentProcess().Id.ToString();
            return log;
        }
    }

}