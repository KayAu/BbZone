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
var agentChargesColumns_1 = require("../../metadata/agentChargesColumns");
var tablerow_data_mapping_1 = require("../../model/tablerow.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var ListDataCrud_1 = require("../../interfaces/ListDataCrud");
var data_field_control_1 = require("../../model/data.field.control");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("../../enums/apiController");
var search_params_1 = require("../../model/search-params");
var AgentChanges = /** @class */ (function (_super) {
    __extends(AgentChanges, _super);
    function AgentChanges(loaderService, dataService) {
        var _this = _super.call(this, loaderService, dataService, "chargeId") || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.dataRowMapper = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.controlType = dataDisplayType_1.ControlType;
        return _this;
    }
    AgentChanges.prototype.ngOnInit = function () {
        this.formName = "tableForm";
        this.controllerName = apiController_1.ApiController.AgentCharges;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new search_params_1.StatusAndKeywordParams(null, null);
        this.initDataRecord(this.dataRowMapper);
    };
    AgentChanges.prototype.getTablerowDataMapping = function () {
        var columnMappings = agentChargesColumns_1.AgentChargesColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null)); });
        return columnMappings;
    };
    AgentChanges = __decorate([
        core_1.Component({
            selector: 'agent-charges',
            templateUrl: './agent-charges.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], AgentChanges);
    return AgentChanges;
}(ListDataCrud_1.ListDataCrud));
exports.AgentChanges = AgentChanges;
//# sourceMappingURL=agent-charges.js.map