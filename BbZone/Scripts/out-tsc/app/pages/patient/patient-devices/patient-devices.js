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
var data_service_1 = require("../../../services/data.service");
var loader_service_1 = require("../../../loader/loader.service");
var question_set_1 = require("../../../model/question-set");
var patientPoll_1 = require("../../../interfaces/patientPoll");
var apiControllerName = 'PatientDevice';
var PatientDevices = /** @class */ (function (_super) {
    __extends(PatientDevices, _super);
    function PatientDevices(loaderService, dataService) {
        var _this = _super.call(this) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.devices = [];
        return _this;
    }
    PatientDevices.prototype.ngOnInit = function () {
        this.loadDevices();
    };
    PatientDevices.prototype.setEditMode = function (recIndex) {
        this.devices[recIndex].onEdit = this.devices[recIndex].onEdit ? !this.devices[recIndex].onEdit : true;
    };
    PatientDevices.prototype.update = function (recIndex) {
        var _this = this;
        this.devices[recIndex].isUpdating = true;
        this.dataService.update(apiControllerName, this.devices[recIndex].id, this.devices[recIndex]).subscribe(function (data) {
            _this.devices[recIndex].onEdit = false;
            _this.devices[recIndex].isUpdating = false;
        });
    };
    PatientDevices.prototype.create = function () { };
    PatientDevices.prototype.loadDevices = function () {
        var _this = this;
        this.dataService.getListData(apiControllerName + "/Get/" + this.patientKey).subscribe(function (data) {
            _this.questionsMapper = question_set_1.PatientDevicePoll.questionares.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required); });
            _this.devices = data;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PatientDevices.prototype, "patientKey", void 0);
    PatientDevices = __decorate([
        core_1.Component({
            selector: 'patient-devices',
            templateUrl: './patient-devices.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], PatientDevices);
    return PatientDevices;
}(patientPoll_1.PatientPoll));
exports.PatientDevices = PatientDevices;
//# sourceMappingURL=patient-devices.js.map