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
var broadcast_service_1 = require("src/app/services/broadcast.service");
var authentication_1 = require("src/app/services/authentication");
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("src/app/enums/apiController");
var form_submit_1 = require("src/app/model/form-submit");
var ngx_toastr_1 = require("ngx-toastr");
var EditPassword = /** @class */ (function () {
    function EditPassword(loaderService, dataService, formEvent, authenticationService, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.authenticationService = authenticationService;
        this.toastr = toastr;
        this.invalidOldPassword = false;
        this.isUpdating = false;
        this.passwordFields = { oldPassword: null, newPassword: null, confirmPassword: null };
    }
    EditPassword.prototype.ngOnInit = function () {
        this.currentUser = this.authenticationService.currentUserValue;
    };
    EditPassword.prototype.submit = function () {
        this.formEvent.notify(new form_submit_1.FormSubmit(this.form, 'dataForm'));
        if (!this.form.valid)
            return;
        if (!this.currentUser.isAdmin) {
            this.updatePassword(apiController_1.ApiController.User + "/UpdateAgentPassword", this.currentUser.agentId);
        }
        else {
            this.updatePassword(apiController_1.ApiController.User + "/UpdateAdminPassword", this.currentUser.username);
        }
    };
    EditPassword.prototype.updatePassword = function (url, userId) {
        var _this = this;
        this.isUpdating = true;
        this.dataService.update(url, userId, this.passwordFields).subscribe(function (isValid) {
            if (isValid) {
                _this.toastr.success('The new password is updated successfully', 'Password Updated', { positionClass: 'toast-bottom-full-width' });
            }
            _this.invalidOldPassword = !isValid;
            _this.isUpdating = false;
        });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], EditPassword.prototype, "form", void 0);
    EditPassword = __decorate([
        core_1.Component({
            selector: 'edit-password',
            templateUrl: './edit-password.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService,
            data_service_1.DataService,
            broadcast_service_1.BroadcastService,
            authentication_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], EditPassword);
    return EditPassword;
}());
exports.EditPassword = EditPassword;
//# sourceMappingURL=edit-password.js.map