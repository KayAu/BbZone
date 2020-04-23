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
var apiController_1 = require("src/app/enums/apiController");
var data_field_control_1 = require("src/app/model/data.field.control");
var form_data_mapping_1 = require("../../model/form.data.mapping");
var viewIncentiveColumns_1 = require("src/app/metadata/viewIncentiveColumns");
var search_params_1 = require("src/app/model/search-params");
var searchIncentiveFields_1 = require("src/app/metadata/searchIncentiveFields");
var ListDataCrud_1 = require("src/app/interfaces/ListDataCrud");
var file_saver_1 = require("file-saver");
var common_1 = require("@angular/common");
var ViewIncentives = /** @class */ (function (_super) {
    __extends(ViewIncentives, _super);
    function ViewIncentives(loaderService, dataService, formEvent) {
        var _this = _super.call(this, loaderService, dataService, 'incPymntId') || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.formEvent = formEvent;
        _this.dataRowMapper = [];
        _this.searchFields = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.controlType = dataDisplayType_1.ControlType;
        _this.customerSearchType = dataDisplayType_1.CustomerSearchType;
        _this.searchParams = new search_params_1.SearchIncentivesParams(null, null, null, null, null);
        _this.dataSourceSubject.asObservable().subscribe(function (data) {
            _this.totalAmountReceived = data.totalAmountReceived;
        });
        return _this;
    }
    ViewIncentives.prototype.ngOnInit = function () {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(function (d) { return d.keyField === true; }).fieldName;
        this.controllerName = apiController_1.ApiController.Incentives;
    };
    ViewIncentives.prototype.getTablerowDataMapping = function () {
        var columnMappings = viewIncentiveColumns_1.ViewIncentiveReceivedColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null)); });
        return columnMappings;
    };
    ViewIncentives.prototype.getSearchFeldsMapping = function () {
        var columnMappings = searchIncentiveFields_1.SearchIncentiveFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.hidden, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null, o.dataFieldControl.cascadeTo !== undefined ? o.dataFieldControl.cascadeTo : null)); });
        return columnMappings;
    };
    ViewIncentives.prototype.clearSearchParam = function () {
        this.searchParams = new search_params_1.SearchIncentivesParams(null, null, null, null, null);
        this.reloadData();
    };
    ViewIncentives.prototype.exportRecords = function () {
        this.dataService.export(apiController_1.ApiController.Download + "/Incentives", this.searchParams).subscribe(function (data) {
            var filename = "Incentives_" + common_1.formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US') + ".xlsx";
            var file = new Blob([data], { type: 'application/xlsx' });
            file_saver_1.saveAs(file, filename);
        });
    };
    ViewIncentives.prototype.setNewCustomerDetails = function (data) {
        if (data) {
            this.newRecord['applicationId'] = data.applicationId;
            this.newRecord['orderNo'] = data.orderNo;
            this.newRecord['packageName'] = data.packageName;
            this.newRecord['productName'] = data.productName;
            this.newRecord['category'] = data.category;
            this.newRecord['isActive'] = true;
        }
        else {
            this.newRecord['applicationId'] = '';
            this.newRecord['orderNo'] = '';
            this.newRecord['packageName'] = '';
            this.newRecord['productName'] = '';
            this.newRecord['category'] = '';
            this.newRecord['isActive'] = true;
        }
    };
    ViewIncentives = __decorate([
        core_1.Component({
            selector: 'view-incentives',
            templateUrl: './view-incentives.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService])
    ], ViewIncentives);
    return ViewIncentives;
}(ListDataCrud_1.ListDataCrud));
exports.ViewIncentives = ViewIncentives;
//# sourceMappingURL=view-incentives.js.map