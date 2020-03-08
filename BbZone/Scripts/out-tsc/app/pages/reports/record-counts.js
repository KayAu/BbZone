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
var moment = require("moment");
var RecordCounts = /** @class */ (function () {
    function RecordCounts(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.reportData = {};
        this.notCompCallByResDate = { startDate: moment, endDate: moment };
        this.callClosureAvgDate = { startDate: moment, endDate: moment };
        this.callCompletedByResolutionUrl = apiController_1.ApiController.Report + "/GetCompletedCallByResolution/";
        this.totalCallNotCompletedByAgentUrl = apiController_1.ApiController.Report + "/GetTotalCallNotCompletedByAgent";
        this.completedCallByResolutionUrl = apiController_1.ApiController.Report + "/GetCompletedCallByResolution";
        this.callClosureAvgUrl = apiController_1.ApiController.Report + "/GetCallClosureAvg";
        this.notCompCallByResDate.startDate = moment().subtract(30, 'days');
        this.notCompCallByResDate.endDate = moment();
        this.callClosureAvgDate.startDate = moment().subtract(30, 'days');
        this.callClosureAvgDate.endDate = moment();
    }
    RecordCounts.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.Report + "/GetRecordCounts").subscribe(function (data) {
            _this.reportData = data;
        });
    };
    RecordCounts.prototype.refreshNotCompletedCallByResolution = function (e) {
        this.callCompletedByResolutionUrl = apiController_1.ApiController.Report + "/GetCompletedCallByResolution/" + this.notCompCallByResDate.startDate.format('MM-DD-YYYY') + "/" + this.notCompCallByResDate.endDate.format('MM-DD-YYYY');
    };
    RecordCounts.prototype.refreshCallClosureAvg = function (e) {
        this.callClosureAvgUrl = apiController_1.ApiController.Report + "/GetCallClosureAvg/" + this.callClosureAvgDate.startDate.format('MM-DD-YYYY') + "/" + this.callClosureAvgDate.endDate.format('MM-DD-YYYY');
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