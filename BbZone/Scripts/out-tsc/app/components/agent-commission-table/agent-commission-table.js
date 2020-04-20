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
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var forms_1 = require("@angular/forms");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var form_submit_1 = require("src/app/model/form-submit");
var authentication_1 = require("src/app/services/authentication");
var AgentCommissionTable = /** @class */ (function () {
    function AgentCommissionTable(loaderService, dataService, formEvent, authenticationService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.authenticationService = authenticationService;
        this.dataSource = [];
        this.dataColumns = [];
        this.commissionSettings = [];
        this.editedRecord = {};
        this.displayType = dataDisplayType_1.CommissionTableDisplay;
        this.isUpdating = false;
        this.hideColumns = [];
        this.rowItemClicked = new core_1.EventEmitter();
    }
    AgentCommissionTable.prototype.ngOnInit = function () {
        this.currentUser = this.authenticationService.currentUserValue;
    };
    AgentCommissionTable.prototype.loadMyAgentsCommission = function (productId) {
        var _this = this;
        this.productId = productId;
        this.tableDisplay = dataDisplayType_1.CommissionTableDisplay.allAgents;
        this.dataService.get(apiController_1.ApiController.Commission + "/GetMyAgentsCommission", productId).subscribe(function (results) {
            _this.dataSource = results;
            _this.setColumnNames();
            _this.disableRowEdit();
        });
    };
    AgentCommissionTable.prototype.loadCurrentAgentCommission = function (agentId, productId) {
        var _this = this;
        this.productId = productId;
        this.agentId = agentId;
        this.tableDisplay = dataDisplayType_1.CommissionTableDisplay.currentAgent;
        this.dataService.get(apiController_1.ApiController.Commission + "/GetMyCommission/" + agentId + "/" + productId).subscribe(function (results) {
            _this.commissionSettings = results;
        });
    };
    AgentCommissionTable.prototype.getRowData = function (row) {
        return Object.values(row);
    };
    AgentCommissionTable.prototype.editRow = function (rowIndex) {
        var _this = this;
        this.agentId = this.dataSource[rowIndex].agentId;
        this.dataService.getAll(apiController_1.ApiController.Commission + "/GetAgentCommissionSettings/" + this.agentId + "/" + this.productId).subscribe(function (results) {
            _this.hideEditingRow();
            _this.dataSource[rowIndex].onEdit = true;
            _this.commissionSettings = results;
        });
    };
    AgentCommissionTable.prototype.updateRow = function (rowIndex) {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, 'dataForm'));
        if (!this.form.valid)
            return;
        this.dataService.update(apiController_1.ApiController.Commission, this.agentId, this.commissionSettings).subscribe(function (data) {
            var propertyNames = Object.keys(_this.dataSource[rowIndex]);
            for (var itemNo = 0; itemNo < _this.commissionSettings.length; itemNo++) {
                var propertyName = propertyNames[itemNo + 2];
                _this.dataSource[rowIndex][propertyName] = _this.commissionSettings[itemNo].agentCommissionPer;
            }
            _this.dataSource[rowIndex].onEdit = false;
        });
    };
    AgentCommissionTable.prototype.updateTable = function () {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, 'dataForm'));
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        this.dataService.update(apiController_1.ApiController.Commission, this.agentId, this.commissionSettings).subscribe(function (data) {
            _this.isUpdating = false;
        });
    };
    AgentCommissionTable.prototype.cancelEdit = function (rowIndex) {
        this.dataSource[rowIndex].onEdit = false;
        this.commissionSettings = [];
    };
    AgentCommissionTable.prototype.disableRowEdit = function () {
        this.dataSource.forEach(function (element, index, array) {
            var nullComms = Object.values(array[index]).filter(function (o) { return o === null; }).length;
            array[index].disabledEdit = nullComms === Object.keys(array[index]).length - 2 ? true : false;
        });
    };
    AgentCommissionTable.prototype.hideEditingRow = function () {
        this.dataSource.forEach(function (element, index, array) {
            array[index].onEdit = false;
        });
    };
    AgentCommissionTable.prototype.setColumnNames = function () {
        var _this = this;
        if (this.dataSource.length === 0)
            return;
        var dataKeys = Object.keys(this.dataSource[0]);
        // get columns which are not visible only
        dataKeys = dataKeys.filter(function (key, index) { return !_this.hideColumns.includes(index); });
        this.dataColumns = dataKeys.map(function (data) { return data.replace(/([a-z])([A-Z])/g, '$1 $2'); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AgentCommissionTable.prototype, "itemKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AgentCommissionTable.prototype, "hideColumns", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AgentCommissionTable.prototype, "rowItemClicked", void 0);
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], AgentCommissionTable.prototype, "form", void 0);
    AgentCommissionTable = __decorate([
        core_1.Component({
            selector: 'agent-commission-table',
            templateUrl: './agent-commission-table.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, authentication_1.AuthenticationService])
    ], AgentCommissionTable);
    return AgentCommissionTable;
}());
exports.AgentCommissionTable = AgentCommissionTable;
//# sourceMappingURL=agent-commission-table.js.map