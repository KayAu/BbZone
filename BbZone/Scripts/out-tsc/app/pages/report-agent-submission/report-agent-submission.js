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
var dataDisplayType_1 = require("src/app/enums/dataDisplayType");
var listEvent_1 = require("src/app/interfaces/listEvent");
var apiController_1 = require("src/app/enums/apiController");
var common_1 = require("@angular/common");
var file_saver_1 = require("file-saver");
var RecordMode_1 = require("src/app/enums/RecordMode");
var authentication_1 = require("src/app/services/authentication");
var router_service_1 = require("src/app/services/router.service");
var date_range_1 = require("../../model/date.range");
var viewReportColumns_1 = require("../../metadata/viewReportColumns");
var ReportAgentSubmission = /** @class */ (function (_super) {
    __extends(ReportAgentSubmission, _super);
    function ReportAgentSubmission(loaderService, dataService, authenticationService, routerExtService) {
        var _this = _super.call(this, loaderService, dataService, "agentLevel", true) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.authenticationService = authenticationService;
        _this.routerExtService = routerExtService;
        _this.dataRowMapper = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.orderFilter = RecordMode_1.OrderFilter;
        _this.searchParams = new date_range_1.DateRange();
        return _this;
    }
    ReportAgentSubmission.prototype.ngOnInit = function () {
        this.controllerName = apiController_1.ApiController.ReportAgentSubmission;
        this.dataRowMapper = this.getTablerowDataMapping();
    };
    ReportAgentSubmission.prototype.getTablerowDataMapping = function () {
        var columnMappings = viewReportColumns_1.ViewAgentSubmissionStatusColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    ReportAgentSubmission.prototype.filterDataByDate = function () {
        if (!this.searchParams.startDate || !this.searchParams.endDate)
            return;
        this.reloadData();
    };
    ReportAgentSubmission.prototype.exportRecords = function () {
        this.dataService.export(apiController_1.ApiController.ReportAgentSubmission + "/Download", this.searchParams).subscribe(function (data) {
            var filename = "reportAgentSubmission_" + common_1.formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US') + ".xlsx";
            var file = new Blob([data], { type: 'application/xlsx' });
            file_saver_1.saveAs(file, filename);
        });
    };
    ReportAgentSubmission.prototype.clearSearchParam = function () {
        this.searchParams = new date_range_1.DateRange();
        this.reloadData();
    };
    ReportAgentSubmission = __decorate([
        core_1.Component({
            selector: 'report-agent-submission',
            templateUrl: './report-agent-submission.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, authentication_1.AuthenticationService, router_service_1.RouterService])
    ], ReportAgentSubmission);
    return ReportAgentSubmission;
}(listEvent_1.ListEvent));
exports.ReportAgentSubmission = ReportAgentSubmission;
//# sourceMappingURL=report-agent-submission.js.map