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
var broadcast_service_1 = require("src/app/services/broadcast.service");
var data_service_1 = require("src/app/services/data.service");
var rxjs_1 = require("rxjs");
var apiController_1 = require("src/app/enums/apiController");
var SuperiorField = /** @class */ (function () {
    function SuperiorField(el, formEvent, dataService) {
        this.el = el;
        this.formEvent = formEvent;
        this.dataService = dataService;
        //@Input() isAdmin: boolean;
        this.propagateChange = function () { };
        this.searchFieldInput = new rxjs_1.Subject();
        this.agents = [];
    }
    SuperiorField_1 = SuperiorField;
    SuperiorField.prototype.ngOnInit = function () {
        var _this = this;
        this.searchFieldInput.asObservable().debounceTime(500).distinctUntilChanged().subscribe(function (data) { return _this.search(data); });
    };
    SuperiorField.prototype.writeValue = function (val) {
        this.data = val;
    };
    SuperiorField.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SuperiorField.prototype.setChanges = function () {
        this.propagateChange(this.data);
    };
    SuperiorField.prototype.onSearchInputChanged = function (keyword) {
        this.searchFieldInput.next(keyword);
    };
    SuperiorField.prototype.selectItem = function (agent) {
        this.displayText = agent.agentId + " - " + agent.fullname;
        this.data = agent.agentId;
        this.setChanges();
        this.agents = [];
    };
    SuperiorField.prototype.clearDisplayText = function () {
        this.displayText = null;
        this.data = null;
        this.setChanges();
    };
    SuperiorField.prototype.search = function (keyword) {
        var _this = this;
        var thisElement = $(this.el.nativeElement);
        if (!keyword)
            this.clearErrorMessages(thisElement);
        this.dataService.get(apiController_1.ApiController.Agent + "/GetAgents/", keyword).subscribe(function (results) {
            if (results) {
                _this.agents = results;
            }
        });
    };
    SuperiorField.prototype.clearErrorMessages = function (thisElement) {
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        this.parentForm.controls[this.fieldId].setErrors(null);
        thisElement.next().remove();
    };
    SuperiorField.prototype.registerOnTouched = function () { };
    SuperiorField.prototype.setDisabledState = function () { };
    var SuperiorField_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SuperiorField.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.NgForm)
    ], SuperiorField.prototype, "parentForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SuperiorField.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SuperiorField.prototype, "displayText", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SuperiorField.prototype, "propagateChange", void 0);
    SuperiorField = SuperiorField_1 = __decorate([
        core_1.Component({
            selector: 'superior-field',
            templateUrl: './superior-field.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return SuperiorField_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            broadcast_service_1.BroadcastService,
            data_service_1.DataService])
    ], SuperiorField);
    return SuperiorField;
}());
exports.SuperiorField = SuperiorField;
//# sourceMappingURL=superior-field.js.map