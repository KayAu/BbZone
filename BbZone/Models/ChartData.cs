using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Models
{
    public class ChartData<T>
    {
        public string[] Labels { get; set; }
        public List<T> Datasets = new List<T>();
    }

    //public class StackedBarChartDataSet
    //{
    //    public string Label { get; set; }
    //    public int[] Data { get; set; }
    //    public string BackgroundColor { get; set; }
    //}

    public class PieChartDataSet
    {
        public string Label { get; set; }
        public Double[] Data { get; set; }
        public string[] BackgroundColor { get; set; }
    }

    public class BarChartDataSet
    {
        public string Label { get; set; }
        public Double[] Data { get; set; }
        public string BackgroundColor { get; set; }
    }
}