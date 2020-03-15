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
var agentFields_1 = require("src/app/metadata/agentFields");
var AgentMaintenance = /** @class */ (function (_super) {
    __extends(AgentMaintenance, _super);
    function AgentMaintenance(loaderService, dataService, formEvent) {
        var _this = _super.call(this, loaderService, dataService, '', false) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.formEvent = formEvent;
        _this.dataRowMapper = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        return _this;
    }
    AgentMaintenance.prototype.ngOnInit = function () {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new search_params_1.StatusAndKeywordParams(null, null);
        this.keyField = this.dataRowMapper.find(function (d) { return d.keyField === true; }).fieldName;
        this.controllerName = apiController_1.ApiController.Agent;
        //this.loadDropdown();
    };
    AgentMaintenance.prototype.getTablerowDataMapping = function () {
        var columnMappings = agentFields_1.AgentMaintenanceColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.readonly, o.colWidth); });
        return columnMappings;
    };
    AgentMaintenance.prototype.clearSearchParam = function () {
        this.searchParams = new search_params_1.StatusAndKeywordParams(null, null);
        this.reloadData();
    };
    AgentMaintenance = __decorate([
        core_1.Component({
            selector: 'agent-maintenance',
            templateUrl: './agent-maintenance.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService])
    ], AgentMaintenance);
    return AgentMaintenance;
}(listEvent_1.ListEvent));
exports.AgentMaintenance = AgentMaintenance;
//# sourceMappingURL=agent-maintenance.js.map