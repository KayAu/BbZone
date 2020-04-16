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
var editOrderFields_1 = require("../../metadata/editOrderFields");
var form_data_mapping_1 = require("../../model/form.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_field_control_1 = require("../../model/data.field.control");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var router_2 = require("@angular/router");
var apiController_1 = require("../../enums/apiController");
var form_submit_1 = require("src/app/model/form-submit");
var forms_1 = require("@angular/forms");
var authentication_1 = require("src/app/services/authentication");
var EditOrder = /** @class */ (function () {
    function EditOrder(loaderService, dataService, formEvent, router, route, authenticationService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
        this.formFields = [];
        this.formRecord = {};
        this.isUpdating = false;
        this.commIsConfigured = true;
    }
    EditOrder.prototype.ngOnInit = function () {
        this.currentUser = this.authenticationService.currentUserValue;
        this.recordId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord(this.route.snapshot.params.id);
    };
    EditOrder.prototype.getFormFeldsMapping = function () {
        var columnMappings = editOrderFields_1.EditOrderFields.fields.map(function (o) {
            return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.hidden, !o.dataFieldControl ? null : new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] ? o.dataFieldControl["datasourceUrl"] : null, o.dataFieldControl["cascadeTo"] ? o.dataFieldControl["cascadeTo"] : null, o.dataFieldControl["adminField"] ? o.dataFieldControl["adminField"] : false, o.dataFieldControl["dataChangedEvent"] ? o.dataFieldControl["dataChangedEvent"] : null));
        });
        if (!this.currentUser.isAdmin) {
            columnMappings = columnMappings.filter(function (c) { return c.dataFieldControl.adminField === false; });
        }
        return columnMappings;
    };
    EditOrder.prototype.update = function () {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, this.form.name));
        if (!this.form.valid)
            return;
        if (this.preventPosComplete())
            return;
        this.isUpdating = true;
        var formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));
        if (this.formRecord.customerDocuments) {
            for (var i = 0; i < this.formRecord.customerDocuments.length; i++) {
                if (!this.formRecord.customerDocuments[i].deleted) {
                    formData.append("file" + i, this.formRecord.customerDocuments[i]);
                }
            }
        }
        this.dataService.updateForm(apiController_1.ApiController.CustomerApplication, this.recordId, formData).subscribe(function (data) {
            _this.isUpdating = false;
            _this.router.navigate(['/view-order']);
        });
    };
    EditOrder.prototype.showProcessedDetails = function (show) {
        if (!show)
            show = false;
        var updateFields = ["orderNo", "userId", "telNo"];
        for (var _i = 0, updateFields_1 = updateFields; _i < updateFields_1.length; _i++) {
            var field = updateFields_1[_i];
            var index = this.formFields.findIndex(function (i) { return i.fieldName == field; });
            this.formFields[index].hidden = !show;
        }
    };
    EditOrder.prototype.showEForm = function (show) {
        if (!show)
            show = false;
        var index = this.formFields.findIndex(function (i) { return i.fieldName == "eForm"; });
        this.formFields[index].hidden = !show;
    };
    EditOrder.prototype.checkCommissionSettings = function () {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.CustomerApplication + "/CheckCommissionSettings/" + this.formRecord['categoryId'] + "/" + this.formRecord['agent']).subscribe(function (isConfigured) {
            _this.commIsConfigured = isConfigured;
        });
    };
    EditOrder.prototype.preventPosComplete = function () {
        if (!this.commIsConfigured && this.formRecord['appStatusId'] == 4) {
            window.scrollTo(0, 0);
            return true;
        }
        return false;
    };
    EditOrder.prototype.loadRecord = function (recordId) {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.CustomerApplication, recordId).subscribe(function (data) {
            _this.formRecord = data;
            _this.commIsConfigured = _this.formRecord['commIsConfigured'];
            _this.showEForm(_this.formRecord["showEForm"]);
            _this.showProcessedDetails(_this.formRecord["isProcessed"]);
        });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], EditOrder.prototype, "form", void 0);
    EditOrder = __decorate([
        core_1.Component({
            selector: 'edit-order',
            templateUrl: './edit-order.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService,
            data_service_1.DataService,
            broadcast_service_1.BroadcastService,
            router_1.Router,
            router_2.ActivatedRoute,
            authentication_1.AuthenticationService])
    ], EditOrder);
    return EditOrder;
}());
exports.EditOrder = EditOrder;
//# sourceMappingURL=edit-order.js.map