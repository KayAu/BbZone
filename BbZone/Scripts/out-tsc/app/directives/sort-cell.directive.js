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
var sortable_directive_1 = require("../directives/sortable.directive");
var SortCellDirective = /** @class */ (function () {
    function SortCellDirective(renderer, el, table) {
        var _this = this;
        this.renderer = renderer;
        this.el = el;
        this.table = table;
        table.sorted.subscribe(function (sort) { return _this.updateSortStatus(sort); });
    }
    Object.defineProperty(SortCellDirective.prototype, "headerName", {
        set: function (name) {
            this._HeaderName = name;
        },
        enumerable: true,
        configurable: true
    });
    SortCellDirective.prototype.ngOnInit = function () {
        if (!this._HeaderName)
            return;
        this._IsAscOrder = null;
        this.setCss(this._IsAscOrder);
    };
    SortCellDirective.prototype.clickEvent = function (event) {
        this._IsAscOrder = !this._IsAscOrder;
        this.table.sort(new sort_model_1.Sort(this._HeaderName, this._IsAscOrder));
    };
    SortCellDirective.prototype.updateSortStatus = function (sortedColumn) {
        if (sortedColumn.header === this._HeaderName) {
            this.setCss(sortedColumn.isAscOrder);
        }
        else {
            this.setCss(null);
        }
    };
    SortCellDirective.prototype.setCss = function (ascOrder) {
        this.clearCss();
        switch (ascOrder) {
            case true: {
                this.renderer.addClass(this.el.nativeElement, 'sorting_asc');
                break;
            }
            case false: {
                this.renderer.addClass(this.el.nativeElement, 'sorting_desc');
                break;
            }
            default: {
                this.renderer.addClass(this.el.nativeElement, 'sorting');
                break;
            }
        }
    };
    SortCellDirective.prototype.clearCss = function () {
        this.renderer.removeClass(this.el.nativeElement, 'sorting');
        this.renderer.removeClass(this.el.nativeElement, 'sorting_asc');
        this.renderer.removeClass(this.el.nativeElement, 'sorting_desc');
    };
    __decorate([
        core_1.Input('sort-cell'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SortCellDirective.prototype, "headerName", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SortCellDirective.prototype, "clickEvent", null);
    SortCellDirective = __decorate([
        core_1.Directive({
            selector: '[sort-cell]'
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef, sortable_directive_1.SortableDirective])
    ], SortCellDirective);
    return SortCellDirective;
}());
exports.SortCellDirective = SortCellDirective;
//# sourceMappingURL=sort-cell.directive.js.map