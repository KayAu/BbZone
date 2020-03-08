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
var supplier_service_1 = require("../../services/supplier.service");
var supplier_model_1 = require("../../model/supplier.model");
var sort_model_1 = require("../../model/sort.model");
var loader_service_1 = require("../../loader/loader.service");
var SupplierAdministration = /** @class */ (function () {
    function SupplierAdministration(loaderService, supService) {
        this.loaderService = loaderService;
        this.supService = supService;
        this.search = '';
        this.supplierList = [];
        this.editSupplier = new supplier_model_1.Supplier();
    }
    SupplierAdministration.prototype.ngOnInit = function () {
        this.sortBy = new sort_model_1.Sort("supplierid", false);
        //setTimeout(() => {
        //  this.sortBy = new Sort("supplierid", false);
        //}, 10000);
    };
    SupplierAdministration.prototype.addSupplier = function () {
        var _this = this;
        var results;
        this.supService.addSupplier(this.input.nativeElement.value).subscribe(function (data) {
            _this.setListDisplay(data);
            _this.resetListDisplay();
            _this.sortBy = new sort_model_1.Sort("supplierid", false);
        });
    };
    SupplierAdministration.prototype.editRow = function (rowIndex) {
        this.editSupplier = Object.assign(this.editSupplier, this.supplierList[rowIndex]);
    };
    SupplierAdministration.prototype.cancelEdit = function (rowIndex) {
        this.clearEditedModel();
    };
    SupplierAdministration.prototype.updateRow = function (rowIndex) {
        var _this = this;
        this.supplierList[rowIndex] = this.editSupplier;
        this.supService.updateSupplier(this.editSupplier).subscribe(function (data) {
            _this.supplierList[rowIndex] = data;
            _this.clearEditedModel();
        });
    };
    SupplierAdministration.prototype.deleteRow = function (rowIndex) {
        var _this = this;
        this.supService.removeSupplier(this.supplierList[rowIndex].supplierId).subscribe(function (data) {
            _this.loadSuppliers();
        });
    };
    SupplierAdministration.prototype.rowOnEdit = function (rowIndex) {
        return this.editSupplier.supplierId === this.supplierList[rowIndex].supplierId;
    };
    SupplierAdministration.prototype.displaySearchItem = function (event) {
        this.search = event;
        this.loadSuppliers();
    };
    SupplierAdministration.prototype.pageChanged = function (event) {
        this.listPage = event;
        this.loadSuppliers();
    };
    SupplierAdministration.prototype.sortList = function (event) {
        this.sortBy = event;
        this.loadSuppliers();
    };
    SupplierAdministration.prototype.loadSuppliers = function () {
        var _this = this;
        this.supService.getSupplierList(this.listPage.currentPage, this.listPage.pageSize, this.search, this.sortBy.header, this.sortBy.isAscOrder)
            .subscribe(function (data) { _this.setListDisplay(data); });
    };
    SupplierAdministration.prototype.setListDisplay = function (data) {
        this.supplierList = data.displayData;
        this.totalRecords = data.totalRecords;
    };
    SupplierAdministration.prototype.clearEditedModel = function () {
        this.editSupplier = new supplier_model_1.Supplier();
    };
    SupplierAdministration.prototype.resetListDisplay = function () {
        this.search = "";
        this.sortBy = new sort_model_1.Sort("supplierid", false);
        this.input.nativeElement.value = "";
    };
    __decorate([
        core_1.ViewChild('suppliername'),
        __metadata("design:type", core_1.ElementRef)
    ], SupplierAdministration.prototype, "input", void 0);
    SupplierAdministration = __decorate([
        core_1.Component({
            selector: 'supplier-administration',
            templateUrl: './supplier-administration.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, supplier_service_1.SupplierService])
    ], SupplierAdministration);
    return SupplierAdministration;
}());
exports.SupplierAdministration = SupplierAdministration;
//# sourceMappingURL=supplier-administration.js.map