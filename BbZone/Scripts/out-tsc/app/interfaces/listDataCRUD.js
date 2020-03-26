"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var listEvent_1 = require("./listEvent");
var form_submit_1 = require("../model/form-submit");
var forms_1 = require("@angular/forms");
var ListDataCrud = /** @class */ (function (_super) {
    __extends(ListDataCrud, _super);
    function ListDataCrud(loaderService, dataService, defaultSortedColumn, formEvent) {
        var _this = _super.call(this, loaderService, dataService, defaultSortedColumn) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.defaultSortedColumn = defaultSortedColumn;
        _this.formEvent = formEvent;
        _this.newRecord = {};
        _this.editedRecord = {};
        _this.fieldMapper = [];
        _this.showNewRow = false;
        return _this;
    }
    ListDataCrud.prototype.initDataRecord = function (fieldMapper) {
        this.fieldMapper = fieldMapper;
        for (var _i = 0, fieldMapper_1 = fieldMapper; _i < fieldMapper_1.length; _i++) {
            var field = fieldMapper_1[_i];
            this.newRecord[field.fieldName] = '';
            this.editedRecord[field.fieldName] = '';
        }
        this.setKeyField();
    };
    ListDataCrud.prototype.addRow = function () {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, this.formName));
        if (!this.form.valid)
            return;
        this.dataService.add(this.controllerName, this.newRecord).subscribe(function (data) {
            _this.setListDisplay(data);
            _this.resetNewRecord();
            _this.resetPageAndColSort();
        });
    };
    ListDataCrud.prototype.editRow = function (rowIndex) {
        this.hideEditingRow();
        this.dataSource[rowIndex].onEdit = true;
        this.editedRecord = Object.assign(this.editedRecord, this.dataSource[rowIndex]);
    };
    ListDataCrud.prototype.updateRow = function (rowIndex) {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, this.formName));
        if (!this.form.valid)
            return;
        this.dataSource[rowIndex] = this.editedRecord;
        this.dataService.update(this.controllerName, this.editedRecord[this.keyField], this.editedRecord).subscribe(function (data) {
            _this.dataSource[rowIndex] = data;
            _this.dataSource[rowIndex].onEdit = false;
        });
    };
    ListDataCrud.prototype.deleteRow = function (rowIndex) {
        var _this = this;
        this.dataService.remove(this.controllerName, this.dataSource[rowIndex][this.keyField]).subscribe(function (data) {
            _this.reloadData();
        });
    };
    ListDataCrud.prototype.cancelEdit = function (rowIndex) {
        this.dataSource[rowIndex].onEdit = false;
    };
    ListDataCrud.prototype.clearSearchParam = function () {
        for (var _i = 0, _a = Object.entries(this.searchParams); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.searchParams[key] = null;
        }
        this.reloadData();
    };
    ListDataCrud.prototype.setKeyField = function () {
        var field = this.fieldMapper.filter(function (f) { return f.keyField === true; });
        if (field.length > 0)
            this.keyField = field[0].fieldName;
    };
    ListDataCrud.prototype.hideEditingRow = function () {
        this.dataSource.forEach(function (element, index, array) {
            array[index].onEdit = false;
        });
        this.showNewRow = false;
    };
    ListDataCrud.prototype.resetNewRecord = function () {
        for (var _i = 0, _a = this.fieldMapper; _i < _a.length; _i++) {
            var field = _a[_i];
            this.newRecord[field.dataFieldControl.controlName] = '';
        }
        this.showNewRow = false;
    };
    ListDataCrud.prototype.resetPageAndColSort = function () {
        this.resetSorting();
        this.listPage.currentPage = 1;
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], ListDataCrud.prototype, "form", void 0);
    return ListDataCrud;
}(listEvent_1.ListEvent));
exports.ListDataCrud = ListDataCrud;
//# sourceMappingURL=ListDataCrud.js.map