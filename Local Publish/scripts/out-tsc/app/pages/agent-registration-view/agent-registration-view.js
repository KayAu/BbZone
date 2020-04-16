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
var form_data_mapping_1 = require("../../model/form.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_field_control_1 = require("../../model/data.field.control");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var ngx_toastr_1 = require("ngx-toastr");
var router_2 = require("@angular/router");
var apiController_1 = require("../../enums/apiController");
var form_submit_1 = require("src/app/model/form-submit");
var forms_1 = require("@angular/forms");
var cascade_service_1 = require("src/app/services/cascade.service");
var agentFields_1 = require("src/app/metadata/agentFields");
var AgentRegistrationView = /** @class */ (function () {
    function AgentRegistrationView(loaderService, dataService, formEvent, cascadeService, router, route, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.cascadeService = cascadeService;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.formFields = [];
        this.formRecord = {};
        this.registrationDocuments = [];
        this.isUpdating = false;
    }
    AgentRegistrationView.prototype.ngOnInit = function () {
        this.applicationId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord(this.route.snapshot.params.id);
    };
    AgentRegistrationView.prototype.getFormFeldsMapping = function () {
        var columnMappings = agentFields_1.AgentRegistrationViewFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.hidden, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null)); });
        return columnMappings;
    };
    AgentRegistrationView.prototype.update = function () {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, this.form.name));
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        this.dataService.update(apiController_1.ApiController.Registration, this.applicationId, this.formRecord).subscribe(function (data) {
            _this.isUpdating = false;
            _this.router.navigate(['/agent-registration-list']);
        });
    };
    AgentRegistrationView.prototype.loadRecord = function (recordId) {
        var _this = this;
        //  return Ok(new { RegistrationDetails = record, RegistrationDocuments = registrationDocuments });
        this.dataService.get(apiController_1.ApiController.Registration, recordId).subscribe(function (data) {
            _this.formRecord = data.registrationDetails;
            _this.registrationDocuments = data.registrationDocuments;
        });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], AgentRegistrationView.prototype, "form", void 0);
    AgentRegistrationView = __decorate([
        core_1.Component({
            selector: 'agent-registration-view',
            templateUrl: './agent-registration-view.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService,
            cascade_service_1.CascadeService, router_1.Router, router_2.ActivatedRoute, ngx_toastr_1.ToastrService])
    ], AgentRegistrationView);
    return AgentRegistrationView;
}());
exports.AgentRegistrationView = AgentRegistrationView;
//# sourceMappingURL=agent-registration-view.js.map