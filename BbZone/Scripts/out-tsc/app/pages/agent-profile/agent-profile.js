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
var router_1 = require("@angular/router");
var agentFields_1 = require("../../metadata/agentFields");
var form_data_mapping_1 = require("../../model/form.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_field_control_1 = require("../../model/data.field.control");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var router_2 = require("@angular/router");
var apiController_1 = require("../../enums/apiController");
var forms_1 = require("@angular/forms");
var ngx_toastr_1 = require("ngx-toastr");
var superior_field_1 = require("src/app/components/superior-field/superior-field");
var authentication_1 = require("src/app/services/authentication");
var AgentProfile = /** @class */ (function () {
    function AgentProfile(loaderService, dataService, formEvent, router, route, toastr, authenticationService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.authenticationService = authenticationService;
        this.formFields = [];
        this.formRecord = {};
        this.isUpdating = false;
        this.completed = false;
    }
    AgentProfile.prototype.ngOnInit = function () {
        this.agentId = this.route.snapshot.params.id;
        this.currentUser = this.authenticationService.currentUserValue;
        this.formFields = this.getFormFeldsMapping();
        //if (!this.currentUser.isAdmin)
        //    this.setReadonlyFields();
        this.loadRecord();
    };
    AgentProfile.prototype.getFormFeldsMapping = function () {
        var fields = agentFields_1.AgentProfileFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.hidden, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null)); });
        return fields;
    };
    AgentProfile.prototype.submit = function () {
        var _this = this;
        this.setControlsAsTouched();
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        this.dataService.update(apiController_1.ApiController.Agent, this.formRecord[agentFields_1.AgentProfileFields.keyField], this.formRecord).subscribe(function (data) {
            _this.isUpdating = false;
            _this.superiorField.editable = false;
            _this.setControlsAsUnouched();
            _this.toastr.success('The record is updated into the system successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
        });
    };
    AgentProfile.prototype.loadRecord = function () {
        var _this = this;
        var url = this.agentId ? apiController_1.ApiController.Agent + "/" + this.agentId : "" + apiController_1.ApiController.Agent;
        this.dataService.get(url).subscribe(function (results) {
            _this.formRecord = results;
            _this.superiorField.editable = !_this.formRecord.superiorId || _this.currentUser.isAdmin ? true : false;
        });
    };
    //private setReadonlyFields() {
    //    let bankNameFldIdx = this.formFields.findIndex(f => f.fieldName == 'bankName');
    //    let bankAccNoFldIdx = this.formFields.findIndex(f => f.fieldName == 'bankAccNo');
    //    this.formFields[bankNameFldIdx].dataFieldControl.readonly = true;
    //    this.formFields[bankAccNoFldIdx].dataFieldControl.readonly = true;
    //}
    AgentProfile.prototype.setControlsAsTouched = function () {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    };
    AgentProfile.prototype.setControlsAsUnouched = function () {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsUntouched();
        }
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], AgentProfile.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild(superior_field_1.SuperiorField),
        __metadata("design:type", superior_field_1.SuperiorField)
    ], AgentProfile.prototype, "superiorField", void 0);
    AgentProfile = __decorate([
        core_1.Component({
            selector: 'agent-profile',
            templateUrl: './agent-profile.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService,
            data_service_1.DataService,
            broadcast_service_1.BroadcastService,
            router_1.Router,
            router_2.ActivatedRoute,
            ngx_toastr_1.ToastrService,
            authentication_1.AuthenticationService])
    ], AgentProfile);
    return AgentProfile;
}());
exports.AgentProfile = AgentProfile;
//# sourceMappingURL=agent-profile.js.map