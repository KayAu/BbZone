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
var PageHeader = /** @class */ (function () {
    function PageHeader() {
        this.parentCategory = null;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PageHeader.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PageHeader.prototype, "parentCategory", void 0);
    PageHeader = __decorate([
        core_1.Component({
            selector: 'page-header',
            template: "<div class=\"row wrapper border-bottom white-bg page-heading mrg15B\">\n                <div class=\"col-lg-10\">\n                    <h2>{{title}}</h2>\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item\">\n                            <a [routerLink]='[\"/\"]'>Home</a>\n                        </li>\n                        <li class=\"breadcrumb-item\" *ngIf=\"parentCategory\">\n                            <a>{{parentCategory}}</a>\n                        </li>\n                        <li class=\"breadcrumb-item active\">\n                            <strong>{{title}}</strong>\n                        </li>\n                    </ol>\n                </div>\n                <div class=\"col-lg-2\">\n                </div>\n            </div>",
        })
    ], PageHeader);
    return PageHeader;
}());
exports.PageHeader = PageHeader;
//# sourceMappingURL=page-header.js.map