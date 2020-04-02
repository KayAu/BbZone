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
var apiController_1 = require("src/app/enums/apiController");
var data_field_control_1 = require("src/app/model/data.field.control");
var viewWithdrawalColumns_1 = require("src/app/metadata/viewWithdrawalColumns");
var form_data_mapping_1 = require("src/app/model/form.data.mapping");
var search_params_1 = require("src/app/model/search-params");
var searchWithdrawalFields_1 = require("src/app/metadata/searchWithdrawalFields");
var authentication_1 = require("src/app/services/authentication");
var file_saver_1 = require("file-saver");
var common_1 = require("@angular/common");
var ViewWithdrawal = /** @class */ (function (_super) {
    __extends(ViewWithdrawal, _super);
    function ViewWithdrawal(loaderService, dataService, formEvent, authenticationService) {
        var _this = _super.call(this, loaderService, dataService, "", false) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.formEvent = formEvent;
        _this.authenticationService = authenticationService;
        _this.dataRowMapper = [];
        _this.searchFields = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.searchParams = new search_params_1.SearchWithdrawalViewParams(null, null, null, null);
        _this.dataSourceSubject.asObservable().subscribe(function (data) {
            _this.totalAmountPayout = data.totalAmountPayout;
            _this.totalAmountClaimed = data.totalAmountClaimed;
        });
        return _this;
    }
    ViewWithdrawal.prototype.ngOnInit = function () {
        this.currentUser = this.authenticationService.currentUserValue;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(function (d) { return d.keyField === true; }).fieldName;
        this.controllerName = apiController_1.ApiController.WithdrawalView;
    };
    ViewWithdrawal.prototype.getTablerowDataMapping = function () {
        var columnMappings = viewWithdrawalColumns_1.ViewWithdrawalColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    ViewWithdrawal.prototype.getSearchFeldsMapping = function () {
        var _this = this;
        var fieldMappings = searchWithdrawalFields_1.SearchWithdrawalFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.fieldForAdmin !== undefined ? (o.fieldForAdmin && !_this.currentUser.isAdmin ? true : false) : o.hidden, // hide the field
        !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl.datasourceUrl)); });
        return fieldMappings;
    };
    ViewWithdrawal.prototype.clearSearchParam = function () {
        this.searchParams = new search_params_1.SearchWithdrawalViewParams(null, null, null, null);
        this.reloadData();
    };
    ViewWithdrawal.prototype.exportRecords = function () {
        this.dataService.export(apiController_1.ApiController.WithdrawalView + "/Download", this.searchParams).subscribe(function (data) {
            var filename = "Withdrawal_" + common_1.formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US') + ".xlsx";
            var file = new Blob([data], { type: 'application/xlsx' });
            file_saver_1.saveAs(file, filename);
        });
    };
    ViewWithdrawal = __decorate([
        core_1.Component({
            selector: 'view-withdrawal',
            templateUrl: './view-withdrawal.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, authentication_1.AuthenticationService])
    ], ViewWithdrawal);
    return ViewWithdrawal;
}(listEvent_1.ListEvent));
exports.ViewWithdrawal = ViewWithdrawal;
//# sourceMappingURL=view-withdrawal.js.map