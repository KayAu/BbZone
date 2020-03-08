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
var forms_1 = require("@angular/forms");
var call_assignment_model_1 = require("src/app/model/call-assignment.model");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var apiController_1 = require("src/app/enums/apiController");
var ngx_toastr_1 = require("ngx-toastr");
var associate_activity_1 = require("src/app/components/associate-activity/associate-activity");
var CallAssignment = /** @class */ (function () {
    function CallAssignment(loaderService, dataService, formSubmission, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formSubmission = formSubmission;
        this.toastr = toastr;
        this.associates = [];
        this.formReset();
        this.loadAssociates();
    }
    CallAssignment.prototype.createTask = function () {
        var _this = this;
        this.formSubmission.notify(this.form);
        if (!this.form.valid)
            return;
        this.dataService.add(apiController_1.ApiController.CallAssignment, this.callAssignment).subscribe(function (newData) {
            _this.callAssignment = newData;
            _this.toastr.success('The patient call task is successfully created in the system', 'Patient Call Task Created', { positionClass: 'toast-bottom-full-width' });
            _this.formReset();
            _this.associateActivities.loadData();
        });
    };
    CallAssignment.prototype.formReset = function () {
        var today = new Date();
        this.callAssignment = new call_assignment_model_1.CallAssignmentModel(0, today, '', []);
    };
    CallAssignment.prototype.loadAssociates = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.CallAssignment + "/GetCallAgents").subscribe(function (data) {
            _this.associates = data;
        });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", Object)
    ], CallAssignment.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild(associate_activity_1.AssociateActivity),
        __metadata("design:type", associate_activity_1.AssociateActivity)
    ], CallAssignment.prototype, "associateActivities", void 0);
    CallAssignment = __decorate([
        core_1.Component({
            selector: 'call-assignment',
            templateUrl: './call-assignment.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, ngx_toastr_1.ToastrService])
    ], CallAssignment);
    return CallAssignment;
}());
exports.CallAssignment = CallAssignment;
//# sourceMappingURL=call-assignment.js.map