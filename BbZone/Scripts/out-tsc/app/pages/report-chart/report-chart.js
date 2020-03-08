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
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var report_source_model_1 = require("src/app/model/report-source.model");
var ReportChart = /** @class */ (function () {
    function ReportChart(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.rptCallInitiatedByDate = new report_source_model_1.ReportSource();
        this.rptGetTotalClosedByDate = new report_source_model_1.ReportSource();
        this.rptGetTotalTouchPointAvg = new report_source_model_1.ReportSource();
        this.rptGetTotalDaysToComplete = new report_source_model_1.ReportSource();
        this.rptGetTotalCallCompletedByRes = new report_source_model_1.ReportSource();
    }
    ReportChart.prototype.refreshCallInitiatedByDate = function (e) {
        this.rptCallInitiatedByDate.url = apiController_1.ApiController.Report + "/GetCallInitiatedByDate/" + this.rptCallInitiatedByDate.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptCallInitiatedByDate.selectedDate.endDate.format('MM-DD-YYYY');
    };
    ReportChart.prototype.refreshTotalClosedByDate = function (e) {
        this.rptGetTotalClosedByDate.url = apiController_1.ApiController.Report + "/GetTotalClosedByDate/" + this.rptGetTotalClosedByDate.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptGetTotalClosedByDate.selectedDate.endDate.format('MM-DD-YYYY');
    };
    ReportChart.prototype.refreshTotalTouchPointAvg = function (e) {
        this.rptGetTotalTouchPointAvg.url = apiController_1.ApiController.Report + "/GetTotalTouchPointAvg/" + this.rptGetTotalTouchPointAvg.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptGetTotalTouchPointAvg.selectedDate.endDate.format('MM-DD-YYYY');
    };
    ReportChart.prototype.refreshTotalDaysToComplete = function (e) {
        this.rptGetTotalDaysToComplete.url = apiController_1.ApiController.Report + "/GetTotalDaysToComplete/" + this.rptGetTotalDaysToComplete.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptGetTotalDaysToComplete.selectedDate.endDate.format('MM-DD-YYYY');
    };
    ReportChart.prototype.refreshTotalCallCompletedByRes = function (e) {
        this.rptGetTotalCallCompletedByRes.url = apiController_1.ApiController.Report + "/GetTotalCallCompletedByResolution/" + this.rptGetTotalCallCompletedByRes.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptGetTotalCallCompletedByRes.selectedDate.endDate.format('MM-DD-YYYY');
    };
    ReportChart = __decorate([
        core_1.Component({
            selector: 'report-chart',
            templateUrl: './report-chart.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], ReportChart);
    return ReportChart;
}());
exports.ReportChart = ReportChart;
//# sourceMappingURL=report-chart.js.map