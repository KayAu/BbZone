
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
            DataTable dataTable = new DataTable();
   
            try
            {
                // Get Application object.
                Microsoft.Office.Interop.Excel.Application excel = new Microsoft.Office.Interop.Excel.Application();
                // Creation a new Workbook
                Microsoft.Office.Interop.Excel.Workbook excelworkBook = excel.Workbooks.Open(HttpContext.Current.Server.MapPath(filePath));
                // Work sheet
                Microsoft.Office.Interop.Excel.Worksheet excelSheet = (Microsoft.Office.Interop.Excel.Worksheet)excelworkBook.Worksheets.Item[WorksheetName];
                Microsoft.Office.Interop.Excel.Range range = excelSheet.UsedRange;

                //create the header of table
                for (int col = 1; col <= range.Columns.Count; col++)
                {
                    dataTable.Columns.Add(Convert.ToString(range.Cells[HeaderRow, col].Value2), typeof(string));
                }

                //filling the table from  excel file                
                for (int wsRowNo = HeaderRow + 1; wsRowNo <= range.Rows.Count; wsRowNo++)
                {
                    DataRow dr = dataTable.NewRow();
                    for (int wsColNo = 1; wsColNo <= range.Columns.Count; wsColNo++)
                    {
                        dr[wsColNo - 1] = Convert.ToString(range.Cells[wsRowNo, wsColNo].Value2);
                    }
                    dataTable.Rows.InsertAt(dr, dataTable.Rows.Count + 1);
                }
                
                excelworkBook.Close();
                excel.Quit();
                return dataTable;
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