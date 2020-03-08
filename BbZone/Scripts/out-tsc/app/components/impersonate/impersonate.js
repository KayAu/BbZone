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
var ImpersonateUser = /** @class */ (function () {
    function ImpersonateUser(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
    }
    ImpersonateUser.prototype.ngOnInit = function () {
        this.loadData();
    };
    ImpersonateUser.prototype.loadData = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.CallAgent + "/GetCurrentMonthCall").subscribe(function (data) {
            _this.activities = data;
        });
    };
    ImpersonateUser.prototype.trackByName = function (index, item) {
        return item.fullname;
    };
    ImpersonateUser = __decorate([
        core_1.Component({
            selector: 'impersonate-user',
            template: "<div class=\"box\">\n                <div class=\"box-header with-border\">\n                    <h5 class=\"box-title\">Associates Call Activity</h5>\n                    <span class=\"ibox-tools  badge bg-purple\">Today</span>\n                </div>\n                <div class=\"box-body pad0A\">\n                    <div class=\"media-list media-list-hover media-list-divided\">\n                        <div class=\"o-zoom bb-1 border-light pad15A\" *ngFor=\"let item of activities; trackBy:trackByName\">\n                            <div class=\"w-p100 float-left mrg10B\">\n                                <div class=\"mini-avatar mrg5R float-left bg-pink\"><i class=\"mdi mdi-account-outline\"></i></div>\n                                <strong>{{item.fullname}}</strong>\n                                <small class=\"text-success float-right\" *ngIf=\"item.newAssigned>0\"><i class=\"mdi mdi-message-plus\"></i> {{item.newAssigned}} newly assigned</small>\n                            </div>\n                            <div class=\"w-p100 float-left\">\n                                <div class=\"col-md-3 pad0L\">\n                                    <small class=\"stats-label\">Assigned</small>\n                                    <h4 class=\"mrg0B mrg5T\">{{item.totalTaskAssigned}}</h4>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <small class=\"stats-label\">Initial</small>\n                                    <h4 class=\"mrg0B mrg5T\">{{item.totalInitCall}}</h4>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <small class=\"stats-label\">Follow Up</small>\n                                    <h4 class=\"mrg0B mrg5T\">{{item.totalFollowUpCall}}</h4>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <small class=\"stats-label\">Remaining</small>\n                                    <h4 class=\"mrg0B mrg5T\">{{item.totalNotStarted}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>"
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], ImpersonateUser);
    return ImpersonateUser;
}());
exports.ImpersonateUser = ImpersonateUser;
//# sourceMappingURL=impersonate.js.map