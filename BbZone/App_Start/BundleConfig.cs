using System.Web;
using System.Web.Optimization;

namespace BroadbandZone_App
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/plugins/editabletable.js",
                      "~/Scripts/plugins/jquery.slimscroll.js",
                      "~/Scripts/plugins/jquery.steps.js",
                    //  "~/Scripts/plugins/jquery.metisMenu.js",
                      "~/Scripts/broadbandzone.js"));

            // Angular bundles
            bundles.Add(new ScriptBundle("~/bundles/Angular")
              .Include(
                "~/Scripts/libs/runtime.*",
                "~/Scripts/libs/polyfills.*",
                "~/Scripts/libs/styles.*",
                "~/Scripts/libs/vendor.*",
                "~/Scripts/libs/main.*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/datatables.min.css",
                      "~/Content/styles.css"));
        }
    }
}
