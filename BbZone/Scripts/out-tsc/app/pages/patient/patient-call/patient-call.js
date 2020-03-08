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
//import { BroadcastService } from '../../../services/broadcast.service';
var loader_service_1 = require("../../../loader/loader.service");
var question_set_1 = require("../../../model/question-set");
var patientPoll_1 = require("../../../interfaces/patientPoll");
var TypeOfCall_1 = require("../../../enums/TypeOfCall");
//import { Subscription } from 'rxjs/Subscription';
var apiControllerName = 'PatientCall';
var PatientCall = /** @class */ (function (_super) {
    __extends(PatientCall, _super);
    function PatientCall(loaderService, dataService) {
        var _this = _super.call(this) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.onEdit = true;
        _this.isUpdating = false;
        _this.initialCallMapper = [];
        _this.followUpCallMapper = [];
        _this.callType = TypeOfCall_1.TypeOfCall;
        return _this;
    }
    PatientCall.prototype.ngOnInit = function () {
        this.initialCallMapper = question_set_1.InitialCallPoll.questionaires.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required); });
        this.followUpCallMapper = question_set_1.FollowUpCallPoll.questionaires.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required); });
        this.loadPatientCall();
    };
    PatientCall.prototype.loadPatientCall = function () {
        var _this = this;
        this.dataService.getListData(apiControllerName + "/Get/" + this.patientKey).subscribe(function (data) {
            _this.callLog = data;
            _this.setEditMode();
        });
    };
    PatientCall.prototype.setEditMode = function () {
        this.onEdit = !this.onEdit;
        this.isUpdating = false;
        this.recordMode = this.callLog.callId === 0 ? TypeOfCall_1.RecordMode.Create : TypeOfCall_1.RecordMode.Edit;
        this.buttonText = this.onEdit ? "Cancel" : this.recordMode;
    };
    //saveRecord() {
    //    if (this.recordMode === RecordMode.Create) {
    //        this.create();
    //    }
    //    else {
    //        this.update();
    //    }ng build
    //}
    PatientCall.prototype.update = function (recIndex) {
        var _this = this;
        this.callLog.isUpdating = true;
        this.dataService.update(apiControllerName, this.callLog.callId, this.callLog).subscribe(function (newData) {
            _this.setEditMode();
        });
    };
    PatientCall.prototype.create = function () {
        var _this = this;
        this.callLog.isUpdating = true;
        this.dataService.add(apiControllerName, this.callLog).subscribe(function (newData) {
            _this.callLog = newData;
            _this.setEditMode();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PatientCall.prototype, "patientKey", void 0);
    PatientCall = __decorate([
        core_1.Component({
            selector: 'patient-call',
            templateUrl: './patient-call.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], PatientCall);
    return PatientCall;
}(patientPoll_1.PatientPoll));
exports.PatientCall = PatientCall;
//# sourceMappingURL=patient-call.js.map