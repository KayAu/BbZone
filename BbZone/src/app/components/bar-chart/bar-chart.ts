import { Component, Input, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import Chart = require('chart.js');
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
    selector: 'bar-chart',
    template: `<div *ngIf="barChartData">
           <canvas baseChart id="barchart" width="600" height="400"
                [datasets]="barChartData"
                [labels]="barChartLabels"
                [options]="barChartOptions"
                [plugins]="barChartPlugins"
                [legend]="barChartLegend"
                [colors]="barColors"
                [chartType]="barChartType">
              </canvas>
        </div>`
})

export class BarChart {
    public barChartType: Chart.ChartType = 'bar';
    public barChartOptions: Chart.ChartOptions;    
    public barChartLegend = false;
    public barChartPlugins = [pluginDataLabels];
    public barChartLabels: Label[];
    public barChartData: Chart.ChartDataSets[];
    public barColors = [{ backgroundColor: 'rgba(5, 176, 133, 0.45)' }];

    @Input()
    set dataSourceUrl(url: string) {
        if (url) {
            this.loadData(url);
        }
    }

    constructor(public loaderService: LoaderService, public dataService: DataService) {
        this.setChartOptions();
    }

    private loadData(url: string) {
        this.dataService.getAll(url).subscribe(chart => {
            if (chart) {
                this.barChartLabels = chart.labels;
                this.barChartData = chart.datasets;
            }
        });
    }

    private setChartOptions() {

        this.barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                       // barThickness: 40,
                        gridLines: { display: false }
                    }
                ],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 500
                    },
                    gridLines: {
                        display: true,
                        color: 'rgba(97, 106, 120, 0.1)',
                        //tickMarkLength: 10
                    },
                }]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    font: {
                        size: 13,
                    }
                }
            }
        };
    }
}
