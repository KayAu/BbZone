using BroadbandZone_Data;
using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using iTextSharp.tool.xml;
using iTextSharp.tool.xml.pipeline.css;
using iTextSharp.tool.xml.pipeline.html;
using iTextSharp.tool.xml.html;
using iTextSharp.tool.xml.pipeline.end;
using iTextSharp.tool.xml.parser;
using System.Text;
using System.Web;
using System.Net;
using System.Net.Http.Headers;

namespace BroadbandZone_App.WebApi
{
    public class PaymentVoucherController : ApiController
    {
        [HttpGet]
        [Route("api/PaymentVoucher/Print/{id}")]
        // GET api/<controller>
        public HttpResponseMessage Print(int id)
        {
            try
            {
                GetPaymentDetails_Result paymentVoucher = GetDetails(id);
                string content = PopulateBody(paymentVoucher);
                var pdfDoc = CreatePdf(content);

                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(pdfDoc);
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = $"PaymentVoucher_{paymentVoucher.SlipNo}.pdf";
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private GetPaymentDetails_Result GetDetails(int id)
        {
            using (var db = new BroadbandZoneEntities())
            {
                GetPaymentDetails_Result paymentVoucher = db.GetPaymentDetails(id).FirstOrDefault();
                return paymentVoucher;
            }
        }

        private string PopulateBody(GetPaymentDetails_Result paymentVoucher)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/paymentVoucher.html")))
            {
                body = reader.ReadToEnd();
            }

            body = body.Replace("{SlipNo}", paymentVoucher.SlipNo);
            body = body.Replace("{AgentId}", paymentVoucher.AgentId.ToString());
            body = body.Replace("{Fullname}", paymentVoucher.Fullname);
            body = body.Replace("{Nric}", paymentVoucher.Nric);
            body = body.Replace("{BankName}", paymentVoucher.BankName);
            body = body.Replace("{BankAccNo}", paymentVoucher.BankAccNo);
            body = body.Replace("{ReferenceNo}", paymentVoucher.ReferenceNo);
            body = body.Replace("{PaymentAmount}", paymentVoucher.PaymentAmount);
            body = body.Replace("{PaymentDate}", paymentVoucher.PaymentDate);
            body = body.Replace("{PaymentItemsStr}", paymentVoucher.PaymentItemsStr);

            return body;
        }

        private byte[] CreatePdf(string htmlContent)
        {
            try
            {
                using (var ms = new MemoryStream())
                {
                    //Export HTML String as PDF.
                    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, ms);
                    pdfDoc.Open();

                    // HTML
                    HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
                    htmlContext.SetTagFactory(Tags.GetHtmlTagProcessorFactory());

                    // CSS
                    ICSSResolver cssResolver = XMLWorkerHelper.GetInstance().GetDefaultCssResolver(false);
                    cssResolver.AddCssFile(HttpContext.Current.Server.MapPath(Properties.Settings.Default.PaymentVoucherCssFile), true);

                    // Pipelines
                    PdfWriterPipeline pdf = new PdfWriterPipeline(pdfDoc, writer);
                    HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
                    CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);

                    // XML Worker
                    XMLWorker worker = new XMLWorker(css, true);
                    XMLParser xmlParser = new XMLParser(worker);
                    xmlParser.Parse(new MemoryStream(Encoding.UTF8.GetBytes(htmlContent)));

                    pdfDoc.Close();
                    return ms.GetBuffer();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

    }
}