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
var forms_1 = require("@angular/forms");
var TypeOfCall_1 = require("../../enums/TypeOfCall");
var question_set_1 = require("src/app/model/question-set");
var CallAttempts = /** @class */ (function () {
    function CallAttempts(el) {
        this.el = el;
        this.attempts = [];
        this.onEdit = false;
        this.propagateChange = function () { };
    }
    CallAttempts_1 = CallAttempts;
    Object.defineProperty(CallAttempts.prototype, "inEditMode", {
        set: function (editing) {
            this.onEdit = !editing ? false : editing;
        },
        enumerable: true,
        configurable: true
    });
    CallAttempts.prototype.ngOnInit = function () {
        if (this.callType == TypeOfCall_1.TypeOfCall.Initial) {
            this.attempts = question_set_1.InitialCallAttempt.questionaires.map(function (q) { return q.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required); }); });
        }
        else {
            this.attempts = question_set_1.FollowUpCallAttempt.questionaires.map(function (q) { return q.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldname, o.controltype, o.required); }); });
        }
    };
    CallAttempts.prototype.writeValue = function (val) {
        //if (val !== undefined && val !== null && val.length > 0) {
        this.callLog = val;
        //}
    };
    CallAttempts.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CallAttempts.prototype.setChanges = function () {
        this.propagateChange(this.callLog);
    };
    CallAttempts.prototype.registerOnTouched = function () { };
    CallAttempts.prototype.setDisabledState = function () { };
    var CallAttempts_1;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CallAttempts.prototype, "propagateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CallAttempts.prototype, "callType", void 0);
    __decorate([
        core_1.Input("onEdit"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], CallAttempts.prototype, "inEditMode", null);
    CallAttempts = CallAttempts_1 = __decorate([
        core_1.Component({
            selector: 'call-attempts',
            templateUrl: './call-attempts.html',
            //providers: [NgModel],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return CallAttempts_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], CallAttempts);
    return CallAttempts;
}());
exports.CallAttempts = CallAttempts;
//# sourceMappingURL=call-attempts.js.map