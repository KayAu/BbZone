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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var data_service_1 = require("./data.service");
var apiController_1 = require("src/app/enums/apiController");
var core_2 = require("angular2-cookie/core");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(dataService, cookieService) {
        this.dataService = dataService;
        this.cookieService = cookieService;
        var currentUser = this.cookieService.get('currentUser') !== undefined ? JSON.parse(this.cookieService.get('currentUser')) : null;
        this.currentUserSubject = new rxjs_1.BehaviorSubject(currentUser);
        this.currentUser = this.currentUserSubject.asObservable();
        //this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
        //this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (loginuser) {
        var _this = this;
        return this.dataService.login(apiController_1.ApiController.Token, loginuser.username, loginuser.password, loginuser.isAdmin).pipe(operators_1.map(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.isAuthenticated) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                _this.cookieService.put('currentUser', JSON.stringify(user));
                _this.currentUserSubject.next(user);
            }
            return user;
        }));
    };
    AuthenticationService.prototype.updateLogin = function (user) {
        if (user) {
            //localStorage.setItem('currentUser', JSON.stringify(user));
            this.cookieService.put('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
    };
    AuthenticationService.prototype.isCookiesCleared = function () {
        return this.cookieService.get('currentUser') === '' ? true : false;
    };
    AuthenticationService.prototype.clearCookies = function () {
        localStorage.removeItem('viewOrderParams');
        this.cookieService.removeAll();
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        localStorage.removeItem('viewOrderParams');
        this.cookieService.removeAll();
        this.currentUserSubject.next(null);
    };
    AuthenticationService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [data_service_1.DataService, core_2.CookieService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.js.map