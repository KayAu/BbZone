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
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("src/app/loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var grid_data_1 = require("src/app/model/grid-data");
var authentication_1 = require("src/app/services/authentication");
var listEvent_1 = require("src/app/interfaces/listEvent");
var PatientAssigned = /** @class */ (function (_super) {
    __extends(PatientAssigned, _super);
    function PatientAssigned(loaderService, dataService, authenticationService) {
        var _this = _super.call(this, loaderService, dataService, "TaskDate") || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.authenticationService = authenticationService;
        _this.controllerName = apiController_1.ApiController.CallAgent + "/GetAssociatePatients";
        _this.dataFieldMapper = grid_data_1.UpdateAssignedPatient.gridData.map(function (o) { return new grid_data_1.GridDataMapping(o.headerName, o.fieldname, o.headerCss, o.displayAsBadge, o.sortable); });
        return _this;
    }
    PatientAssigned.prototype.ngOnInit = function () {
        this.searchParams = this.authenticationService.currentUserValue.username;
        this.loadDataList();
    };
    PatientAssigned = __decorate([
        core_1.Component({
            selector: 'patient-assigned',
            templateUrl: './patient-assigned.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, authentication_1.AuthenticationService])
    ], PatientAssigned);
    return PatientAssigned;
}(listEvent_1.ListEvent));
exports.PatientAssigned = PatientAssigned;
//# sourceMappingURL=patient-assigned.js.map