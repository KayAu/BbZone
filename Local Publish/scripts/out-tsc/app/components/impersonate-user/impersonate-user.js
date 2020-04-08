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
var apiController_1 = require("../../enums/apiController");
var authentication_1 = require("../../services/authentication");
var router_1 = require("@angular/router");
var ImpersonateUser = /** @class */ (function () {
    function ImpersonateUser(dataService, authenticationService, router) {
        this.dataService = dataService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.users = [];
        this.impersonating = false;
        this.impersonated = false;
        this.showMenu = false;
    }
    ImpersonateUser.prototype.ngOnInit = function () {
        this.loadExisitingUsers();
    };
    ImpersonateUser.prototype.impersonate = function () {
        var _this = this;
        this.impersonating = true;
        this.dataService.getAll(apiController_1.ApiController.Impersonation + "/Impersonate/" + this.impersonateUser).subscribe(function (userDetails) {
            _this.impersonated = true;
            _this.impersonating = false;
            _this.resetApp(userDetails);
        });
    };
    ImpersonateUser.prototype.displayDropdown = function () {
        this.showMenu = !this.showMenu;
    };
    ImpersonateUser.prototype.stopImpersonate = function () {
        var _this = this;
        this.dataService.getAll(apiController_1.ApiController.Impersonation + "/StopImpersonate").subscribe(function (userDetails) {
            _this.impersonated = false;
            _this.resetApp(userDetails);
        });
    };
    ImpersonateUser.prototype.loadExisitingUsers = function () {
        var _this = this;
        this.dataService.getAll(apiController_1.ApiController.Impersonation + "/LoadUsers").subscribe(function (data) {
            _this.users = data;
        });
    };
    ImpersonateUser.prototype.resetApp = function (userDetails) {
        //this.authenticationService.updateLogin(userDetails);
        //this.displayDropdown();
        //this.router.navigate(['/']);
    };
    ImpersonateUser = __decorate([
        core_1.Component({
            selector: 'impersonate-user',
            templateUrl: './impersonate-user.html',
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, authentication_1.AuthenticationService, router_1.Router])
    ], ImpersonateUser);
    return ImpersonateUser;
}());
exports.ImpersonateUser = ImpersonateUser;
//# sourceMappingURL=impersonate-user.js.map