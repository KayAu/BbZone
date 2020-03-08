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
var call_assignment_model_1 = require("src/app/model/call-assignment.model");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var apiController_1 = require("src/app/enums/apiController");
var ngx_toastr_1 = require("ngx-toastr");
var TypeOfCall_1 = require("src/app/enums/TypeOfCall");
var grid_data_1 = require("src/app/model/grid-data");
var current_month_call_1 = require("src/app/components/current-month-call/current-month-call");
var NewAssignment = /** @class */ (function () {
    function NewAssignment(loaderService, dataService, formSubmission, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formSubmission = formSubmission;
        this.toastr = toastr;
        this.assigmentMode = TypeOfCall_1.AssigmentMode.NewTask;
        this.associates = [];
        this.isUpdating = false;
        this.dataFieldMapper = grid_data_1.NewAssignedPatient.gridData.map(function (o) { return new grid_data_1.GridDataMapping(o.headerName, o.fieldname, o.headerCss); });
    }
    NewAssignment.prototype.ngOnInit = function () {
        this.formReset();
        this.loadAssociates();
    };
    NewAssignment.prototype.createTask = function (form) {
        var _this = this;
        this.formSubmission.notify(form);
        if (!form.valid)
            return;
        this.isUpdating = true;
        this.dataService.add(apiController_1.ApiController.CallAssignment, this.callAssignment).subscribe(function (newData) {
            _this.formReset();
            _this.toastr.success('The patient call task is successfully created in the system', 'Patient Call Task Created', { positionClass: 'toast-bottom-full-width' });
            _this.associateActivities.loadData();
        });
    };
    NewAssignment.prototype.formReset = function () {
        var today = new Date();
        this.isUpdating = false;
        this.callAssignment = new call_assignment_model_1.CallAssignmentModel(TypeOfCall_1.AssigmentMode.NewTask, today, '', []);
    };
    NewAssignment.prototype.loadAssociates = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.CallAssignment + "/GetCallAgents").subscribe(function (data) {
            _this.associates = data;
        });
    };
    __decorate([
        core_1.ViewChild(current_month_call_1.CurrentMonthCall),
        __metadata("design:type", current_month_call_1.CurrentMonthCall)
    ], NewAssignment.prototype, "associateActivities", void 0);
    NewAssignment = __decorate([
        core_1.Component({
            selector: 'new-assignment',
            templateUrl: './new-assignment.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, ngx_toastr_1.ToastrService])
    ], NewAssignment);
    return NewAssignment;
}());
exports.NewAssignment = NewAssignment;
//# sourceMappingURL=new-assignment.js.map