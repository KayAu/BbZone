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
//import { ButtonOption } from 'src/app/model/button-option';
var report_source_model_1 = require("src/app/model/report-source.model");
var moment = require("moment");
var AllAssociateActivity = /** @class */ (function () {
    //viewOptions: ButtonOption[] = [{ label: 'Last Week', css: 'btn-success', selected: false },
    //                               { label: 'This Week', css: 'btn-primary', selected: false },
    //                               { label: 'This Month', css: 'btn-warning', selected: true }];
    function AllAssociateActivity(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.selectedDate = new report_source_model_1.DateRange();
        this.activities = [];
    }
    AllAssociateActivity.prototype.ngOnInit = function () {
        this.selectedDate.startDate = moment().subtract(12, 'months');
        this.loadData();
    };
    AllAssociateActivity.prototype.loadData = function () {
        var _this = this;
        //this.clearSelection();        
        //this.viewOptions[viewOptionIdx].selected = true;
        var dateFrom = this.selectedDate.startDate.format('MM-DD-YYYY');
        var dateTo = this.selectedDate.endDate.format('MM-DD-YYYY');
        this.dataService.getListData(apiController_1.ApiController.AdminView + "/GetPeriodicCallStatus/" + dateFrom + "/" + dateTo).subscribe(function (data) {
            _this.activities = data;
        });
    };
    AllAssociateActivity.prototype.trackByName = function (index, item) {
        return item.fullname;
    };
    AllAssociateActivity = __decorate([
        core_1.Component({
            selector: 'all-associate-activity',
            templateUrl: './all-associate-activity.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], AllAssociateActivity);
    return AllAssociateActivity;
}());
exports.AllAssociateActivity = AllAssociateActivity;
//# sourceMappingURL=all-associate-activity.js.map