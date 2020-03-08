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
var router_1 = require("@angular/router");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var patient_call_history_1 = require("src/app/components/patient/patient-call-history/patient-call-history");
var ngx_toastr_1 = require("ngx-toastr");
var authentication_1 = require("src/app/services/authentication");
var Patient = /** @class */ (function () {
    function Patient(loaderService, dataService, route, toastr, authenticationService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.route = route;
        this.toastr = toastr;
        this.authenticationService = authenticationService;
        this.devices = [];
        this.hidePatientCallUpdate = true;
        this.allowEdit = false;
        this.patientKey = this.route.snapshot.params.patientkey;
        this.currentUser = this.authenticationService.currentUserValue;
    }
    Patient.prototype.ngOnInit = function () {
        this.loadPatientData();
    };
    Patient.prototype.showCallHistory = function () {
        this.patientDetails = null;
        this.patient.assignedToCall = false;
        this.hidePatientCallUpdate = true;
        this.callHistory.loadCallHistory();
        this.toastr.success('The patient call task has been completed successfully', 'Patient Call Completed', { positionClass: 'toast-bottom-full-width' });
        $('a[href="#call-history"]').parent().addClass('active');
        $('#call-history').addClass('active');
    };
    Patient.prototype.showPatientDetails = function (data) {
        this.patientDetails = data;
    };
    Patient.prototype.loadPatientData = function () {
        var _this = this;
        this.dataService.getListData("Patient/GetPatientDetails/" + this.patientKey).subscribe(function (data) {
            _this.patient = data.patient;
            _this.devices = data.devices;
            if (_this.patient.assignedToCall) { // && this.patient.callAgentAcc === this.currentUser.username
                _this.hidePatientCallUpdate = false;
                _this.allowEdit = _this.patient.callAgentAcc === _this.currentUser.username;
            }
        });
    };
    __decorate([
        core_1.ViewChild(patient_call_history_1.PatientCallHistory),
        __metadata("design:type", patient_call_history_1.PatientCallHistory)
    ], Patient.prototype, "callHistory", void 0);
    Patient = __decorate([
        core_1.Component({
            selector: 'patient',
            templateUrl: './patient.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, router_1.ActivatedRoute, ngx_toastr_1.ToastrService,
            authentication_1.AuthenticationService])
    ], Patient);
    return Patient;
}());
exports.Patient = Patient;
//# sourceMappingURL=patient.js.map