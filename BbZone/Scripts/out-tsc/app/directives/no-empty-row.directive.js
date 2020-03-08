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
var NoEmptyRowValidator = /** @class */ (function () {
    function NoEmptyRowValidator(el, ngModel, formSubmitted) {
        this.el = el;
        this.ngModel = ngModel;
        this.formSubmitted = formSubmitted;
    }
    NoEmptyRowValidator.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.formSubmitted.notification.subscribe(function (res) {
            _this.handleError();
        });
    };
    NoEmptyRowValidator.prototype.handleError = function () {
        var value = this.ngModel.model;
        var thisElement = $(this.el.nativeElement);
        if (value === null || value === undefined || value.length === 0) {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
        }
        else {
            thisElement.next().remove();
        }
    };
    NoEmptyRowValidator = __decorate([
        core_1.Directive({
            selector: '[no-empty-row][ngModel]',
            providers: [forms_1.NgModel]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            forms_1.NgModel,
            broadcast_service_1.BroadcastService])
    ], NoEmptyRowValidator);
    return NoEmptyRowValidator;
}());
exports.NoEmptyRowValidator = NoEmptyRowValidator;
//# sourceMappingURL=no-empty-row.directive.js.map