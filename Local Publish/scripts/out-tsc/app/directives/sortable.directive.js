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
var sort_model_1 = require("../model/sort.model");
var SortableDirective = /** @class */ (function () {
    function SortableDirective() {
        this.onHeaderClick = new core_1.EventEmitter();
        this.sorted = new core_1.EventEmitter();
    }
    Object.defineProperty(SortableDirective.prototype, "sortColumn", {
        set: function (sortColumn) {
            this.sorted.emit(sortColumn);
        },
        enumerable: true,
        configurable: true
    });
    SortableDirective.prototype.sort = function (sortColumn) {
        this.onHeaderClick.emit(sortColumn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SortableDirective.prototype, "onHeaderClick", void 0);
    __decorate([
        core_1.Input('sort-column'),
        __metadata("design:type", sort_model_1.Sort),
        __metadata("design:paramtypes", [sort_model_1.Sort])
    ], SortableDirective.prototype, "sortColumn", null);
    SortableDirective = __decorate([
        core_1.Directive({
            selector: '[sortable]'
        }),
        __metadata("design:paramtypes", [])
    ], SortableDirective);
    return SortableDirective;
}());
exports.SortableDirective = SortableDirective;
//# sourceMappingURL=sortable.directive.js.map