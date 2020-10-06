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
var createWithdrawalColumns_1 = require("../../metadata/createWithdrawalColumns");
var search_params_1 = require("src/app/model/search-params");
var router_1 = require("@angular/router");
var authentication_1 = require("../../services/authentication");
var data_field_control_1 = require("../../model/data.field.control");
var CreateWithdrawal = /** @class */ (function (_super) {
    __extends(CreateWithdrawal, _super);
    function CreateWithdrawal(loaderService, dataService, authenticationService, formEvent, router) {
        var _this = _super.call(this, loaderService, dataService, '', false) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.authenticationService = authenticationService;
        _this.formEvent = formEvent;
        _this.router = router;
        _this.isUpdating = false;
        _this.dataRowMapper = [];
        _this.selectedItems = [];
        _this.defaultSelectedItems = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.totalAmountToDeduct = 0;
        _this.totalSelectedAmount = 0;
        _this.totalIncentives = 0;
        _this.totalWithdrawalAmt = 0;
        _this.totalClaimedItems = 0;
        _this.allowSubmit = true;
        _this.oriDataSource = [];
        _this.viewSelectedItems = false;
        _this.selectAllItems = false;
        _this.dataSourceSubject.asObservable().subscribe(function (data) {
            //this.selectAllItems = false;
            //this.totalClaimedItems = 0;
            _this.totalAmountToDeduct = data.totalAmountToDeduct;
            _this.totalIncentives = data.totalIncentives;
            _this.totalWithdrawalAmt = (_this.totalSelectedAmount + data.totalIncentives) - data.totalAmountToDeduct;
            _this.setDefaultSelectedItems();
            _this.setSelectedItems();
            _this.checkAllItemsSelected();
        });
        return _this;
    }
    CreateWithdrawal.prototype.ngOnInit = function () {
        var _this = this;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new search_params_1.SearchWithdrawalToSubmitParams(null, null, null);
        this.controllerName = apiController_1.ApiController.WithdrawalSubmit;
        this.authenticationService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
            _this.searchParams.agent = user.username;
            if (user.isAdmin) {
                _this.agentField = new data_field_control_1.SearchFieldControl("agent", dataDisplayType_1.ControlType.select, 0, "GetAgents");
            }
        });
    };
    CreateWithdrawal.prototype.getTablerowDataMapping = function () {
        var columnMappings = createWithdrawalColumns_1.CreateWithdrawalColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    CreateWithdrawal.prototype.itemSelected = function (item) {
        if (item.selected) {
            if (!this.selectedItems.includes(item))
                this.selectedItems.push(item);
        }
        else {
            var index = this.selectedItems.findIndex(function (p) { return p.claimCommId === item.claimCommId; });
            if (index >= 0)
                this.selectedItems.splice(index, 1);
        }
        this.updateWithdrawalAmt();
        this.checkAllItemsSelected();
    };
    CreateWithdrawal.prototype.allItemsSelected = function () {
        var _this = this;
        this.dataSource.forEach(function (selectedItem, i, self) {
            if (self[i].transactionType === 'Own Sales' || self[i].transactionType === 'Override') {
                if (_this.selectAllItems) {
                    if (self[i].selected !== _this.selectAllItems) {
                        _this.selectedItems.push(self[i]);
                    }
                }
                else {
                    _this.selectedItems.splice(_this.selectedItems.indexOf(self[i]), 1);
                }
                self[i].selected = _this.selectAllItems;
            }
        });
        this.updateWithdrawalAmt();
    };
    CreateWithdrawal.prototype.getAgentWithdrawalItems = function () {
        this.searchParams.agent = this.selectedAgent;
        this.reloadData();
    };
    CreateWithdrawal.prototype.submit = function () {
        var _this = this;
        var claimItems = this.selectedItems.concat(this.defaultSelectedItems);
        var newRecord = {
            withdrawalItems: claimItems,
            withdrawAmount: this.totalWithdrawalAmt,
            claimed: this.totalSelectedAmount,
            incentives: this.totalIncentives,
            deduction: this.totalAmountToDeduct
        };
        this.isUpdating = true;
        this.dataService.postForm(apiController_1.ApiController.WithdrawalSubmit, newRecord).subscribe(function (data) {
            _this.isUpdating = false;
            _this.router.navigate(['/view-withdrawal']);
        });
    };
    CreateWithdrawal.prototype.setSelectedItems = function () {
        var _this = this;
        this.dataSource.forEach(function (selectedItem, i, self) {
            if (_this.selectedItems.find(function (p) { return p.claimCommId === selectedItem.claimCommId; })) {
                self[i].selected = true;
            }
        });
    };
    CreateWithdrawal.prototype.showSelectedItems = function () {
        this.viewSelectedItems = !this.viewSelectedItems;
        if (this.viewSelectedItems) {
            this.oriDataSource = Object.assign(this.oriDataSource, this.dataSource);
            this.dataSource = this.selectedItems;
        }
        else {
            this.dataSource = this.oriDataSource;
        }
    };
    CreateWithdrawal.prototype.filterDataByDate = function () {
        if (!this.searchParams.submittedDate.startDate || !this.searchParams.submittedDate.endDate)
            return;
        this.reloadData();
    };
    CreateWithdrawal.prototype.clearSearchParam = function () {
        this.selectedAgent = null;
        this.searchParams = new search_params_1.SearchWithdrawalToSubmitParams(null, null, this.currentUser.username);
        this.reloadData();
    };
    CreateWithdrawal.prototype.setDefaultSelectedItems = function () {
        var _this = this;
        if (this.defaultSelectedItems.length === 0) {
            var defaultItems = this.dataSource.filter(function (i) { return i.selected === true; });
            defaultItems.forEach(function (item, i, self) {
                _this.defaultSelectedItems.push(item);
            });
        }
    };
    CreateWithdrawal.prototype.updateWithdrawalAmt = function () {
        this.totalSelectedAmount = this.selectedItems.map(function (d) { return d.claimAmount; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalWithdrawalAmt = this.totalSelectedAmount === 0 ? 0 : (this.totalSelectedAmount + this.totalIncentives) - this.totalAmountToDeduct;
        this.allowSubmit = this.totalWithdrawalAmt > 0 ? true : false;
    };
    CreateWithdrawal.prototype.checkAllItemsSelected = function () {
        if (this.dataSource.length === 0)
            return;
        var selectableItems = this.dataSource.filter(function (i) { return i.transactionType === 'Own Sales' || i.transactionType === 'Override'; });
        var selectedItems = selectableItems.filter(function (i) { return i.selected === true; });
        this.selectAllItems = selectableItems.length === selectedItems.length ? true : false;
    };
    CreateWithdrawal = __decorate([
        core_1.Component({
            selector: 'create-withdrawal',
            templateUrl: './create-withdrawal.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, authentication_1.AuthenticationService, broadcast_service_1.BroadcastService, router_1.Router])
    ], CreateWithdrawal);
    return CreateWithdrawal;
}(listEvent_1.ListEvent));
exports.CreateWithdrawal = CreateWithdrawal;
//# sourceMappingURL=create-withdrawal.js.map