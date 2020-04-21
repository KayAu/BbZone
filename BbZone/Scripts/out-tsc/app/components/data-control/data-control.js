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
var forms_1 = require("@angular/forms");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_field_control_1 = require("../../model/data.field.control");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_service_1 = require("../../services/data.service");
var apiController_1 = require("../../enums/apiController");
var cascade_data_1 = require("src/app/model/cascade-data");
var cascade_service_1 = require("src/app/services/cascade.service");
var DataControl = /** @class */ (function () {
    function DataControl(el, formEvent, cascadeEvent, dataService) {
        this.el = el;
        this.formEvent = formEvent;
        this.cascadeEvent = cascadeEvent;
        this.dataService = dataService;
        this.controlType = dataDisplayType_1.ControlType;
        this.onEdit = false;
        this.disabled = false;
        this.readonly = false;
        this.propagateChange = function () { };
        this.onModelChanged = new core_1.EventEmitter();
    }
    DataControl_1 = DataControl;
    DataControl.prototype.ngOnInit = function () {
        var _this = this;
        if (this.field.required) {
            this.subscription = this.formEvent.notification.subscribe(function (form) {
                if (!form)
                    return;
                _this.parentForm = form.template;
                _this.validate();
            });
        }
        if (this.field.controlType === dataDisplayType_1.ControlType.select)
            this.loadOptions();
        else if (this.field.controlType === dataDisplayType_1.ControlType.cascadeDropdown) {
            this.subscribeToParentField();
        }
    };
    DataControl.prototype.ngOnDestroy = function () {
        this.formEvent.destroy();
    };
    DataControl.prototype.writeValue = function (val) {
        if (this.field.controlType === this.controlType.select || this.field.controlType === this.controlType.cascadeDropdown) {
            this.data = val ? val.toString() : null;
            if (this.field.cascadeTo) {
                this.cascadeEvent.subject.next(new cascade_data_1.CascadeData(this.field.cascadeTo, this.data));
            }
        }
        else {
            this.data = val;
        }
    };
    DataControl.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    DataControl.prototype.setChanges = function () {
        this.propagateChange(this.data);
        if (this.onModelChanged.observers.length > 0) {
            this.onModelChanged.emit(this.data);
        }
        if (this.field.cascadeTo) {
            this.cascadeEvent.subject.next(new cascade_data_1.CascadeData(this.field.cascadeTo, this.data));
        }
    };
    DataControl.prototype.loadOptions = function () {
        var _this = this;
        if (!this.field.datasourceUrl)
            return;
        this.dataService.getAll(apiController_1.ApiController.Dropdown + "/" + this.field.datasourceUrl).subscribe(function (results) {
            _this.dropdownItems = results;
        });
    };
    DataControl.prototype.validate = function () {
        var thisElement = $(this.el.nativeElement);
        if (this.data === null || this.data === undefined || this.data === "") {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
            $(this.parentForm.controls[this.fieldId]).addClass('data-invalid');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages(thisElement);
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    };
    DataControl.prototype.clearErrorMessages = function (thisElement) {
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        thisElement.next().remove();
    };
    DataControl.prototype.subscribeToParentField = function () {
        var _this = this;
        this.cascadeEvent.subject.subscribe(function (cascade) {
            if (cascade.toField !== _this.field.controlName)
                return;
            _this.disabled = true;
            _this.dropdownItems = null;
            if (_this.field.cascadeTo) {
                _this.cascadeEvent.subject.next(new cascade_data_1.CascadeData(_this.field.cascadeTo, null));
            }
            if (cascade.value) {
                _this.dataService.getAll(apiController_1.ApiController.Dropdown + "/" + _this.field.datasourceUrl + "/" + cascade.value).subscribe(function (results) {
                    _this.dropdownItems = results;
                    _this.disabled = false;
                });
            }
        });
    };
    DataControl.prototype.registerOnTouched = function () { };
    DataControl.prototype.setDisabledState = function () { };
    var DataControl_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", data_field_control_1.DataFieldControl)
    ], DataControl.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataControl.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataControl.prototype, "onEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataControl.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataControl.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataControl.prototype, "formName", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataControl.prototype, "propagateChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataControl.prototype, "onModelChanged", void 0);
    DataControl = DataControl_1 = __decorate([
        core_1.Component({
            selector: 'data-control',
            templateUrl: './data-control.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return DataControl_1; }),
                    multi: true
                }
                //,{ provide: NG_VALIDATORS, useExisting: forwardRef(() => FieldBuilder), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            broadcast_service_1.BroadcastService,
            cascade_service_1.CascadeService,
            data_service_1.DataService])
    ], DataControl);
    return DataControl;
}());
exports.DataControl = DataControl;
//# sourceMappingURL=data-control.js.map