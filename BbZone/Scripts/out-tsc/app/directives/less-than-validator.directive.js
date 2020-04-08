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
var LessThanValidator = /** @class */ (function () {
    function LessThanValidator() {
    }
    LessThanValidator_1 = LessThanValidator;
    Object.defineProperty(LessThanValidator.prototype, "valueToCompare", {
        set: function (val) {
            this._valueToCompare = val;
        },
        enumerable: true,
        configurable: true
    });
    LessThanValidator.prototype.validate = function (thisControl) {
        var myValue = thisControl.value;
        if (myValue) {
            // value not equal
            if (this._valueToCompare && myValue >= this._valueToCompare)
                return { validateLessThan: true };
        }
        return null;
    };
    var LessThanValidator_1;
    __decorate([
        core_1.Input('compare-value'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], LessThanValidator.prototype, "valueToCompare", null);
    LessThanValidator = LessThanValidator_1 = __decorate([
        core_1.Directive({
            selector: '[validateLessThan]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return LessThanValidator_1; }), multi: true }
            ]
        })
    ], LessThanValidator);
    return LessThanValidator;
}());
exports.LessThanValidator = LessThanValidator;
//# sourceMappingURL=less-than-validator.directive.js.map