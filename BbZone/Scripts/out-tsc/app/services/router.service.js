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
/** A router wrapper, adding extra functions. */
var RouterService = /** @class */ (function () {
    function RouterService(router) {
        var _this = this;
        this.router = router;
        this.previousUrl = undefined;
        this.currentUrl = undefined;
        this.currentUrl = this.router.url;
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.previousUrl = _this.currentUrl;
                _this.currentUrl = event.url;
            }
            ;
        });
    }
    RouterService.prototype.getPreviousUrl = function () {
        return this.previousUrl;
    };
    RouterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], RouterService);
    return RouterService;
}());
exports.RouterService = RouterService;
//# sourceMappingURL=router.service.js.map