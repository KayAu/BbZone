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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LessThanValidator = /** @class */ (function () {
    function LessThanValidator(targetControlName) {
        this.targetControlName = targetControlName;
    }
    LessThanValidator_1 = LessThanValidator;
    LessThanValidator.prototype.validate = function (thisControl) {
        var myValue = thisControl.value;
        if (myValue) {
            // control value (e.g. password)
            var targetControl = thisControl.root.get(this.targetControlName);
            // value not equal
            if (targetControl && myValue > targetControl.value)
                return { validateLessThan: true };
        }
        return null;
    };
    var LessThanValidator_1;
    LessThanValidator = LessThanValidator_1 = __decorate([
        core_1.Directive({
            selector: '[validateLessThan]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return LessThanValidator_1; }), multi: true }
            ]
        }),
        __param(0, core_1.Attribute('validateLessThan')),
        __metadata("design:paramtypes", [String])
    ], LessThanValidator);
    return LessThanValidator;
}());
exports.LessThanValidator = LessThanValidator;
//# sourceMappingURL=less-than-validator.directive.js.map