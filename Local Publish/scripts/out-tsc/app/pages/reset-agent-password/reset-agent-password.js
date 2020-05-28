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
var loader_service_1 = require("src/app/loader/loader.service");
var forms_1 = require("@angular/forms");
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("src/app/enums/apiController");
var ngx_toastr_1 = require("ngx-toastr");
var ResetAgentPassword = /** @class */ (function () {
    function ResetAgentPassword(loaderService, dataService, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.toastr = toastr;
        this.isUpdating = false;
        this.passwordFields = { agent: null, newPassword: null };
    }
    ResetAgentPassword.prototype.ngOnInit = function () {
        this.loadAgents();
    };
    ResetAgentPassword.prototype.submit = function () {
        var _this = this;
        this.setControlsAsTouched();
        if (!this.dataForm.valid)
            return;
        this.dataService.add(apiController_1.ApiController.Password + "/ResetPassword", this.passwordFields).subscribe(function (data) {
            _this.toastr.success('The agent password is reset successfully', 'Password Updated', { positionClass: 'toast-bottom-full-width' });
            _this.isUpdating = false;
        });
    };
    ResetAgentPassword.prototype.loadAgents = function () {
        var _this = this;
        this.dataService.getAll(apiController_1.ApiController.Dropdown + "/GetAgents").subscribe(function (results) {
            _this.dropdownItems = results;
        });
    };
    ResetAgentPassword.prototype.setControlsAsTouched = function () {
        for (var i in this.dataForm.controls) {
            this.dataForm.controls[i].markAsTouched();
        }
    };
    ResetAgentPassword.prototype.setControlsAsUnouched = function () {
        for (var i in this.dataForm.controls) {
            this.dataForm.controls[i].markAsUntouched();
        }
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], ResetAgentPassword.prototype, "dataForm", void 0);
    ResetAgentPassword = __decorate([
        core_1.Component({
            selector: 'reset-agent-password',
            templateUrl: './reset-agent-password.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService,
            data_service_1.DataService,
            ngx_toastr_1.ToastrService])
    ], ResetAgentPassword);
    return ResetAgentPassword;
}());
exports.ResetAgentPassword = ResetAgentPassword;
//# sourceMappingURL=reset-agent-password.js.map