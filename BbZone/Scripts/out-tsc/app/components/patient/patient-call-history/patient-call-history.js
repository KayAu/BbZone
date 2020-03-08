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
var data_service_1 = require("../../../services/data.service");
var TypeOfCall_1 = require("../../../enums/TypeOfCall");
var apiController_1 = require("src/app/enums/apiController");
var authentication_1 = require("src/app/services/authentication");
var role_1 = require("src/app/model/role");
var PatientCallHistory = /** @class */ (function () {
    function PatientCallHistory(dataService, authenticationService) {
        this.dataService = dataService;
        this.authenticationService = authenticationService;
        this.callLogs = [];
        this.initialCallMapper = [];
        this.followUpCallMapper = [];
        this.allowAdminEdit = false;
        this.enableEdit = true;
        this.callType = TypeOfCall_1.TypeOfCall;
    }
    PatientCallHistory.prototype.ngOnInit = function () {
        this.loadCallHistory();
    };
    PatientCallHistory.prototype.callRecordLoaded = function (patientCall) {
        this.callRecord = patientCall;
        if (this.enableEdit) {
            this.verifyRecordEdit();
        }
    };
    PatientCallHistory.prototype.verifyRecordEdit = function () {
        this.allowAdminEdit = false;
        if (this.callLogs[this.callLogs.length - 1].dataValue === this.selectedCallId) {
            if (this.authenticationService.currentUserValue.role === role_1.Role.Admin) {
                this.allowAdminEdit = true;
            }
        }
    };
    PatientCallHistory.prototype.loadCallHistory = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.CallHistory + "/Get/" + this.patientKey).subscribe(function (data) {
            _this.callLogs = data;
            if (_this.callLogs.length > 0)
                _this.selectedCallId = _this.callLogs[0].dataValue;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PatientCallHistory.prototype, "patientKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PatientCallHistory.prototype, "enableEdit", void 0);
    PatientCallHistory = __decorate([
        core_1.Component({
            selector: 'patient-call-history',
            templateUrl: './patient-call-history.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, authentication_1.AuthenticationService])
    ], PatientCallHistory);
    return PatientCallHistory;
}());
exports.PatientCallHistory = PatientCallHistory;
//# sourceMappingURL=patient-call-history.js.map