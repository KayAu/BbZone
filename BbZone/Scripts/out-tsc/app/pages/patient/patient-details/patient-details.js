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
var apiControllerName = 'Patient';
var PatientDetails = /** @class */ (function (_super) {
    __extends(PatientDetails, _super);
    function PatientDetails(loaderService, dataService) {
        var _this = _super.call(this) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.questionsMapper = question_set_1.PatientDetailsPoll.questionares.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required); });
        return _this;
    }
    Object.defineProperty(PatientDetails.prototype, "dataSource", {
        set: function (data) {
            this.patient = data;
        },
        enumerable: true,
        configurable: true
    });
    PatientDetails.prototype.setEditMode = function () {
        this.patient.onEdit = this.patient.onEdit ? !this.patient.onEdit : true;
    };
    PatientDetails.prototype.update = function () {
        var _this = this;
        this.patient.isUpdating = true;
        this.dataService.update(apiControllerName, this.patient.id, this.patient).subscribe(function (data) {
            _this.patient.onEdit = false;
            _this.patient.isUpdating = false;
        });
    };
    PatientDetails.prototype.create = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PatientDetails.prototype, "dataSource", null);
    PatientDetails = __decorate([
        core_1.Component({
            selector: 'patient-details',
            templateUrl: './patient-details.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], PatientDetails);
    return PatientDetails;
}(patientPoll_1.PatientPoll));
exports.PatientDetails = PatientDetails;
//# sourceMappingURL=patient-details.js.map