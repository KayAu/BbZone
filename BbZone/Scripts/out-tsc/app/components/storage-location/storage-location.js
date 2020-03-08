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
var data_service_1 = require("../../services/data.service");
var storage_location_model_1 = require("../../model/storage.location.model");
var sort_model_1 = require("../../model/sort.model");
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("../../enums/apiController");
//import { forkJoin } from 'rxjs/observable/forkJoin';  
var StorageLocationAdministration = /** @class */ (function () {
    function StorageLocationAdministration(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.defaultSortField = "storagelocid";
        this.search = '';
        this.storageList = [];
        this.storageAreas = [];
        this.newStorage = new storage_location_model_1.StorageLocation();
        this.updateStorage = new storage_location_model_1.StorageLocation();
    }
    StorageLocationAdministration.prototype.ngOnInit = function () {
        this.sortBy = new sort_model_1.Sort(this.defaultSortField, false);
        //forkJoin([this.loadStorageLocation(), this.loadStorageArea()]).subscribe(results => {
        //    // results[0] is our character
        //    // results[1] is our character homeworld
        //    //this.storageAreas = results[1];
        //    console.log(results[1]);
        //    this.setListDisplay(results[0]);
        //});
    };
    StorageLocationAdministration.prototype.addStorageLocation = function () {
        var _this = this;
        if (this.updateStorage === undefined)
            return;
        this.dataService.add(apiController_1.ApiController.StorageLocations, this.newStorage).subscribe(function (data) {
            _this.resetListDisplay();
            _this.setListDisplay(data);
        });
    };
    StorageLocationAdministration.prototype.editRow = function (rowIndex) {
        this.updateStorage = Object.assign(this.updateStorage, this.storageList[rowIndex]);
    };
    StorageLocationAdministration.prototype.cancelEdit = function (rowIndex) {
        this.clearEditedModel();
    };
    StorageLocationAdministration.prototype.updateRow = function (rowIndex) {
        var _this = this;
        this.storageList[rowIndex] = this.updateStorage;
        this.dataService.update(apiController_1.ApiController.StorageLocations, this.updateStorage.storageLocId, this.updateStorage).subscribe(function (data) {
            //this.storageList[rowIndex] = data;
            _this.clearEditedModel();
        });
    };
    StorageLocationAdministration.prototype.deleteRow = function (rowIndex) {
        var _this = this;
        this.dataService.remove(apiController_1.ApiController.StorageLocations, this.storageList[rowIndex].storageLocId).subscribe(function (data) {
            _this.loadStorageLocation();
        });
    };
    StorageLocationAdministration.prototype.rowOnEdit = function (rowIndex) {
        return this.updateStorage.storageLocId === this.storageList[rowIndex].storageLocId;
    };
    StorageLocationAdministration.prototype.reloadStorageArea = function (items) {
        this.storageAreas = items;
    };
    StorageLocationAdministration.prototype.displaySearchItem = function (event) {
        this.search = event;
        this.loadStorageLocation();
    };
    StorageLocationAdministration.prototype.pageChanged = function (event) {
        this.listPage = event;
        this.loadStorageLocation();
    };
    StorageLocationAdministration.prototype.sortList = function (event) {
        this.sortBy = event;
        this.loadStorageLocation();
    };
    StorageLocationAdministration.prototype.setUpdatedStorageArea = function (selectedItem) {
        this.updateStorage.storageArea = this.storageAreas.find(function (x) { return x.storageAreaId == selectedItem; }).title;
    };
    StorageLocationAdministration.prototype.loadStorageLocation = function () {
        var _this = this;
        this.dataService.getListDataByPage(apiController_1.ApiController.StorageLocations, this.listPage.currentPage, this.listPage.pageSize, this.search, this.sortBy.header, this.sortBy.isAscOrder)
            .subscribe(function (data) { _this.setListDisplay(data); });
    };
    StorageLocationAdministration.prototype.setListDisplay = function (data) {
        this.storageList = data.displayData;
        this.totalRecords = data.totalRecords;
    };
    StorageLocationAdministration.prototype.clearEditedModel = function () {
        this.newStorage = new storage_location_model_1.StorageLocation();
        this.updateStorage = new storage_location_model_1.StorageLocation();
    };
    StorageLocationAdministration.prototype.resetListDisplay = function () {
        this.search = "";
        this.sortBy = new sort_model_1.Sort(this.defaultSortField, false);
        this.clearEditedModel();
    };
    StorageLocationAdministration = __decorate([
        core_1.Component({
            selector: 'storage-location',
            templateUrl: './storage-location.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], StorageLocationAdministration);
    return StorageLocationAdministration;
}());
exports.StorageLocationAdministration = StorageLocationAdministration;
//# sourceMappingURL=storage-location.js.map