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
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("src/app/enums/apiController");
var UserSelect = /** @class */ (function () {
    function UserSelect(el, dataService) {
        this.el = el;
        this.dataService = dataService;
        this.selectOptions = [];
        this.valueChanged = function () { };
        this.disabled = false;
        this.required = false;
        this.loadData();
    }
    UserSelect_1 = UserSelect;
    Object.defineProperty(UserSelect.prototype, "inEditMode", {
        set: function (editing) {
            this.onEdit = editing;
        },
        enumerable: true,
        configurable: true
    });
    UserSelect.prototype.clear = function () {
        this.currentValue = null;
        this.valueChanged(null);
    };
    UserSelect.prototype.writeValue = function (val) {
        this.currentValue = val;
    };
    UserSelect.prototype.registerOnChange = function (fn) {
        this.valueChanged = fn;
    };
    UserSelect.prototype.setChangedValue = function (value) {
        this.valueChanged(value);
    };
    UserSelect.prototype.loadData = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.AdminAccess + "/GetAllUsers").subscribe(function (data) {
            _this.selectOptions = data;
        });
    };
    UserSelect.prototype.registerOnTouched = function () { };
    UserSelect.prototype.setDisabledState = function () { };
    var UserSelect_1;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UserSelect.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], UserSelect.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UserSelect.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UserSelect.prototype, "required", void 0);
    __decorate([
        core_1.Input("onEdit"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], UserSelect.prototype, "inEditMode", null);
    UserSelect = UserSelect_1 = __decorate([
        core_1.Component({
            selector: 'user-select',
            template: "<select name=\"{{id}}\" class=\"form-control\" [ngClass]=\"{'read-only':!onEdit}\" [disabled]=\"disabled\" [required]=\"required\" [(ngModel)]=\"currentValue\" (ngModelChange)=\"setChangedValue($event)\">\n        <option [ngValue]=\"null\"></option>\n        <option *ngFor=\"let option of selectOptions\" [ngValue]=\"option.fullname\">{{option.fullname}}</option>\n    </select>",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return UserSelect_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, data_service_1.DataService])
    ], UserSelect);
    return UserSelect;
}());
exports.UserSelect = UserSelect;
//# sourceMappingURL=user-select.js.map