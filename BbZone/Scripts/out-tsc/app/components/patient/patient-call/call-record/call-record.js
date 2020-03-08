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
var data_service_1 = require("../../../../services/data.service");
var loader_service_1 = require("../../../../loader/loader.service");
var question_set_1 = require("../../../../model/question-set");
var patientPoll_1 = require("../../../../interfaces/patientPoll");
var TypeOfCall_1 = require("../../../../enums/TypeOfCall");
var apiController_1 = require("src/app/enums/apiController");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var form_submit_1 = require("src/app/model/form-submit");
var CallRecord = /** @class */ (function (_super) {
    __extends(CallRecord, _super);
    function CallRecord(loaderService, dataService, formEvent) {
        var _this = _super.call(this) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.formEvent = formEvent;
        _this.callType = TypeOfCall_1.TypeOfCall;
        _this.formAction = TypeOfCall_1.FormAction;
        _this.initialCallMapper = [];
        _this.patientCallOutcomeMapper = [];
        _this.followUpCallMapper = [];
        _this.onUpdated = new core_1.EventEmitter();
        _this.onLoaded = new core_1.EventEmitter();
        _this.onEdit = true;
        return _this;
    }
    Object.defineProperty(CallRecord.prototype, "callRecordId", {
        set: function (callId) {
            this.loadCallById(callId);
        },
        enumerable: true,
        configurable: true
    });
    CallRecord.prototype.ngOnInit = function () {
        this.initialCallMapper = question_set_1.InitialCallPoll.questionaires.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required, o.maxLength, o.options); });
        this.followUpCallMapper = question_set_1.FollowUpCallPoll.questionaires.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required, o.maxLength, o.options); });
        this.patientCallOutcomeMapper = question_set_1.PatientCallOutcomePoll.questionaires.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required, o.maxLength); });
    };
    CallRecord.prototype.update = function (form) {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(form, "callRecordForm"));
        if (!form.valid)
            return;
        this.callLog.isUpdating = true;
        this.dataService.update(apiController_1.ApiController.PatientCall + "/Update", this.callLog.callId, this.callLog).subscribe(function (newData) {
            _this.callLog.isUpdating = false;
            _this.onUpdated.emit(_this.callLog);
        });
    };
    CallRecord.prototype.create = function () { };
    CallRecord.prototype.setEditMode = function () { };
    CallRecord.prototype.loadCallById = function (callId) {
        var _this = this;
        if (!callId)
            return;
        this.dataService.getListData(apiController_1.ApiController.PatientCall + "/GetCallById/" + callId).subscribe(function (data) {
            _this.callLog = data;
            _this.onLoaded.emit(_this.callLog);
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CallRecord.prototype, "onUpdated", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CallRecord.prototype, "onLoaded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CallRecord.prototype, "onEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CallRecord.prototype, "callRecordId", null);
    CallRecord = __decorate([
        core_1.Component({
            selector: 'call-record',
            templateUrl: './call-record.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService])
    ], CallRecord);
    return CallRecord;
}(patientPoll_1.PatientPoll));
exports.CallRecord = CallRecord;
//# sourceMappingURL=call-record.js.map