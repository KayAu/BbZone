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
var NoEmptyCellValidator = /** @class */ (function () {
    function NoEmptyCellValidator(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    NoEmptyCellValidator.prototype.onBlur = function (event) {
        var value = this.ngModel.model;
        if (value === null || value === undefined || value === '') {
            event.stopPropagation();
            this.el.nativeElement.focus();
        }
    };
    __decorate([
        core_1.HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NoEmptyCellValidator.prototype, "onBlur", null);
    NoEmptyCellValidator = __decorate([
        core_1.Directive({
            selector: '[no-empty-cell][ngModel]',
            providers: [forms_1.NgModel]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            forms_1.NgModel])
    ], NoEmptyCellValidator);
    return NoEmptyCellValidator;
}());
exports.NoEmptyCellValidator = NoEmptyCellValidator;
//# sourceMappingURL=no-empty-cell.directive.js.map