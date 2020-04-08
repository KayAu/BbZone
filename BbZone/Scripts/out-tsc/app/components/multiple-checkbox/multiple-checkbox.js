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
var broadcast_service_1 = require("src/app/services/broadcast.service");
var data_service_1 = require("src/app/services/data.service");
var cascade_service_1 = require("src/app/services/cascade.service");
var MultipleCheckboxes = /** @class */ (function () {
    function MultipleCheckboxes(el, formEvent, cascadeEvent, dataService) {
        this.el = el;
        this.formEvent = formEvent;
        this.cascadeEvent = cascadeEvent;
        this.dataService = dataService;
        this.checkboxItems = [];
        this.selectAllAgents = false;
        this.disabled = false;
        this.propagateChange = function () { };
    }
    MultipleCheckboxes_1 = MultipleCheckboxes;
    Object.defineProperty(MultipleCheckboxes.prototype, "dataItems", {
        set: function (data) {
            this.checkboxItems = data;
        },
        enumerable: true,
        configurable: true
    });
    MultipleCheckboxes.prototype.ngOnInit = function () {
        var _this = this;
        if (this.required) {
            this.subscription = this.formEvent.notification.subscribe(function (form) {
                _this.parentForm = form.template;
                _this.validate();
            });
        }
    };
    MultipleCheckboxes.prototype.writeValue = function (data) {
        this.checkboxItems = data;
    };
    MultipleCheckboxes.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MultipleCheckboxes.prototype.setChanges = function () {
        //this.propagateChange(this.data);
    };
    MultipleCheckboxes.prototype.selectAll = function () {
        for (var _i = 0, _a = this.checkboxItems; _i < _a.length; _i++) {
            var item = _a[_i];
            item.selected = this.selectAllAgents;
        }
        this.selectedItemText = this.selectAllAgents ? 'All Agents' : 'Select';
        this.selectedItems = this.checkboxItems.filter(function (i) { return i.selected === true; }).map(function (i) { return i.displayValue; });
        this.propagateChange(this.selectedItems);
    };
    MultipleCheckboxes.prototype.itemSelected = function (event, itemNo) {
        this.selectedItemText = this.checkboxItems.filter(function (i) { return i.selected === true; }).map(function (i) { return i.displayText; }).join(', ');
        this.selectedItems = this.checkboxItems.filter(function (i) { return i.selected === true; }).map(function (i) { return i.displayValue; });
        this.propagateChange(this.selectedItems);
    };
    MultipleCheckboxes.prototype.removeSelection = function () {
        if (!this.checkboxItems)
            return;
        this.checkboxItems = this.checkboxItems.filter(function (a) { return a.selected === false; });
        this.selectAllAgents = false;
        this.selectedItems = null;
        this.selectedItemText = "";
    };
    MultipleCheckboxes.prototype.validate = function () {
        var thisElement = $(this.el.nativeElement);
        if (this.selectedItems === null || this.selectedItems === undefined || this.selectedItems.length === 0) {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger display-block">This is required</span>');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages(thisElement);
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    };
    MultipleCheckboxes.prototype.clearErrorMessages = function (thisElement) {
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        this.parentForm.controls[this.fieldId].setErrors(null);
        thisElement.next().remove();
    };
    MultipleCheckboxes.prototype.registerOnTouched = function () { };
    MultipleCheckboxes.prototype.setDisabledState = function () { };
    var MultipleCheckboxes_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleCheckboxes.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleCheckboxes.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleCheckboxes.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleCheckboxes.prototype, "displayText", void 0);
    __decorate([
        core_1.Input('dataItems'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MultipleCheckboxes.prototype, "dataItems", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MultipleCheckboxes.prototype, "propagateChange", void 0);
    MultipleCheckboxes = MultipleCheckboxes_1 = __decorate([
        core_1.Component({
            selector: 'multiple-checkbox',
            templateUrl: './multiple-checkbox.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return MultipleCheckboxes_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            broadcast_service_1.BroadcastService,
            cascade_service_1.CascadeService,
            data_service_1.DataService])
    ], MultipleCheckboxes);
    return MultipleCheckboxes;
}());
exports.MultipleCheckboxes = MultipleCheckboxes;
//# sourceMappingURL=multiple-checkbox.js.map