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
var broadcast_service_1 = require("../services/broadcast.service");
var EqualValidator = /** @class */ (function () {
    //set valueToCompare(val: number) {
    //    this._valueToCompare = val;
    //}
    function EqualValidator(el, ngModel, formEvent) {
        this.el = el;
        this.ngModel = ngModel;
        this.formEvent = formEvent;
    }
    EqualValidator.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.formEvent.notification.subscribe(function (form) {
            _this.parentForm = form.template;
            _this.validate();
        });
    };
    EqualValidator.prototype.validate = function () {
        var thisElement = $(this.el.nativeElement);
        $(this.el.nativeElement).next('.text-danger').remove();
        var value = this.parentForm.controls[this.fieldId].value;
        if (this.valueToCompare && value && value !== this.valueToCompare) {
            thisElement.parent().find('.equal-error').remove();
            thisElement.after("<span class='text-danger equal-error'>" + this.errorMessage + "</span>");
            this.parentForm.controls[this.fieldId].setErrors({ 'equalValidator': true });
        }
        else {
            thisElement.parent().find('.equal-error').remove();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EqualValidator.prototype, "errorMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EqualValidator.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EqualValidator.prototype, "valueToCompare", void 0);
    EqualValidator = __decorate([
        core_1.Directive({
            selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
            providers: [forms_1.NgModel]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            forms_1.NgModel,
            broadcast_service_1.BroadcastService])
    ], EqualValidator);
    return EqualValidator;
}());
exports.EqualValidator = EqualValidator;
//# sourceMappingURL=equal-validator.directive.js.map