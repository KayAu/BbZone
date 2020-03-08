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
var forms_1 = require("@angular/forms");
var data_service_1 = require("../services/data.service");
var forkJoin_1 = require("rxjs/observable/forkJoin");
var patient_search_params_1 = require("src/app/model/patient.search.params");
var listEvent_1 = require("src/app/interfaces/listEvent");
var loader_service_1 = require("src/app/loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var moment = require("moment");
var PatientSelect = /** @class */ (function (_super) {
    __extends(PatientSelect, _super);
    function PatientSelect(el, loaderService, dataService) {
        var _this = _super.call(this, loaderService, dataService, "ImplantDate") || this;
        _this.el = el;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.selectedPatients = [];
        _this.advancedSearch = false;
        _this.propagateChange = function () { };
        _this.disabledSearch = false;
        _this.disabledInProgressCall = false;
        _this.controllerName = apiController_1.ApiController.CallAssignment;
        _this.clearSearchParams();
        return _this;
    }
    PatientSelect_1 = PatientSelect;
    PatientSelect.prototype.ngOnInit = function () {
        this.loadSearchDropdown();
    };
    PatientSelect.prototype.writeValue = function (val) {
        if (!val || val.length === 0) {
            this.dataSource = [];
            this.selectedPatients = [];
            this.clearSearchParams();
        }
        else {
            this.selectedPatients = val;
        }
        this.showSelectedPatients();
    };
    PatientSelect.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    PatientSelect.prototype.selectPatient = function (selectedIdx) {
        var patient = this.dataSource[selectedIdx];
        if (patient.selected && !this.selectedPatients.some(function (p) { return p.patientKey === patient.patientKey; })) {
            this.selectedPatients.push(patient);
        }
        //else {
        //    let index = this.selectedPatients.findIndex(x => x === patient.patientKey);
        //    this.selectedPatients.splice(index, 1);
        //}
        this.propagateChange(this.selectedPatients);
    };
    PatientSelect.prototype.findPatient = function (event) {
        if (event)
            event.preventDefault();
        if (this.searchParamsAreEmpty())
            return;
        this.displaySearchItem();
    };
    PatientSelect.prototype.clearSearchParams = function () {
        this.searchParams = new patient_search_params_1.PatientSearchParams('', '', '', '', '', '', '', '');
    };
    PatientSelect.prototype.showMore = function () {
        this.advancedSearch = !this.advancedSearch;
    };
    PatientSelect.prototype.showSelectedPatients = function () {
        this.setListDisplay({ displayData: this.selectedPatients, totalRecords: this.selectedPatients.length });
    };
    PatientSelect.prototype.totalPatientsSelected = function () {
        return this.selectedPatients.filter(function (p) { return p.selected; }).length;
    };
    PatientSelect.prototype.setDefaultSearchField = function () {
        var dtTo = moment().format('YYYYY-MM-DD');
        var dtFrom = moment().subtract(1, 'years').format('YYYYY-MM-DD');
        this.searchParams = new patient_search_params_1.PatientSearchParams('', '', '', '', dtFrom, dtTo, '', '');
    };
    PatientSelect.prototype.loadSearchDropdown = function () {
        var _this = this;
        forkJoin_1.forkJoin([this.dataService.getListData('Patient/GetStates'),
            this.dataService.getListData('Patient/GetDevices'),
            this.dataService.getListData('Patient/GetSalesRegion')]).subscribe(function (results) {
            _this.states = results[0];
            _this.devices = results[1];
            _this.salesRegion = results[2];
        });
    };
    PatientSelect.prototype.searchParamsAreEmpty = function () {
        var _this = this;
        if (!this.advancedSearch && this.searchParams.keyword === '') {
            return true;
        }
        if (this.advancedSearch && Object.keys(this.searchParams).filter(function (p) { return p !== 'keyword'; }).every(function (p) { return (_this.searchParams[p] === null || _this.searchParams[p] === ''); })) {
            return true;
        }
        return false;
    };
    PatientSelect.prototype.registerOnTouched = function () { };
    PatientSelect.prototype.setDisabledState = function () { };
    var PatientSelect_1;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PatientSelect.prototype, "propagateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PatientSelect.prototype, "disabledSearch", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PatientSelect.prototype, "disabledInProgressCall", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PatientSelect.prototype, "dataMapping", void 0);
    PatientSelect = PatientSelect_1 = __decorate([
        core_1.Component({
            selector: 'patient-select',
            templateUrl: './patient-select.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return PatientSelect_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, loader_service_1.LoaderService, data_service_1.DataService])
    ], PatientSelect);
    return PatientSelect;
}(listEvent_1.ListEvent));
exports.PatientSelect = PatientSelect;
//# sourceMappingURL=patient-select.js.map