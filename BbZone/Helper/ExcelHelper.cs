
using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace BroadbandZone_App.Helper
{
    public static class ExcelHelper
    {
        const string WorksheetName = "Incentives";
        const int HeaderRow = 1;

        public static DataTable ExtractToDatatable(string filePath)
        {
            DataTable dt = new DataTable();
   
            try
            {
                using (XLWorkbook workBook = new XLWorkbook(HttpContext.Current.Server.MapPath(filePath)))
                {
                    //Read the first Sheet from Excel file.
                    IXLWorksheet workSheet = workBook.Worksheet(1);

                    foreach (IXLCell cell in workSheet.Row(HeaderRow).Cells())
                    {
                        dt.Columns.Add(cell.Value.ToString());
                    }

                    //Loop through the Worksheet rows.
                    foreach (IXLRow row in workSheet.Rows())
                    {
                        DataRow dr = dt.NewRow();
                        for (int wsColNo = 1; wsColNo <= row.CellsUsed().Count() - 1; wsColNo++)
                        {
                            dr[wsColNo-1] = Convert.ToString(row.Cell(wsColNo).Value);
                        }
                        dt.Rows.InsertAt(dr, dt.Rows.Count + 1);
                    }
                }
      
                dt.Rows.RemoveAt(0);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static HttpResponseMessage ReadDataToExcel<T>(List<T> results, string filename) where T : class
        {
            using (XLWorkbook wb = new XLWorkbook())
            {
                DataTable dt = results.ToDataTable();
                wb.Worksheets.Add(dt, filename);
                MemoryStream stream = new MemoryStream();
                wb.SaveAs(stream);

                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(stream.ToArray());
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = $"{filename}_{DateTime.Now.ToShortDateString()}.xlsx";
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                return result;
            }
        }
    }
}