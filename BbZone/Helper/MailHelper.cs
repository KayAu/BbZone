using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace BroadbandZone_App.Helper
{
    public static class MailHelper
    {
        public static void SendActivationEmail(string receipientEmail, string receipientName, object activationCode)
        {
            if (activationCode is null) return;
            try
            {
                SmtpClient SmtpClient = new SmtpClient();
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(Properties.Settings.Default.SenderEmail);
                mail.To.Add(receipientEmail);
                mail.Subject = "Confirm your email to activate your account";
                mail.IsBodyHtml = true;
                mail.Body = GenerateContent(receipientName, activationCode.ToString());
                SmtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception($"MailHelper.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private static string GenerateContent(string receipientName, string activationCode)
        {
            HttpRequest request = HttpContext.Current.Request;
            string baseUrl = request.Url.GetLeftPart(UriPartial.Authority);

            StringBuilder sb = new StringBuilder();
            sb.Append("<html><body>");
            sb.Append($"<p>Dear {receipientName},</p>");
            sb.Append($"<p>Please click the link below to confirm your email and activate your account.</p>");
            sb.Append($"<a href='{baseUrl}/Account/Activate/{activationCode}'>Activate Account</a>");
            sb.Append("</html></body>");

            return sb.ToString();
        }
    }
}