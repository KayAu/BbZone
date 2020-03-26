using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using System.IO;
using iTextSharp.tool.xml;
using iTextSharp.tool.xml.pipeline.css;
using iTextSharp.tool.xml.css;
using iTextSharp.tool.xml.pipeline.html;
using iTextSharp.tool.xml.html;
using iTextSharp.tool.xml.pipeline.end;
using iTextSharp.tool.xml.parser;
using System.Text;

namespace BroadbandZone_App.Controllers
{
    public class AccountController : Controller
    {
        // GET: Activation
        public ActionResult Activate(string id)
        {
            try
            {
                if (!string.IsNullOrEmpty(id))
                {
                    using (var db = new BroadbandZoneEntities())
                    {
                        bool isActivated = db.ActivateAgent(id).First().Value;

                        if (isActivated)
                        {
                            return RedirectToAction("Index", "Home");
                        }
                    }
                }

                ViewBag.Message = "Invalid Activation Code";
                return View();
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }

        }

    }
}

