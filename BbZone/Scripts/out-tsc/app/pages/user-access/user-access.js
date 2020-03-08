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
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var apiController_1 = require("src/app/enums/apiController");
var new_user_1 = require("src/app/model/new-user");
var ngx_toastr_1 = require("ngx-toastr");
var forms_1 = require("@angular/forms");
var UserAccess = /** @class */ (function () {
    function UserAccess(loaderService, dataService, formSubmission, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formSubmission = formSubmission;
        this.toastr = toastr;
        this.roles = [];
        this.users = [];
        this.user = new new_user_1.NewUser();
    }
    UserAccess.prototype.ngOnInit = function () {
        this.loadUsers();
        this.loadUserRoles();
    };
    UserAccess.prototype.addUser = function () {
        var _this = this;
        if (this.form.valid) {
            this.dataService.add(apiController_1.ApiController.AdminAccess, this.user).subscribe(function (data) {
                _this.users.unshift(data);
                _this.formReset();
                _this.toastr.success('The new user is updated successfully.', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
            });
        }
    };
    UserAccess.prototype.removeUser = function (userId, rowNo) {
        var _this = this;
        this.dataService.remove(apiController_1.ApiController.AdminAccess, userId).subscribe(function (data) {
            _this.users.splice(rowNo, 1);
        });
    };
    UserAccess.prototype.trackById = function (index, item) {
        return item.userId;
    };
    UserAccess.prototype.updateUserDetails = function (selectedUser) {
        if (!selectedUser)
            return;
        if (!this.userHasExists(selectedUser.account)) {
            this.user.fullname = selectedUser.fullName;
            this.user.loginAcc = selectedUser.account;
            this.fullNameModel.control.setErrors(null);
        }
        else {
            this.fullNameModel.control.setErrors({ 'hasExist': true });
        }
    };
    UserAccess.prototype.loadUserRoles = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.AdminAccess + "/GetUserRoles").subscribe(function (data) {
            _this.roles = data;
        });
    };
    UserAccess.prototype.loadUsers = function () {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.AdminAccess + "/GetAllUsers").subscribe(function (data) {
            _this.users = data;
        });
    };
    UserAccess.prototype.formReset = function () {
        this.user = new new_user_1.NewUser();
        this.selectedUser = null;
    };
    UserAccess.prototype.userHasExists = function (userAcc) {
        return this.users.some(function (e) { return e.loginAcc === userAcc; });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", Object)
    ], UserAccess.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild('fullName'),
        __metadata("design:type", forms_1.NgModel)
    ], UserAccess.prototype, "fullNameModel", void 0);
    UserAccess = __decorate([
        core_1.Component({
            selector: 'user-access',
            templateUrl: './user-access.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, ngx_toastr_1.ToastrService])
    ], UserAccess);
    return UserAccess;
}());
exports.UserAccess = UserAccess;
//# sourceMappingURL=user-access.js.map