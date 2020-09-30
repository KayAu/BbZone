using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Text.RegularExpressions;
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
                foreach (string adminEmail in GetSuperAdminEmails())
                {
                    mail.Bcc.Add(adminEmail);
                }
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

        public static void SendPasswordResetEmail(string receipientEmail, string receipientName, string newPassword)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("<html><body>");
                sb.Append($"<p>Dear {receipientName},</p>");
                sb.Append($"<p>Your password been reset. This is your new password: {newPassword}. Your are encourage to change your password after you have login successfully.</p>");
                sb.Append("</html></body>");

                SmtpClient SmtpClient = new SmtpClient();
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(Properties.Settings.Default.SenderEmail);
                mail.To.Add(receipientEmail);
                mail.Subject = "Your password is reset";
                mail.IsBodyHtml = true;
                mail.Body = sb.ToString();

                SmtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception($"MailHelper.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public static void SendAnnouncementEmail(string receipientEmail, string receipientName, Announcement announcement)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("<html><body>");
                sb.Append($"<p>Dear {receipientName},</p>");
                sb.Append($"<p>{announcement.Descriptions}</p>");
                sb.Append(GetSignature());
                sb.Append("</html></body>");

                SmtpClient SmtpClient = new SmtpClient();
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(Properties.Settings.Default.SenderEmail);
                mail.To.Add(receipientEmail);
                mail.Subject = announcement.Title;
                mail.IsBodyHtml = true;
                mail.Body = sb.ToString();
                mail.AlternateViews.Add(ContentToAlternateView(sb.ToString()));

                foreach (var attachedFile in GetAttachedFiles(announcement))
                {
                    System.Net.Mail.Attachment attachment = new System.Net.Mail.Attachment(attachedFile);
                    mail.Attachments.Add(attachment);
                }

                SmtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception($"MailHelper.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }
        private static IEnumerable<string> GetAttachedFiles(Announcement annc)
        {
            foreach(var attachedFile in annc.AnnouncementDocuments)
            {
                var path = HttpContext.Current.Server.MapPath(attachedFile.Path);
                Console.WriteLine(path);
                yield return HttpContext.Current.Server.MapPath(attachedFile.Path);
            }
        }

        private static AlternateView ContentToAlternateView(string content)
        {
            var imgCount = 0;
            List<LinkedResource> resourceCollection = new List<LinkedResource>();
            foreach (Match m in Regex.Matches(content, "<img(?<value>.*?)>"))
            {
                imgCount++;
                var imgContent = m.Groups["value"].Value;
                string type = Regex.Match(imgContent, ":(?<type>.*?);base64,").Groups["type"].Value;
                string base64 = Regex.Match(imgContent, "base64,(?<base64>.*?)\"").Groups["base64"].Value;
                if (String.IsNullOrEmpty(type) || String.IsNullOrEmpty(base64))
                {
                    //ignore replacement when match normal <img> tag
                    continue;
                }
                var replacement = " src=\"cid:" + imgCount + "\"";
                content = content.Replace(imgContent, replacement);
                var tempResource = new LinkedResource(DataHelper.Base64ToImageStream(base64), new ContentType(type))
                {
                    ContentId = imgCount.ToString()
                };
                resourceCollection.Add(tempResource);
            }

            AlternateView alternateView = AlternateView.CreateAlternateViewFromString(content, null, MediaTypeNames.Text.Html);
            foreach (var item in resourceCollection)
            {
                alternateView.LinkedResources.Add(item);
            }

            return alternateView;
        }

        public static void SendNewApplicationEmail(CustomerApplication newApp)
        {
            try
            {
                GetPackageName(newApp.ProdPkgId, out string packageName, out string category);
                StringBuilder sb = new StringBuilder();
                sb.Append("<html><body>");
                sb.Append("<p>Dear all,</p>");
                sb.Append("<p>There is new application submitted. Please find the details summary as follow.</p>");
                sb.Append("<table>");
                sb.Append($"<tr><td class='padding-right:25px'>Application Id:</td><td>{newApp.ApplicationId}</td></tr>");
                sb.Append($"<tr><td class='padding-right:25px'>Customer Name:</td><td>{newApp.CustomerName}</td></tr>");
                sb.Append($"<tr><td class='padding-right:25px'>Package Name:</td><td>{packageName}</td></tr>");
                sb.Append($"<tr><td class='padding-right:25px'>Category:</td><td>{category}</td></tr>");
                sb.Append($"<tr><td class='padding-right:25px'>Agent Name:</td><td>{newApp.Agent}</td></tr>");
                sb.Append("</table>");
                sb.Append("</html></body>");

                //string receipientEmail = "kayeau80@gmail.com";// GetAdminEmails();
                SmtpClient SmtpClient = new SmtpClient();
                MailMessage mail = new MailMessage();
                foreach (string adminEmail in GetAdminEmails())
                {
                    mail.To.Add(adminEmail);
                }
                mail.From = new MailAddress(Properties.Settings.Default.SenderEmail);
                mail.Subject = "New Application Submitted";
                mail.IsBodyHtml = true;
                mail.Body = sb.ToString();

                SmtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception($"MailHelper.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public static void SendNewRegistrationEmail(Registration newReg)
        {
            try
            {
                //string receipientEmail = GetAdminEmails();
                StringBuilder sb = new StringBuilder();
                sb.Append("<html><body>");
                sb.Append("<p>Dear all,</p>");
                sb.Append("<p>There is a new agent registration. Please find the details summary as follow.</p>");
                sb.Append("<table>");
                sb.Append($"<tr><td class='padding-right:35px'>Registrant Name:</td><td>{newReg.Fullname}</td></tr>");
                sb.Append($"<tr><td class='padding-right:35px'>Registrant Email:</td><td>{newReg.Email}</td></tr>");
                sb.Append($"<tr><td class='padding-right:35px'>Registered On:</td><td>{newReg.CreatedOn.Value.ToString("dd MMM yyyy hh:mm")}</td></tr>");
                sb.Append("</table>");
                sb.Append("</html></body>");

                SmtpClient SmtpClient = new SmtpClient();
                MailMessage mail = new MailMessage();
                foreach (string adminEmail in GetAdminEmails())
                {
                    mail.To.Add(adminEmail);
                }
                mail.From = new MailAddress(Properties.Settings.Default.SenderEmail);
                mail.Subject = "New Agent Registration";
                mail.IsBodyHtml = true;
                mail.Body = sb.ToString();

                SmtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception($"MailHelper.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private static string GetSignature()
        {
            try
            {
                string body = string.Empty;
                using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/signature.html")))
                {
                    body = reader.ReadToEnd();
                }

                return body;
            }
            catch (Exception ex)
            {
                throw new Exception($"GetSignature.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }
        private static IEnumerable<string> GetAdminEmails()
        {
            ObjectParameter strAdminEmails = new ObjectParameter("oEmails", typeof(string));
            var results = (new BroadbandZoneEntities()).GetAdminEmail(strAdminEmails);

            string[] emails = strAdminEmails.Value.ToString().Split(';');
            foreach(string eml in emails)
            {
                yield return eml;
            }
        }

        private static IEnumerable<string> GetSuperAdminEmails()
        {
            using (var db = new BroadbandZoneEntities())
            {
                var sAdmins = db.AdminUsers.Where(u => u.HasFullControl == true);
                foreach (AdminUser admin in sAdmins)
                {
                    yield return admin.Email;
                }
            }
        }

        private static void GetPackageName(int packageId, out string packageName, out string category)
        {
            var package = (new BroadbandZoneEntities()).ProductPackages.Where(p => p.ProdPkgId == packageId).FirstOrDefault();
            packageName = package.PackageName;
            category = package.ProductCategory.Category;
        }
    }
}