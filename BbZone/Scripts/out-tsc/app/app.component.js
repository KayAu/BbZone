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
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Start watching for user inactivity.
        this.userIdle.startWatching();
        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(function (count) { return console.log(count); });
        // Start watch when time is up.
        this.userIdle.onTimeout().subscribe(function () {
            return _this.logout();
        });
    };
    AppComponent.prototype.unloadHandler = function (event) {
        localStorage.removeItem('currentUser');
    };
    AppComponent.prototype.onWindowScroll = function () {
        if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
            this.showScroll = true;
        }
        else if (this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
            this.showScroll = false;
        }
    };
    AppComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    };
    AppComponent.prototype.scrollToTop = function () {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    };
    __decorate([
        core_1.ViewChild(nav_menu_component_1.NavMenuComponent),
        __metadata("design:type", nav_menu_component_1.NavMenuComponent)
    ], AppComponent.prototype, "navMenu", void 0);
    __decorate([
        core_1.HostListener('window:unload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "unloadHandler", null);
    __decorate([
        core_1.HostListener('window:scroll', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onWindowScroll", null);
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