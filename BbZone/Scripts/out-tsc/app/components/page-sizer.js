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
var PageSizer = /** @class */ (function () {
    function PageSizer() {
        this.pageSizeChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(PageSizer.prototype, "defaultOption", {
        set: function (value) {
            this.selectedPageSize = value;
        },
        enumerable: true,
        configurable: true
    });
    PageSizer.prototype.selectionChanged = function () {
        this.pageSizeChanged.emit(this.selectedPageSize);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PageSizer.prototype, "pageSizeChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PageSizer.prototype, "defaultOption", null);
    PageSizer = __decorate([
        core_1.Component({
            selector: 'page-sizer',
            template: "<div class=\"dataTables_length float-right\">\n                    <label>Show\n                    <select class=\"form-control form-control-sm mrg5L mrg5R\" [(ngModel)]=\"selectedPageSize\" (ngModelChanged)=\"selectionChanged()\">\n                        <option value=\"10\">10</option>\n                        <option value=\"25\">25</option>\n                        <option value=\"50\">50</option>\n                        <option value=\"100\">100</option>\n                     </select>\n                    entries\n                    </label>\n                </div>",
        })
    ], PageSizer);
    return PageSizer;
}());
exports.PageSizer = PageSizer;
//# sourceMappingURL=page-sizer.js.map