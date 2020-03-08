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
var page_model_1 = require("../../model/page.model");
var pageDisplayLimit = 8;
var Pagination = /** @class */ (function () {
    function Pagination() {
        this.pageClick = new core_1.EventEmitter();
        this.pageButtons = [];
        this.page = new page_model_1.Page();
        this.disabledNextAndLastBtn = false;
        this.disabledFirstAndPrevBtn = false;
    }
    Pagination.prototype.ngOnInit = function () {
        this.page.pageSize = 30;
        this.resetToFirstPage();
    };
    Pagination.prototype.goToPage = function (pageNo) {
        this.page.currentPage = pageNo;
        this.disabledNextAndLastBtn = this.page.currentPage >= this.page.totalPages ? true : false;
        this.disabledFirstAndPrevBtn = this.page.currentPage === 1 ? true : false;
        this.setPager();
        this.pageClick.emit(this.page);
    };
    Pagination.prototype.goNext = function () {
        if (this.page.currentPage === this.page.totalPages)
            return;
        this.page.currentPage++;
        this.pageClick.emit(this.page);
        if (this.page.currentPage > this.page.endPage) {
            this.page.startPage = this.page.currentPage;
            this.page.endPage = (this.page.currentPage + pageDisplayLimit) - 1;
        }
        this.disabledNextAndLastBtn = this.page.endPage >= this.page.totalPages ? true : false;
        this.disabledFirstAndPrevBtn = false;
        this.loadPagerButtons();
        this.setPager();
    };
    Pagination.prototype.goPrevious = function () {
        if (this.page.currentPage === this.page.totalPages)
            return;
        this.page.currentPage--;
        this.pageClick.emit(this.page);
        if (this.page.currentPage < this.page.startPage) {
            this.page.startPage = (this.page.currentPage - pageDisplayLimit) + 1;
            this.page.endPage = this.page.currentPage;
        }
        this.disabledFirstAndPrevBtn = this.page.currentPage === 1 ? true : false;
        this.disabledNextAndLastBtn = this.page.totalPages === 1 ? true : false;
        this.loadPagerButtons();
        this.setPager();
    };
    Pagination.prototype.goFirstPage = function () {
        this.resetToFirstPage();
    };
    Pagination.prototype.goLastPage = function () {
        this.page.currentPage = this.page.totalPages;
        this.pageClick.emit(this.page);
        if (this.page.totalPages > pageDisplayLimit) {
            this.page.startPage = (this.page.totalPages - pageDisplayLimit) + 1;
            this.page.endPage = this.page.totalPages;
        }
        this.disabledFirstAndPrevBtn = false;
        this.disabledNextAndLastBtn = true;
        this.loadPagerButtons();
        this.setPager();
    };
    Object.defineProperty(Pagination.prototype, "totalRecord", {
        set: function (totalNo) {
            if (!totalNo)
                return;
            this._totalRecord = totalNo;
            this.page.totalPages = Math.ceil(totalNo / this.page.pageSize);
            this.updatePager();
        },
        enumerable: true,
        configurable: true
    });
    Pagination.prototype.isActivePage = function (pagerIndex) {
        return pagerIndex === this.page.currentPage;
    };
    Pagination.prototype.setPager = function () {
        var toRow = this.page.currentPage * this.page.pageSize;
        var fromRow = (toRow - this.page.pageSize) + 1;
        if (toRow >= this._totalRecord)
            toRow = this._totalRecord;
        this.pageDesc = "Showing " + fromRow + " to " + toRow + " of " + this._totalRecord + " entries";
    };
    Pagination.prototype.loadPagerButtons = function () {
        this.pageButtons = [];
        for (var pageNo = this.page.startPage; pageNo <= this.page.endPage; pageNo++) {
            this.pageButtons.push(pageNo);
        }
    };
    Pagination.prototype.resetToFirstPage = function () {
        this.updatePager();
        this.pageClick.emit(this.page);
    };
    Pagination.prototype.updatePager = function () {
        this.page.currentPage = 1;
        this.page.startPage = 1;
        this.page.endPage = this.page.totalPages > pageDisplayLimit ? pageDisplayLimit : this.page.totalPages;
        this.disabledFirstAndPrevBtn = true;
        this.disabledNextAndLastBtn = this.page.totalPages === 1 ? true : false;
        this.loadPagerButtons();
        this.setPager();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "pageClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Pagination.prototype, "totalRecord", null);
    Pagination = __decorate([
        core_1.Component({
            selector: 'pager',
            templateUrl: './pagination.html',
            styleUrls: ['./pagination.css']
        })
    ], Pagination);
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map