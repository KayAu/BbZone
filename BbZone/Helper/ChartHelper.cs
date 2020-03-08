using BroadbandZone_App.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Web;

namespace BroadbandZone_App.Helper
{
    public class ChartHelper
    {

        private string[] barColor = new string[] {"", "rgba(5, 176, 133, 0.42)", "rgba(5, 176, 133, 0.91)" };

        public ChartData<BarChartDataSet> TranslateStackBarData(DataTable dataTable)
        {
            if (dataTable is null || dataTable.Columns.Count < 2) return null;

            try
            {
                ChartData<BarChartDataSet> chartData = new ChartData<BarChartDataSet>();
                chartData.Labels = dataTable.Rows.OfType<DataRow>().Select(c => c[0].ToString()).ToArray();

                for (int colIdx = 1; colIdx < dataTable.Columns.Count; colIdx++)
                {
                    BarChartDataSet chartDataset = new BarChartDataSet();
                    chartDataset.Label = dataTable.Columns[colIdx].ColumnName;
                    chartDataset.Data = dataTable.Rows.OfType<DataRow>().Select(c => Convert.ToDouble(c[colIdx])).ToArray();
                    chartDataset.BackgroundColor = barColor[colIdx];
                    chartData.Datasets.Add(chartDataset);
                }

                return chartData;
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public ChartData<BarChartDataSet> TranslateBarData(DataTable dataTable)
        {
            if (dataTable is null || dataTable.Columns.Count < 2) return null;

            try
            {
                ChartData<BarChartDataSet> chartData = new ChartData<BarChartDataSet>();
                chartData.Labels = dataTable.Rows.OfType<DataRow>().Select(c => c[0].ToString()).ToArray();

                BarChartDataSet chartDataset = new BarChartDataSet();
                chartDataset.Label = dataTable.Columns[1].ColumnName;
                chartDataset.Data = dataTable.Rows.OfType<DataRow>().Select(c => Convert.ToDouble(c[1])).ToArray();
                chartDataset.BackgroundColor = barColor[1];
                chartData.Datasets.Add(chartDataset);
                return chartData;
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        public ChartData<PieChartDataSet> TranslatePieData(DataTable dataTable)
        {
            if (dataTable is null || dataTable.Columns.Count < 2) return null;

            try
            {
                ChartData<PieChartDataSet> chartData = new ChartData<PieChartDataSet>();
                chartData.Labels = dataTable.Rows.OfType<DataRow>().Select(c => c[0].ToString()).ToArray();

                PieChartDataSet chartDataset = new PieChartDataSet();
                chartDataset.Data = dataTable.Rows.OfType<DataRow>().Select(c => Convert.ToDouble(c[1])).ToArray();
                chartDataset.BackgroundColor = GenerateRandownColors(dataTable.Rows.Count);
                chartData.Datasets.Add(chartDataset);
                
                return chartData;
            }
            catch (Exception ex)
            {
                throw new Exception($"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}:{ex.Message}");
            }
        }

        private string[] GenerateRandownColors(int totalColors)
        {
            List<string> bgColors = new List<string>();
            Random r = new Random();

            for (int idx = 1; idx <= totalColors; idx++)
            {
                bgColors.Add($"rgba({r.Next(0, 256)},{r.Next(0, 256)},{r.Next(0, 256)}, 0.60)");
            }

            return bgColors.ToArray();
        }

    }
}