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
var data_service_1 = require("src/app/services/data.service");
var PatientCall = /** @class */ (function () {
    function PatientCall(dataService) {
        this.dataService = dataService;
        this.callCompleted = new core_1.EventEmitter();
        this.callDetailsLoaded = new core_1.EventEmitter();
        this.callRecordId = 0;
        this.allowEdit = true;
        this.initCallCompleted = false;
    }
    PatientCall.prototype.callRecordUpdated = function (patientCall) {
        this.callRecord = Object.assign({}, patientCall);
        this.initCallCompleted = patientCall.initCallCompleted;
    };
    PatientCall.prototype.callRecordLoaded = function (patientCall) {
        this.callRecord = Object.assign({}, patientCall);
        this.initCallCompleted = patientCall.initCallCompleted;
        this.callDetailsLoaded.emit(this.callRecord);
    };
    PatientCall.prototype.callClosed = function () {
        this.callCompleted.emit();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PatientCall.prototype, "callCompleted", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PatientCall.prototype, "callDetailsLoaded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PatientCall.prototype, "callRecordId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PatientCall.prototype, "allowEdit", void 0);
    PatientCall = __decorate([
        core_1.Component({
            selector: 'patient-call',
            template: "<mat-horizontal-stepper [linear]=\"false\" #stepper>\n\n                    <mat-step label=\"Call Record\" state=\"deviceInspection\" [optional]=\"isOptional\">\n                        <device-inspection [callRecordId]=\"callRecordId\" [onEdit]=\"allowEdit\"></device-inspection>\n                    </mat-step>\n                    <mat-step label=\"Call Outcome\" state=\"callRecord\">\n                        <call-record [callRecordId]=\"callRecordId\" [onEdit]=\"allowEdit\" (onLoaded)=\"callRecordLoaded($event)\" (onUpdated)=\"callRecordUpdated($event)\"></call-record>\n                    </mat-step>\n                    <mat-step label=\"Complete\" state=\"complete\">\n                        <div class=\"alert alert-danger  alert-dismissible\" *ngIf=\"!initCallCompleted; else completeCall\">\n                            <h4><i class=\"icon fa fa-warning\"></i> Alert!</h4>\n                            You must complete the call outcome prior to completing the action.\n                        </div>\n                        <ng-template #completeCall>\n                            <complete-call [callRecord]=\"callRecord\" [onEdit]=\"allowEdit\" (onCompleted)=\"callClosed()\"></complete-call>\n                        </ng-template>\n                    </mat-step>\n                    <ng-template matStepperIcon=\"deviceInspection\">\n                        <mat-icon>view_list</mat-icon>\n                    </ng-template>\n                    <ng-template matStepperIcon=\"callRecord\">\n                        <mat-icon>phone_in_talk</mat-icon>\n                    </ng-template>\n                    <ng-template matStepperIcon=\"complete\">\n                        <mat-icon>check</mat-icon>\n                    </ng-template>\n                </mat-horizontal-stepper>"
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], PatientCall);
    return PatientCall;
}());
exports.PatientCall = PatientCall;
//# sourceMappingURL=patient-call.js.map