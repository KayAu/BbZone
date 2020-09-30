using System;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace BroadbandZone_App.Helper
{
    public static class DataHelper
    {
        public static string StripADDomain(this string loginName)
        {
            return loginName.ToString().Substring(loginName.ToString().LastIndexOf("\\") + 1);
        }

        public static string SplitCamelCase(this string input)
        {
            return System.Text.RegularExpressions.Regex.Replace(input, "([A-Z])", " $1", System.Text.RegularExpressions.RegexOptions.Compiled).Trim();
        }

        public static string StripBracketedInfo(this string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.IndexOf("(") >= 1 && value.IndexOf(")") > 0)
                {
                    return value.Substring(0, value.IndexOf("(")).Trim();
                }
            }

            return string.Empty;
        }

        public static string NullToString(this object Value)
        {
            return Value == null ? "" : Value.ToString();
        }

        public static Stream Base64ToImageStream(string base64String)
        {
            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            return ms;
        }

        public static bool IsBase64(this string base64String)
        {
            if (base64String == null || base64String.Length == 0 || base64String.Length % 4 != 0
               || base64String.Contains(" ") || base64String.Contains("\t") || base64String.Contains("\r") || base64String.Contains("\n"))
                return false;

            try
            {
                Convert.FromBase64String(base64String);
                return true;
            }
            catch (Exception ex)
            {
               // ExceptionUtility.LogError(ex, "DataHelper.IsBase64");
                return false;
            }
        }

        public static DateTime ToServerDate(this DateTime thisDate )
        {
            TimeZoneInfo infotime = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
            var convertedDate = TimeZoneInfo.ConvertTimeFromUtc(thisDate.ToUniversalTime(), infotime);
            return convertedDate;
        }

        public static DataTable ToDataTable<T>(this ObjectResult<T> items)
        {

            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items.ToList<T>())
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        public static byte[] SHA1HashValue(string s)
        {
            Encoding Encoding1252 = Encoding.GetEncoding(1252);

            byte[] bytes = Encoding1252.GetBytes(s);

            var sha1 = SHA512.Create();
            byte[] hashBytes = sha1.ComputeHash(bytes);

            return hashBytes;
        }
    }
}
