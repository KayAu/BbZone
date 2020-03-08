"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var listEvent_1 = require("src/app/interfaces/listEvent");
var AssociateActivity = /** @class */ (function (_super) {
    __extends(AssociateActivity, _super);
    function AssociateActivity(loaderService, dataService) {
        var _this = _super.call(this, loaderService, dataService, "ImplantDate") || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.adminView = false;
        return _this;
    }
    AssociateActivity.prototype.ngOnInit = function () {
        this.loadData();
    };
    AssociateActivity.prototype.loadData = function () {
        var _this = this;
        var urlPath = this.adminView ? apiController_1.ApiController.AdminView.toString() + "/GetActivitiesSummary" : apiController_1.ApiController.CallAgent.toString() + "/GetAssociateActivities";
        this.dataService.getListData("" + urlPath).subscribe(function (data) {
            _this.activities = data;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AssociateActivity.prototype, "adminView", void 0);
    AssociateActivity = __decorate([
        core_1.Component({
            selector: 'associate-activity',
            templateUrl: './associate-activity.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], AssociateActivity);
    return AssociateActivity;
}(listEvent_1.ListEvent));
exports.AssociateActivity = AssociateActivity;
//# sourceMappingURL=associate-activity.js.map