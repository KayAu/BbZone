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
var ProgressBar = /** @class */ (function () {
    function ProgressBar(el) {
        this.el = el;
        this._CurrentValue = 0;
        this._MaxValue = 0;
    }
    Object.defineProperty(ProgressBar.prototype, "currentValue", {
        set: function (value) {
            this._CurrentValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBar.prototype, "maxValue", {
        set: function (value) {
            this._MaxValue = value;
        },
        enumerable: true,
        configurable: true
    });
    ProgressBar.prototype.ngOnInit = function () {
        this.el.nativeElement.style.width = this.calculateWidth();
    };
    ProgressBar.prototype.calculateWidth = function () {
        var width = (this._CurrentValue / this._MaxValue) * 100;
        return width + '%';
    };
    __decorate([
        core_1.Input('current-value'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ProgressBar.prototype, "currentValue", null);
    __decorate([
        core_1.Input('max-value'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ProgressBar.prototype, "maxValue", null);
    ProgressBar = __decorate([
        core_1.Directive({
            selector: '.progress-bar'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progress-bar.js.map