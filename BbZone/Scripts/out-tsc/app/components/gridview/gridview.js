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
var Gridview = /** @class */ (function () {
    function Gridview() {
        this.showTotal = false;
        this.dataColumns = [];
        this.showPager = true;
        this.hideColumns = [];
        this.dataSource = [];
    }
    Object.defineProperty(Gridview.prototype, "displayTotal", {
        set: function (show) {
            this.showTotal = show;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gridview.prototype, "dataItems", {
        set: function (data) {
            this.dataSource = data;
            if (Array.isArray(this.dataColumns) && !this.dataColumns.length)
                this.setColumnNames();
        },
        enumerable: true,
        configurable: true
    });
    //constructor(public loaderService: LoaderService, public dataService: DataService) {
    //    super(loaderService, dataService, "");
    //    this.dataSourceSubject.asObservable().subscribe(data => this.setColumnNames());
    //}
    Gridview.prototype.getRowData = function (row) {
        return Object.values(row);
    };
    Gridview.prototype.setColumnNames = function () {
        var _this = this;
        if (this.dataSource.length === 0)
            return;
        var dataKeys = Object.keys(this.dataSource[0]);
        // get columns which are not visible only
        dataKeys = dataKeys.filter(function (key, index) { return !_this.hideColumns.includes(index); });
        this.dataColumns = dataKeys.map(function (d) { return d.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, d[0].toUpperCase()); });
    };
    Gridview.prototype.sumColumnTotal = function (colIndex) {
        var dataRowItem = this.dataSource[0];
        var propName = Object.keys(dataRowItem)[colIndex];
        if (typeof this.dataSource[0][Object.keys(dataRowItem)[colIndex]] === 'number') {
            return this.dataSource.reduce(function (sum, data) { return sum + data[propName]; }, 0);
        }
        return null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Gridview.prototype, "showPager", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Gridview.prototype, "itemLink", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Gridview.prototype, "itemKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Gridview.prototype, "hideColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Gridview.prototype, "displayTotal", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Gridview.prototype, "dataItems", null);
    Gridview = __decorate([
        core_1.Component({
            selector: 'gridview',
            templateUrl: './gridview.html'
        })
    ], Gridview);
    return Gridview;
}());
exports.Gridview = Gridview;
//# sourceMappingURL=gridview.js.map