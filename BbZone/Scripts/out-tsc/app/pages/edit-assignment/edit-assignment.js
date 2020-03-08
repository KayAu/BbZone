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
var TypeOfCall_1 = require("src/app/enums/TypeOfCall");
var grid_data_1 = require("src/app/model/grid-data");
var current_month_call_1 = require("src/app/components/current-month-call/current-month-call");
var patient_select_1 = require("src/app/components/patient-select/patient-select");
var EditAssignment = /** @class */ (function () {
    function EditAssignment(loaderService, dataService, formSubmission, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formSubmission = formSubmission;
        this.toastr = toastr;
        this.isUpdating = false;
        this.actionType = TypeOfCall_1.AssigmentMode.EditTask;
        this.associates = [];
        this.reassignAssociates = [];
        this.editSelectedPatient = true;
        this.formReset();
        this.loadAssociates();
        this.dataFieldMapper = grid_data_1.UpdateAssignedPatient.gridData.map(function (o) { return new grid_data_1.GridDataMapping(o.headerName, o.fieldname, o.headerCss, o.displayAsBadge); });
    }
    EditAssignment.prototype.ngOnInit = function () {
        if (this.assignedPatients) {
            this.assignedPatients.controllerName = apiController_1.ApiController.CallAgent + "/GetAssociatePatients";
            this.assignedPatients.sortBy.header = 'TaskDate';
        }
    };
    EditAssignment.prototype.updateTask = function () {
        var _this = this;
        this.formSubmission.notify(this.form);
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        this.dataService.update(apiController_1.ApiController.CallAssignment, 1, this.callAssignment).subscribe(function (newData) {
            _this.formReset();
            _this.toastr.success('The patient call task is successfully updated in the system', 'Patient Call Task Updated', { positionClass: 'toast-bottom-full-width' });
            _this.associateActivities.loadData();
        });
    };
    EditAssignment.prototype.setActionType = function (name) {
        this.actionType = name === "EditTask" ? TypeOfCall_1.AssigmentMode.EditTask : TypeOfCall_1.AssigmentMode.ReassignTask;
    };
    EditAssignment.prototype.getAssociateTasks = function (associateId) {
        this.assignedPatients.deselectAll();
        this.assignedPatients.searchParams = associateId;
        this.assignedPatients.loadDataList();
    };
    EditAssignment.prototype.formReset = function () {
        var today = new Date();
        this.isUpdating = false;
        this.actionType = TypeOfCall_1.AssigmentMode.EditTask;
        this.callAssignment = new call_assignment_model_1.CallAssignmentModel(TypeOfCall_1.AssigmentMode.EditTask, today, '', [], '');
    };
    EditAssignment.prototype.loadAssociates = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.CallAssignment + "/GetCallAgents").subscribe(function (data) {
            _this.associates = data;
            _this.reassignAssociates = data;
        });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", Object)
    ], EditAssignment.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild(patient_select_1.PatientSelect),
        __metadata("design:type", patient_select_1.PatientSelect)
    ], EditAssignment.prototype, "assignedPatients", void 0);
    __decorate([
        core_1.ViewChild(current_month_call_1.CurrentMonthCall),
        __metadata("design:type", current_month_call_1.CurrentMonthCall)
    ], EditAssignment.prototype, "associateActivities", void 0);
    EditAssignment = __decorate([
        core_1.Component({
            selector: 'edit-assignment',
            templateUrl: './edit-assignment.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, ngx_toastr_1.ToastrService])
    ], EditAssignment);
    return EditAssignment;
}());
exports.EditAssignment = EditAssignment;
//# sourceMappingURL=edit-assignment.js.map