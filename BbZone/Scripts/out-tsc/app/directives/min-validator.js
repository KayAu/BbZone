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
var MinDirective = /** @class */ (function () {
    function MinDirective(el, ngModel, formEvent) {
        this.el = el;
        this.ngModel = ngModel;
        this.formEvent = formEvent;
    }
    Object.defineProperty(MinDirective.prototype, "min", {
        set: function (value) {
            this.minValue = value;
        },
        enumerable: true,
        configurable: true
    });
    MinDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.formEvent.notification.subscribe(function (form) {
            _this.parentForm = form.template;
            _this.validate();
        });
    };
    MinDirective.prototype.validate = function () {
        var value = this.ngModel.model;
        var thisElement = $(this.el.nativeElement);
        thisElement.next('.text-danger').remove();
        if (value === null || value === undefined) {
            thisElement.after('<span class= "text-danger">This is required</span>');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else if (value === 0) {
            thisElement.after("<span class= 'text-danger'>This field must have a min value above " + this.minValue + " </span>");
            this.parentForm.controls[this.fieldId].setErrors({ 'min': true });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MinDirective.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MinDirective.prototype, "min", null);
    MinDirective = __decorate([
        core_1.Directive({
            selector: "[min][formControlName],[min][formControl],[min][ngModel]",
            providers: [forms_1.NgModel]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            forms_1.NgModel,
            broadcast_service_1.BroadcastService])
    ], MinDirective);
    return MinDirective;
}());
exports.MinDirective = MinDirective;
//# sourceMappingURL=min-validator.js.map