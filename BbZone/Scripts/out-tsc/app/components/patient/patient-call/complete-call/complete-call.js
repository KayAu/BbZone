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
var apiController_1 = require("src/app/enums/apiController");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var form_submit_1 = require("src/app/model/form-submit");
var CompleteCall = /** @class */ (function (_super) {
    __extends(CompleteCall, _super);
    function CompleteCall(loaderService, dataService, formEvent) {
        var _this = _super.call(this) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.formEvent = formEvent;
        _this.completeCallMapper = [];
        //@ViewChild(NgForm) form;
        _this.onCompleted = new core_1.EventEmitter();
        _this.onEdit = true;
        return _this;
    }
    Object.defineProperty(CompleteCall.prototype, "callRecord", {
        set: function (callObj) {
            this.callLog = callObj;
        },
        enumerable: true,
        configurable: true
    });
    CompleteCall.prototype.ngOnInit = function () {
        this.completeCallMapper = question_set_1.CompleteCallPoll.questionaires.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required, null, o.options, o.minValue); });
    };
    CompleteCall.prototype.update = function (form) {
        var _this = this;
        this.formEvent.notify(new form_submit_1.FormSubmit(form, "callCompleteForm"));
        if (!form.valid)
            return;
        this.dataService.update(apiController_1.ApiController.PatientCall + "/CompleteCall", this.callLog.callId, this.callLog).subscribe(function (data) {
            _this.onCompleted.emit();
        });
    };
    CompleteCall.prototype.verifyCallResolution = function () {
        var resNotReqFollowUp = ["patient deceased", "patient declined services", "wrong/bad phone number", "explanted - patient does not have any abbott devices"];
        var followUpNotReq = resNotReqFollowUp.includes(this.callLog.callRes.trim().toLowerCase());
        this.callLog.futureFollowUpDate = followUpNotReq ? null : this.getFutureFollowUpDate();
        //this.setFutureFollowUpRequire(!followUpNotReq);
    };
    CompleteCall.prototype.getFutureFollowUpDate = function () {
        var fDate = new Date();
        fDate.setDate(fDate.getDate() + 180);
        return fDate;
    };
    CompleteCall.prototype.setFutureFollowUpRequire = function (isRequired) {
        var foundIndex = this.completeCallMapper.findIndex(function (x) { return x.mapToField == 'futureFollowUpDate'; });
        this.completeCallMapper[foundIndex].required = isRequired;
    };
    CompleteCall.prototype.setEditMode = function (recIndex) { };
    CompleteCall.prototype.create = function () { };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CompleteCall.prototype, "onCompleted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompleteCall.prototype, "onEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CompleteCall.prototype, "callRecord", null);
    CompleteCall = __decorate([
        core_1.Component({
            selector: 'complete-call',
            templateUrl: './complete-call.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService])
    ], CompleteCall);
    return CompleteCall;
}(patientPoll_1.PatientPoll));
exports.CompleteCall = CompleteCall;
//# sourceMappingURL=complete-call.js.map