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
var RecordCounts = /** @class */ (function () {
    function RecordCounts(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.callCompletedByResolutionUrl = apiController_1.ApiController.Report + "/GetCompletedCallByResolution/";
        this.totalCallNotCompletedByAgentUrl = apiController_1.ApiController.Report + "/GetTotalCallNotCompletedByAgent";
        //notCompletedCallByStateUrl = `${ApiController.Report}/GetTotalCallNotCompletedByState`
        this.rptNotCompCallByRes = new report_source_model_1.ReportSource();
        this.rptCallClosureAvg = new report_source_model_1.ReportSource();
        this.rptCallPerRegion = new report_source_model_1.ReportSource();
        this.rptDeviceStatus = new report_source_model_1.ReportSource();
        this.rptCallResolution = new report_source_model_1.ReportSource();
        this.rptCallCompletionByState = new report_source_model_1.ReportSource();
    }
    RecordCounts.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.Report + "/GetRecordCounts").subscribe(function (data) {
            _this.reportData = data;
        });
    };
    RecordCounts.prototype.refreshNotCompletedCallByResolution = function (e) {
        this.rptNotCompCallByRes.url = apiController_1.ApiController.Report + "/GetCompletedCallByResolution/" + this.rptNotCompCallByRes.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptNotCompCallByRes.selectedDate.endDate.format('MM-DD-YYYY');
    };
    RecordCounts.prototype.refreshCallClosureAvg = function (e) {
        this.rptCallClosureAvg.url = apiController_1.ApiController.Report + "/GetCallClosureAvg/" + this.rptCallClosureAvg.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptCallClosureAvg.selectedDate.endDate.format('MM-DD-YYYY');
    };
    RecordCounts.prototype.refreshCallPerRegion = function (e) {
        this.rptCallPerRegion.url = apiController_1.ApiController.Report + "/GetTotalCallPerRegion/" + this.rptCallPerRegion.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptCallPerRegion.selectedDate.endDate.format('MM-DD-YYYY');
    };
    RecordCounts.prototype.refreshDeviceStatus = function (e) {
        var _this = this;
        this.rptDeviceStatus.url = apiController_1.ApiController.Report + "/GetTotalDeviceStatus/" + this.rptDeviceStatus.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptDeviceStatus.selectedDate.endDate.format('MM-DD-YYYY');
        this.dataService.getListData(this.rptDeviceStatus.url).subscribe(function (data) {
            _this.rptDeviceStatus.dataItems = data.displayData;
            _this.rptDeviceStatus.totalRecords = data.totalRecords;
        });
    };
    RecordCounts.prototype.refreshCallResolution = function (e) {
        var _this = this;
        this.rptCallResolution.url = apiController_1.ApiController.Report + "/GetTotalCallResolution/" + this.rptCallResolution.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptCallResolution.selectedDate.endDate.format('MM-DD-YYYY');
        this.dataService.getListData(this.rptCallResolution.url).subscribe(function (data) {
            _this.rptCallResolution.dataItems = data.displayData;
            _this.rptCallResolution.totalRecords = data.totalRecords;
        });
    };
    RecordCounts.prototype.refreshCallCompletionByState = function (e) {
        this.rptCallCompletionByState.url = apiController_1.ApiController.Report + "/GetTotalCallCompletionByState/" + this.rptCallCompletionByState.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.rptCallCompletionByState.selectedDate.endDate.format('MM-DD-YYYY');
    };
    RecordCounts = __decorate([
        core_1.Component({
            selector: 'record-counts',
            templateUrl: './record-counts.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], RecordCounts);
    return RecordCounts;
}());
exports.RecordCounts = RecordCounts;
//# sourceMappingURL=record-counts.js.map