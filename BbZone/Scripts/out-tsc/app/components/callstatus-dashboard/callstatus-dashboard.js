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
var apiController_1 = require("src/app/enums/apiController");
var Chart = require("chart.js");
var pluginDataLabels = require("chartjs-plugin-datalabels");
var CallStatusDashboard = /** @class */ (function () {
    function CallStatusDashboard(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartPlugins = [pluginDataLabels];
        this.barColors = [{ backgroundColor: 'rgba(5, 176, 133, 0.45)' }];
    }
    CallStatusDashboard.prototype.ngOnInit = function () {
        //this.setChartOptions();
        this.loadData();
    };
    CallStatusDashboard.prototype.loadData = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.AdminView.toString() + "/GetCallStatusDashboard").subscribe(function (data) {
            _this.monthlyCallStatus = data.monthlyCallStatus;
            _this.weeklyCompletedCall = data.weeklyCompletedCall;
            _this.drawChart();
            //if (data) {
            //    this.barChartLabels = data.monthlyCallStatus.labels;
            //    this.barChartData = data.monthlyCallStatus.datasets;
            //    this.weeklyCompletedCall = data.weeklyCompletedCall;
            //}
        });
    };
    CallStatusDashboard.prototype.drawChart = function () {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'bar',
            data: {
                labels: this.monthlyCallStatus.labels,
                datasets: this.monthlyCallStatus.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
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
    };
    CallStatusDashboard.prototype.setChartOptions = function () {
        this.barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                    },
                    {
                        display: false,
                        stacked: true,
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
                    align: 'top',
                    font: {
                        size: 12,
                    }
                }
            }
        };
    };
    __decorate([
        core_1.ViewChild('monthlyCallStatus'),
        __metadata("design:type", Object)
    ], CallStatusDashboard.prototype, "chartRef", void 0);
    CallStatusDashboard = __decorate([
        core_1.Component({
            selector: 'callstatus-dashboard',
            templateUrl: 'callstatus-dashboard.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], CallStatusDashboard);
    return CallStatusDashboard;
}());
exports.CallStatusDashboard = CallStatusDashboard;
//# sourceMappingURL=callstatus-dashboard.js.map