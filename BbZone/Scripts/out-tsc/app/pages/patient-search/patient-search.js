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
var sort_model_1 = require("../../model/sort.model");
var loader_service_1 = require("../../loader/loader.service");
var forkJoin_1 = require("rxjs/observable/forkJoin");
var patient_search_params_1 = require("src/app/model/patient.search.params");
var listEvent_1 = require("src/app/interfaces/listEvent");
var apiController_1 = require("src/app/enums/apiController");
var PatientSearch = /** @class */ (function (_super) {
    __extends(PatientSearch, _super);
    function PatientSearch(loaderService, dataService) {
        var _this = _super.call(this, loaderService, dataService, "ImplantDate") || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.defaultSortField = "Fullname";
        _this.states = [];
        _this.callAgents = [];
        _this.patients = [];
        _this.controllerName = apiController_1.ApiController.Patient;
        _this.searchParams = new patient_search_params_1.PatientSearchParams('', '', '', '', null, null, '', '', null, null);
        return _this;
    }
    PatientSearch.prototype.ngOnInit = function () {
        this.sortBy = new sort_model_1.Sort(this.defaultSortField, true);
        this.loadSearchDropdown();
    };
    PatientSearch.prototype.search = function () {
        if (this.searchParamsAreEmpty())
            return;
        this.displaySearchItem();
    };
    PatientSearch.prototype.clearSearchParams = function () {
        this.searchParams = new patient_search_params_1.PatientSearchParams('', '', '', '', null, null, '', '', null, null);
    };
    PatientSearch.prototype.loadSearchDropdown = function () {
        var _this = this;
        forkJoin_1.forkJoin([this.dataService.getListData('Patient/GetStates'), this.dataService.getListData('Patient/GetRegions'), this.dataService.getListData('Patient/GetCallAgents')]).subscribe(function (results) {
            _this.states = results[0];
            _this.regions = results[1];
            _this.callAgents = results[2];
        });
    };
    PatientSearch.prototype.searchParamsAreEmpty = function () {
        if (!this.searchParams.keyword &&
            !this.searchParams.state &&
            !this.searchParams.region &&
            !this.searchParams.callAgent &&
            !this.searchParams.agreeToCall) {
            return true;
        }
        return false;
    };
    PatientSearch = __decorate([
        core_1.Component({
            selector: 'patient-search',
            templateUrl: './patient-search.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], PatientSearch);
    return PatientSearch;
}(listEvent_1.ListEvent));
exports.PatientSearch = PatientSearch;
//# sourceMappingURL=patient-search.js.map