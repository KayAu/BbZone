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
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var report_source_model_1 = require("src/app/model/report-source.model");
var http_1 = require("@angular/common/http");
var TypeOfCall_1 = require("src/app/enums/TypeOfCall");
var DownloadRecord = /** @class */ (function () {
    function DownloadRecord(loaderService, http) {
        this.loaderService = loaderService;
        this.http = http;
        this.reportType = TypeOfCall_1.FileDownloadType.AssignedDate;
        this.selectedDate = new report_source_model_1.DateRange();
        this.downloadType = TypeOfCall_1.FileDownloadType;
        this.downloadAllRecUrl = "/api/" + apiController_1.ApiController.PatientFile + "/DownloadAllRecords";
    }
    DownloadRecord.prototype.download = function () {
        this.downloadUrl = "/api/" + apiController_1.ApiController.PatientFile + "/Download/" + this.selectedDate.startDate.format('MM-DD-YYYY') + "/" + this.selectedDate.endDate.format('MM-DD-YYYY') + "/" + this.reportType;
    };
    DownloadRecord = __decorate([
        core_1.Component({
            selector: 'download-record',
            templateUrl: './download-record.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, http_1.HttpClient])
    ], DownloadRecord);
    return DownloadRecord;
}());
exports.DownloadRecord = DownloadRecord;
//# sourceMappingURL=download-record.js.map