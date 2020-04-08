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
var common_1 = require("@angular/common");
var DefaultToday = /** @class */ (function () {
    function DefaultToday(model, datepipe) {
        this.model = model;
        this.datepipe = datepipe;
    }
    DefaultToday.prototype.ngOnInit = function () {
        var today = this.datepipe.transform((new Date()), 'yyyy-MM-dd');
        this.model.valueAccessor.writeValue(today);
    };
    DefaultToday = __decorate([
        core_1.Directive({
            selector: '[default-today]',
            providers: [forms_1.NgModel, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [forms_1.NgModel, common_1.DatePipe])
    ], DefaultToday);
    return DefaultToday;
}());
exports.DefaultToday = DefaultToday;
//# sourceMappingURL=default-today.js.map