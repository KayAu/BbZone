using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Data.Entity.Core.Objects;
using System.Data.Entity;
using System.Web;
using System.Diagnostics;
using BroadbandZone_App.Models;
using BroadbandZone_Data;


namespace BroadbandZone_App.Helper
{
    public static class ModelHelper
    {
        public static void SetDateAndAuthor<T>(this T model,  params string[] propertyNames)
        {
            try
            {
                AuthenticatedUser currentUser = UserIdentityHelper.GetLoginAccountFromCookie();
                Type modelType = model.GetType();

                foreach (string propName in propertyNames)
                {
                    PropertyInfo propInfo = modelType.GetProperty(propName);
                    if (propInfo == null) continue;

                    if (propInfo.PropertyType.FullName.IndexOf((typeof(DateTime)).FullName, StringComparison.OrdinalIgnoreCase) >= 0)
                    {
                        propInfo.SetValue(model, DateTime.Now);
                    }
                    else if (propInfo.PropertyType == typeof(string))
                    {
                        propInfo.SetValue(model, currentUser.Fullname);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"ModelHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }
        }

        public static Gridview<T> GetListdata<T>(Func<int?, int?, string, bool?, string, bool?, ObjectParameter, ObjectResult<T>> callDbMethod, int currentPage = 1, int pageSize = Constants.DefaultPageSize, string sortColumn = "", bool sortInAsc = false, string searchKeyword = "", bool? activeRecord = null)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    ObjectParameter totalRecord = new ObjectParameter("oTotalRecord", typeof(int));
                    var results = callDbMethod(currentPage, pageSize, sortColumn, sortInAsc, searchKeyword, activeRecord, totalRecord).ToList();
                    return new Gridview<T>()
                    {
                        DisplayData = results,
                        TotalRecords = Convert.ToInt32(totalRecord.Value)
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"ModelHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }
        }

        public static void CopyPropertiesTo<FR, TO>(this FR source, out TO dest)
        {
            try { 
                var sourceProps = typeof(FR).GetProperties().Where(x => x.CanRead).ToList();
                var destProps = typeof(TO).GetProperties()
                        .Where(x => x.CanWrite)
                        .ToList();
                dest = (TO)Activator.CreateInstance(typeof(TO));

                foreach (var sourceProp in sourceProps)
                {
                    if (destProps.Any(x => x.Name == sourceProp.Name))
                    {
                        var p = destProps.First(x => x.Name == sourceProp.Name);
                        //if (p.CanWrite &&
                        //    sourceProp.PropertyType.FullName.IndexOf(p.PropertyType.FullName, StringComparison.OrdinalIgnoreCase) >= 0)
                        //{ // check if the property can be set or no.
                        //    p.SetValue(dest, sourceProp.GetValue(source, null), null);
                        //}
                        if (p.CanWrite)
                        {
                            p.SetValue(dest, ChangeType(sourceProp.GetValue(source, null), p.PropertyType), null);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"ModelHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }
        }



        public static T ChangeType<T>(object value)
        {
            var t = typeof(T);

            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return default(T);
                }

                t = Nullable.GetUnderlyingType(t);
            }

            return (T)Convert.ChangeType(value, t);
        }


        public static object ChangeType(object value, Type conversion)
        {
            var t = conversion;

            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return null;
                }

                t = Nullable.GetUnderlyingType(t);
            }

            return Convert.ChangeType(value, t);
        }


        public static void AddEditItemsToDb<T>(this ICollection<T> listItems, string keyField) where T : class
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    foreach (T item in listItems)
                    {
                        var value = item.GetType().GetProperty(keyField).GetValue(item, null);

                        if (value == null) continue;

                        if (int.TryParse(value.ToString(), out int id))
                        {
                            if (id == 0)
                            {
                                item.SetDateAndAuthor(HttpContext.Current.User.Identity.Name, "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn");
                                db.Entry(item).State = EntityState.Added; 
                            }
                            else
                            {
                                item.SetDateAndAuthor(HttpContext.Current.User.Identity.Name, "ModifiedBy", "ModifiedOn");
                                db.Entry(item).State = EntityState.Modified;
                            }
                        }
                    }
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"ModelHelper.{(new StackTrace()).GetFrame(0).GetMethod().Name} : {ex.Message}");
            }

        }
    }
}
