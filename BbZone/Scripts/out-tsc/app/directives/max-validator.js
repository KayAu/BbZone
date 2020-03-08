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
var MaxDirective = /** @class */ (function () {
    function MaxDirective() {
    }
    MaxDirective_1 = MaxDirective;
    Object.defineProperty(MaxDirective.prototype, "max", {
        set: function (value) {
            // this.maxValue = parseInt(value, 10);
            this._validator = forms_1.Validators.max(parseInt(value, 10));
        },
        enumerable: true,
        configurable: true
    });
    MaxDirective.prototype.validate = function (thisControl) {
        return this._validator(thisControl);
        //if (thisControl.value) {
        //    if (thisControl.value > this.maxValue) {
        //        thisControl.setValue(this.maxValue);
        //        return { max: true };
        //    }
        //}
        //return null;
    };
    var MaxDirective_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MaxDirective.prototype, "max", null);
    MaxDirective = MaxDirective_1 = __decorate([
        core_1.Directive({
            selector: "[max][formControlName],[max][formControl],[max][ngModel]",
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: MaxDirective_1,
                    multi: true
                }
            ]
        })
    ], MaxDirective);
    return MaxDirective;
}());
exports.MaxDirective = MaxDirective;
//# sourceMappingURL=max-validator.js.map