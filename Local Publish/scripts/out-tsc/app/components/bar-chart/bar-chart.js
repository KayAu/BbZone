"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var pluginDataLabels = require("chartjs-plugin-datalabels");
var BarChart = /** @class */ (function () {
    function BarChart(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartPlugins = [pluginDataLabels];
        this.barColors = [{ backgroundColor: 'rgba(5, 176, 133, 0.45)' }];
        this.setChartOptions();
    }
    Object.defineProperty(BarChart.prototype, "dataSourceUrl", {
        set: function (url) {
            if (url) {
                this.loadData(url);
            }
        },
        enumerable: true,
        configurable: true
    });
    BarChart.prototype.loadData = function (url) {
        var _this = this;
        this.dataService.getAll(url).subscribe(function (chart) {
            if (chart) {
                _this.barChartLabels = chart.labels;
                _this.barChartData = chart.datasets;
            }
        });
    };
    BarChart.prototype.setChartOptions = function () {
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BarChart.prototype, "dataSourceUrl", null);
    BarChart = __decorate([
        core_1.Component({
            selector: 'bar-chart',
            template: "<div *ngIf=\"barChartData\">\n           <canvas baseChart id=\"barchart\" width=\"600\" height=\"400\"\n                [datasets]=\"barChartData\"\n                [labels]=\"barChartLabels\"\n                [options]=\"barChartOptions\"\n                [plugins]=\"barChartPlugins\"\n                [legend]=\"barChartLegend\"\n                [colors]=\"barColors\"\n                [chartType]=\"barChartType\">\n              </canvas>\n        </div>"
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], BarChart);
    return BarChart;
}());
exports.BarChart = BarChart;
//# sourceMappingURL=bar-chart.js.map