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
var tablerow_data_mapping_1 = require("src/app/model/tablerow.data.mapping");
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var dataDisplayType_1 = require("src/app/enums/dataDisplayType");
var listEvent_1 = require("src/app/interfaces/listEvent");
var search_params_1 = require("../../model/search-params");
var apiController_1 = require("src/app/enums/apiController");
var form_data_mapping_1 = require("src/app/model/form.data.mapping");
var data_field_control_1 = require("src/app/model/data.field.control");
var viewCompletedOrderColumns_1 = require("src/app/metadata/viewCompletedOrderColumns");
var SearchCompletedOrderFields_1 = require("src/app/metadata/SearchCompletedOrderFields");
var common_1 = require("@angular/common");
var file_saver_1 = require("file-saver");
var ViewCompletedApp = /** @class */ (function (_super) {
    __extends(ViewCompletedApp, _super);
    function ViewCompletedApp(loaderService, dataService, formEvent) {
        var _this = _super.call(this, loaderService, dataService, "applicationId", false) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.formEvent = formEvent;
        _this.dataRowMapper = [];
        _this.searchFields = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.searchParams = new search_params_1.SearchCompletedOrderParams(null, null, null, null, null, null, null, null);
        return _this;
    }
    ViewCompletedApp.prototype.ngOnInit = function () {
        this.controllerName = apiController_1.ApiController.CompletedApplication;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(function (d) { return d.keyField === true; }).fieldName;
    };
    ViewCompletedApp.prototype.getTablerowDataMapping = function () {
        var columnMappings = viewCompletedOrderColumns_1.ViewCompletedOrderColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    ViewCompletedApp.prototype.getSearchFeldsMapping = function () {
        var columnMappings = SearchCompletedOrderFields_1.SearchCompletedOrderFields.fields.map(function (o) { return new form_data_mapping_1.SearchFieldMapping(o.fieldName, o.displayText, o.width, !o.dataFieldControl ? null :
            new data_field_control_1.SearchFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null, o.dataFieldControl.cascadeTo !== undefined ? o.dataFieldControl.cascadeTo : null, o.dataFieldControl.placeholder !== undefined ? o.dataFieldControl.placeholder : null)); });
        return columnMappings;
    };
    ViewCompletedApp.prototype.clearSearchParam = function () {
        this.searchParams = new search_params_1.SearchCompletedOrderParams(null, null, null, null, null, null, null, null);
        this.reloadData();
    };
    ViewCompletedApp.prototype.exportRecords = function () {
        this.dataService.export(apiController_1.ApiController.Download + "/CompletedOrders", this.searchParams).subscribe(function (data) {
            var filename = "CompletedOrders_" + common_1.formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US') + ".xlsx";
            var file = new Blob([data], { type: 'application/xlsx' });
            file_saver_1.saveAs(file, filename);
        });
    };
    ViewCompletedApp = __decorate([
        core_1.Component({
            selector: 'view-complete-app',
            templateUrl: './view-complete-app.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService])
    ], ViewCompletedApp);
    return ViewCompletedApp;
}(listEvent_1.ListEvent));
exports.ViewCompletedApp = ViewCompletedApp;
//# sourceMappingURL=view-complete-app.js.map