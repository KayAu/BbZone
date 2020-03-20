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
var router_1 = require("@angular/router");
var authentication_1 = require("./services/authentication");
var angular_user_idle_1 = require("angular-user-idle");
var nav_menu_component_1 = require("./nav-menu/nav-menu.component");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, authenticationService, userIdle) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userIdle = userIdle;
        this.showScrollHeight = 300;
        this.hideScrollHeight = 10;
        this.authenticationService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
    }
    AppComponent.prototype.unloadHandler = function (event) {
        localStorage.removeItem('currentUser');
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
    };
    __decorate([
        core_1.ViewChild('navMenu'),
        __metadata("design:type", nav_menu_component_1.NavMenuComponent)
    ], AppComponent.prototype, "navMenu", void 0);
    __decorate([
        core_1.HostListener('window:unload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "unloadHandler", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            authentication_1.AuthenticationService,
            angular_user_idle_1.UserIdleService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map