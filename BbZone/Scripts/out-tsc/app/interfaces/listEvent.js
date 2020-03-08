"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sort_model_1 = require("../model/sort.model");
var rxjs_1 = require("rxjs");
var ListEvent = /** @class */ (function () {
    //dataSourceObs = this.dataSourceSub.asObservable();
    function ListEvent(loaderService, dataService, defaultSortField, sortInAsc) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.defaultSortField = defaultSortField;
        this.sortInAsc = sortInAsc;
        this.dataSource = [];
        this.dataSourceSubject = new rxjs_1.Subject();
        sortInAsc = !sortInAsc ? false : sortInAsc;
        this.sortBy = new sort_model_1.Sort(defaultSortField, sortInAsc);
    }
    ListEvent.prototype.pageChanged = function (event) {
        this.listPage = event;
        this.loadDataList();
    };
    ListEvent.prototype.sortList = function (event) {
        this.sortBy = event;
        this.loadDataList();
    };
    ListEvent.prototype.displaySearchItem = function (event) {
        this.loadDataList();
    };
    ListEvent.prototype.setListDisplay = function (data) {
        this.dataSource = data.displayData;
        this.totalRecords = data.totalRecords;
    };
    ListEvent.prototype.resetSorting = function () {
        this.sortBy = new sort_model_1.Sort(this.defaultSortField, false);
    };
    ListEvent.prototype.reloadData = function () {
        this.listPage.currentPage = 1;
        this.resetSorting();
        this.loadDataList();
    };
    ListEvent.prototype.loadDataList = function () {
        var _this = this;
        if (this.controllerName) {
            this.dataService.getListDataByPage(this.controllerName, this.listPage.currentPage, this.listPage.pageSize, this.searchParams, this.sortBy.header, this.sortBy.isAscOrder)
                .subscribe(function (data) {
                _this.setListDisplay(data);
                _this.dataSourceSubject.next(data);
            });
        }
    };
    return ListEvent;
}());
exports.ListEvent = ListEvent;
//# sourceMappingURL=listEvent.js.map