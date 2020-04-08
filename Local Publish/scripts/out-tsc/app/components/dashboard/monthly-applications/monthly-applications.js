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
var MonthlyApplicationDashboard = /** @class */ (function () {
    function MonthlyApplicationDashboard(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.topSellers = [];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartPlugins = [pluginDataLabels];
        this.barColors = [{ backgroundColor: 'rgba(5, 176, 133, 0.45)' }];
    }
    MonthlyApplicationDashboard.prototype.ngOnInit = function () {
        //this.setChartOptions();
        this.loadData();
    };
    MonthlyApplicationDashboard.prototype.loadData = function () {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.Dashboard.toString() + "/GetMonthlyApplications").subscribe(function (data) {
            _this.monthlyApplications = data.monthlyApplications;
            _this.topSellers = data.topSellers;
            _this.totalApplications = data.totalApplications;
            _this.totalCommissions = data.totalCommission;
            _this.drawChart();
        });
    };
    MonthlyApplicationDashboard.prototype.drawChart = function () {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'bar',
            data: {
                labels: this.monthlyApplications.labels,
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
    };
    __decorate([
        core_1.ViewChild('monthlyApplications'),
        __metadata("design:type", Object)
    ], MonthlyApplicationDashboard.prototype, "chartRef", void 0);
    MonthlyApplicationDashboard = __decorate([
        core_1.Component({
            selector: 'monthly-applications',
            templateUrl: 'monthly-applications.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], MonthlyApplicationDashboard);
    return MonthlyApplicationDashboard;
}());
exports.MonthlyApplicationDashboard = MonthlyApplicationDashboard;
//# sourceMappingURL=monthly-applications.js.map