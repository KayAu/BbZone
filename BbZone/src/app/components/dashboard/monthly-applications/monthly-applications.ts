import { Component, Input, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';
import Chart = require('chart.js');
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
    selector: 'monthly-applications',
    templateUrl: 'monthly-applications.html'
})

export class MonthlyApplicationDashboard {

    @ViewChild('monthlyApplications') private chartRef;  
    monthlyApplications: any;
    topSellers: any[] = [];
    barOptions: any;
    chart: any; 
    totalApplications: any; 
    totalCommissions: any; 
    public barChartType: Chart.ChartType = 'bar';
    public barChartOptions: Chart.ChartOptions;
    public barChartLegend = false;
    public barChartPlugins = [pluginDataLabels];
    public barChartLabels: Label[];
    public barChartData: Chart.ChartDataSets[];
    public barColors = [{ backgroundColor: 'rgba(5, 176, 133, 0.45)' }];

    constructor(public loaderService: LoaderService, public dataService: DataService) { }

    ngOnInit() {
        //this.setChartOptions();
        this.loadData();
    }

    loadData() {
        this.dataService.get(`${ApiController.Dashboard.toString()}/GetMonthlyApplications`).subscribe(data => {
            this.monthlyApplications = data.monthlyApplications;
            this.topSellers = data.topSellers;
            this.totalApplications = data.totalApplications;
            this.totalCommissions = data.totalCommission;
            this.drawChart();
        });
    }

    private drawChart() {       
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'bar',
            data: {
                labels: this.monthlyApplications.labels, // your labels array
                datasets: this.monthlyApplications.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'bottom'
                },
                scales: {
                    xAxes: [
                        {
                            stacked: false,                           
                        },
                        {
                            display: false,
                            stacked: false,
                            ticks: { padding: 0 }
                        }
                    ],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                        },
                        gridLines: {
                            display: true,
                            color: 'rgba(97, 106, 120, 0.07)',
                            tickMarkLength: 10
                        },
                    }]
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        offset: 1,
                        clamp: true,
                        font: {
                            size: 11,
                        }
                    }
                }
            }
        });
    }

}
