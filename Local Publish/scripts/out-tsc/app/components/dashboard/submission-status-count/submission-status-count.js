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
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("src/app/enums/apiController");
var SubmissionStatusCount = /** @class */ (function () {
    function SubmissionStatusCount(dataService) {
        this.dataService = dataService;
        this.yearOptions = [];
        this.dashboardData = [];
        this.loadYearOptions();
        this.loadData();
    }
    SubmissionStatusCount.prototype.loadData = function () {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.Dashboard + "/GetSubmissionStatusCount", this.selectedYear).subscribe(function (data) {
            _this.dashboardData = data;
        });
    };
    SubmissionStatusCount.prototype.loadYearOptions = function () {
        var currentYear = (new Date()).getFullYear();
        for (var year = 2019; year <= currentYear; year++) {
            this.yearOptions.push(year);
        }
        this.selectedYear = currentYear;
    };
    SubmissionStatusCount.prototype.onYearSelected = function (year) {
        this.selectedYear = year;
        this.loadData();
    };
    SubmissionStatusCount = __decorate([
        core_1.Component({
            selector: 'submission-status-count',
            templateUrl: './submission-status-count.html',
            styleUrls: ['./submission-status-count.css']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], SubmissionStatusCount);
    return SubmissionStatusCount;
}());
exports.SubmissionStatusCount = SubmissionStatusCount;
//# sourceMappingURL=submission-status-count.js.map