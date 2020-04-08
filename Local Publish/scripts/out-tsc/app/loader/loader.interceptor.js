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
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var loader_service_1 = require("./loader.service");
var LoaderInterceptor = /** @class */ (function () {
    function LoaderInterceptor(loaderService) {
        this.loaderService = loaderService;
        this.blackListUrl = ['/api/Supplier/Find'];
    }
    LoaderInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        if (!this.isUrlBlacklisted(req.url)) {
            this.showLoader();
        }
        return next.handle(req).pipe(operators_1.tap(function (event) {
            if (event instanceof http_1.HttpResponse) {
                _this.onEnd();
            }
        }, function (err) {
            _this.onEnd();
        }));
    };
    LoaderInterceptor.prototype.onEnd = function () {
        this.hideLoader();
    };
    LoaderInterceptor.prototype.showLoader = function () {
        this.loaderService.show();
    };
    LoaderInterceptor.prototype.hideLoader = function () {
        this.loaderService.hide();
    };
    LoaderInterceptor.prototype.isUrlBlacklisted = function (url) {
        if (this.blackListUrl.some(function (bl) { return bl === url; })) {
            return true;
        }
        else {
            return false;
        }
    };
    LoaderInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [loader_service_1.LoaderService])
    ], LoaderInterceptor);
    return LoaderInterceptor;
}());
exports.LoaderInterceptor = LoaderInterceptor;
//# sourceMappingURL=loader.interceptor.js.map