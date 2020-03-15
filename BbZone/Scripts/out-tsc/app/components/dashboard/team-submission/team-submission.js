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
var TeamSubmission = /** @class */ (function () {
    function TeamSubmission(dataService) {
        this.dataService = dataService;
        this.dashboardData = [];
        this.loadData();
    }
    TeamSubmission.prototype.loadData = function () {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.Dashboard + "/GetMyTeamSubmissions").subscribe(function (data) {
            _this.dashboardData = data.displayData;
            _this.totalAgents = data.totalAgents;
            _this.getTotal();
        });
    };
    TeamSubmission.prototype.getTotal = function () {
        this.totalCompleted = this.dashboardData.map(function (d) { return d.totalCompleted; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalInProgress = this.dashboardData.map(function (d) { return d.totalInProgress; }).reduce(function (a, b) { return a + b; }, 0);
    };
    TeamSubmission = __decorate([
        core_1.Component({
            selector: 'team-submission',
            templateUrl: './team-submission.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], TeamSubmission);
    return TeamSubmission;
}());
exports.TeamSubmission = TeamSubmission;
//# sourceMappingURL=team-submission.js.map