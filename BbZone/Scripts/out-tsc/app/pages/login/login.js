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
var router_1 = require("@angular/router");
var authentication_1 = require("src/app/services/authentication");
var login_user_1 = require("src/app/model/login-user");
var Login = /** @class */ (function () {
    function Login(loaderService, formSubmission, route, router, authenticationService) {
        this.loaderService = loaderService;
        this.formSubmission = formSubmission;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.error = '';
    }
    Login.prototype.ngOnInit = function () {
        this.user = new login_user_1.LoginUser();
        //this.user.isAdmin = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    };
    Login.prototype.login = function () {
        var _this = this;
        if (this.loginForm.invalid) {
            return;
        }
        this.authenticationService.login(this.user).subscribe(function (user) {
            if (user.isAuthenticated) {
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this.error = "Login Failed. You do not have the permission to login to the system";
            }
        });
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", Object)
    ], Login.prototype, "loginForm", void 0);
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService,
            broadcast_service_1.BroadcastService,
            router_1.ActivatedRoute,
            router_1.Router,
            authentication_1.AuthenticationService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map