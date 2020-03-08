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
var RequiredValidator = /** @class */ (function () {
    //@Input('check-on')
    //set checkon(formSubmitted: boolean) {
    //    if (!formSubmitted)
    //        return;
    //    this.isFormSubmitted = formSubmitted;
    //    this.handleError();
    //}
    function RequiredValidator(el, ngModel, formSubmitted) {
        this.el = el;
        this.ngModel = ngModel;
        this.formSubmitted = formSubmitted;
    }
    RequiredValidator.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.formSubmitted.notification.subscribe(function (res) {
            _this.handleError();
        });
    };
    RequiredValidator.prototype.onBlur = function () {
        if (!this.isFormSubmitted)
            return;
        this.handleError();
    };
    RequiredValidator.prototype.handleError = function () {
        var thisElement = this.isInputGroupControl() ? $(this.el.nativeElement).parent() : $(this.el.nativeElement);
        if (!thisElement[0].required)
            return;
        var value = this.ngModel.model;
        if (value === null || value === undefined || value === "") {
            thisElement.addClass('data-invalid');
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
        }
        else {
            if (this.ngModel.valid) {
                thisElement.removeClass('data-invalid');
                thisElement.next().remove();
            }
        }
    };
    RequiredValidator.prototype.isInputGroupControl = function () {
        return $(this.el.nativeElement).parent().hasClass('input-group') ? true : false;
    };
    __decorate([
        core_1.HostListener('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RequiredValidator.prototype, "onBlur", null);
    RequiredValidator = __decorate([
        core_1.Directive({
            selector: '[required][ngModel]',
            providers: [forms_1.NgModel]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            forms_1.NgModel,
            broadcast_service_1.BroadcastService])
    ], RequiredValidator);
    return RequiredValidator;
}());
exports.RequiredValidator = RequiredValidator;
//# sourceMappingURL=required.directive.js.map