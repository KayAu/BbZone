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
var MinDirective = /** @class */ (function () {
    function MinDirective() {
    }
    MinDirective_1 = MinDirective;
    Object.defineProperty(MinDirective.prototype, "min", {
        //private minValue: number;
        set: function (value) {
            //this.minValue = parseInt(value, 10);
            this._validator = forms_1.Validators.min(parseInt(value, 10));
        },
        enumerable: true,
        configurable: true
    });
    MinDirective.prototype.validate = function (thisControl) {
        //if (thisControl.value) {
        //    if (thisControl.value < this.minValue) {
        //        thisControl.setValue(this.minValue);
        //        return { min: true };
        //    }
        //}
        //return null;
        return this._validator(thisControl);
    };
    var MinDirective_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MinDirective.prototype, "min", null);
    MinDirective = MinDirective_1 = __decorate([
        core_1.Directive({
            selector: "[min][formControlName],[min][formControl],[min][ngModel]",
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: MinDirective_1,
                    multi: true
                }
            ]
        })
    ], MinDirective);
    return MinDirective;
}());
exports.MinDirective = MinDirective;
//# sourceMappingURL=min-validator.js.map