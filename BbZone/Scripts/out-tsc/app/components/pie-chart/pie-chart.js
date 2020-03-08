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
var PieChart = /** @class */ (function () {
    function PieChart(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.chartType = 'doughnut';
        this.chartLegend = true;
        this.chartPlugins = [pluginDataLabels];
        this.setChartOptions();
    }
    Object.defineProperty(PieChart.prototype, "dataSourceUrl", {
        set: function (url) {
            if (url) {
                this.loadData(url);
            }
        },
        enumerable: true,
        configurable: true
    });
    PieChart.prototype.loadData = function (url) {
        var _this = this;
        this.dataService.getListData(url).subscribe(function (chart) {
            if (chart) {
                _this.chartLabels = chart.labels;
                _this.chartData = chart.datasets;
            }
        });
    };
    PieChart.prototype.setChartOptions = function () {
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'bottom'
            },
            plugins: {
                datalabels: {
                    font: {
                        size: 13,
                        weight: 'bold',
                    }
                }
            },
        };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PieChart.prototype, "dataSourceUrl", null);
    PieChart = __decorate([
        core_1.Component({
            selector: 'pie-chart',
            //template: `<div><canvas id="piechart" width="600" height="400" #piechart>{{chartObject}}</canvas></div>`,
            template: "<div *ngIf=\"chartData\">\n           <canvas baseChart id=\"piechart\" width=\"600\" height=\"400\"\n                [datasets]=\"chartData\"\n                [labels]=\"chartLabels\"\n                [options]=\"chartOptions\"\n                [plugins]=\"chartPlugins\"\n                [legend]=\"chartLegend\"\n                [chartType]=\"chartType\">\n              </canvas>\n        </div>"
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], PieChart);
    return PieChart;
}());
exports.PieChart = PieChart;
//# sourceMappingURL=pie-chart.js.map