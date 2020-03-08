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
var question_set_1 = require("src/app/model/question-set");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var FieldBuilder = /** @class */ (function () {
    function FieldBuilder(el, formEvent) {
        this.el = el;
        this.formEvent = formEvent;
        this.onEdit = false;
        this.disabled = false;
        this.propagateChange = function () { };
        this.onModelChanged = new core_1.EventEmitter();
    }
    FieldBuilder_1 = FieldBuilder;
    FieldBuilder.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.field.required)
            return;
        this.subscription = this.formEvent.notification.subscribe(function (form) {
            if (form.name !== _this.formName)
                return;
            _this.parentForm = form.template;
            _this.validate();
        });
    };
    FieldBuilder.prototype.writeValue = function (val) {
        this.data = val;
    };
    FieldBuilder.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    FieldBuilder.prototype.setChanges = function () {
        this.propagateChange(this.data);
        if (this.onModelChanged.observers.length > 0) {
            this.onModelChanged.emit();
        }
    };
    FieldBuilder.prototype.registerOnTouched = function () { };
    FieldBuilder.prototype.setDisabledState = function () { };
    FieldBuilder.prototype.getMinDate = function () {
        return this.field.minValue === 'today' ? new Date().toJSON().split('T')[0] : null;
    };
    FieldBuilder.prototype.validate = function () {
        var thisElement = $(this.el.nativeElement);
        if (this.data === null || this.data === undefined || this.data === "") {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
            $(this.parentForm.controls[this.field.mapToField]).addClass('data-invalid');
            this.parentForm.controls[this.field.mapToField].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages(thisElement);
            this.parentForm.controls[this.field.mapToField].setErrors(null);
        }
    };
    FieldBuilder.prototype.clearErrorMessages = function (thisElement) {
        $(this.parentForm.controls[this.field.mapToField]).removeClass('data-invalid');
        thisElement.next().remove();
    };
    var FieldBuilder_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", question_set_1.QuestionMapping)
    ], FieldBuilder.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FieldBuilder.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FieldBuilder.prototype, "onEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FieldBuilder.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FieldBuilder.prototype, "formName", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FieldBuilder.prototype, "propagateChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FieldBuilder.prototype, "onModelChanged", void 0);
    FieldBuilder = FieldBuilder_1 = __decorate([
        core_1.Component({
            selector: 'field-builder',
            templateUrl: './field-builder.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return FieldBuilder_1; }),
                    multi: true
                }
                //,{ provide: NG_VALIDATORS, useExisting: forwardRef(() => FieldBuilder), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            broadcast_service_1.BroadcastService])
    ], FieldBuilder);
    return FieldBuilder;
}());
exports.FieldBuilder = FieldBuilder;
//# sourceMappingURL=field-builder.js.map