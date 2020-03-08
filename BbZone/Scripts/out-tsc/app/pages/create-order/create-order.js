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
var newOrderFields_1 = require("../../metadata/newOrderFields");
var form_data_mapping_1 = require("../../model/form.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_field_control_1 = require("../../model/data.field.control");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("../../enums/apiController");
var form_submit_1 = require("src/app/model/form-submit");
var forms_1 = require("@angular/forms");
var cascade_data_1 = require("src/app/model/cascade-data");
var cascade_service_1 = require("src/app/services/cascade.service");
var CreateOrder = /** @class */ (function () {
    function CreateOrder(loaderService, dataService, formEvent, cascadeService, router) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.cascadeService = cascadeService;
        this.router = router;
        this.formFields = [];
        this.newRecord = {};
        this.isUpdating = false;
    }
    CreateOrder.prototype.ngOnInit = function () {
        this.formFields = this.getFormFeldsMapping();
    };
    CreateOrder.prototype.getFormFeldsMapping = function () {
        var columnMappings = newOrderFields_1.NewOrderFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.readonly, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null, o.dataFieldControl.cascadeTo !== undefined ? o.dataFieldControl.cascadeTo : null)); });
        return columnMappings;
    };
    CreateOrder.prototype.create = function () {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, this.form.name));
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        var formData = new FormData();
        formData.append('data', JSON.stringify(this.newRecord));
        if (this.newRecord.files) {
            for (var i = 0; i < this.newRecord.files.length; i++) {
                formData.append("file" + i, this.newRecord.files[i]);
            }
        }
        this.dataService.postForm(apiController_1.ApiController.CustomerApplication, formData).subscribe(function (data) {
            _this.isUpdating = false;
            _this.router.navigate(['/view-order']);
        });
    };
    CreateOrder.prototype.loadCategories = function (productId) {
        this.cascadeService.subject.next(new cascade_data_1.CascadeData("categoryId", productId));
    };
    CreateOrder.prototype.clearPackages = function () {
        this.selectedCategory = null;
        this.cascadeService.subject.next(new cascade_data_1.CascadeData("prodPkgId", this.selectedCategory));
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], CreateOrder.prototype, "form", void 0);
    CreateOrder = __decorate([
        core_1.Component({
            selector: 'create-order',
            templateUrl: './create-order.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, cascade_service_1.CascadeService, router_1.Router])
    ], CreateOrder);
    return CreateOrder;
}());
exports.CreateOrder = CreateOrder;
//# sourceMappingURL=create-order.js.map