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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var BackButton = /** @class */ (function () {
    function BackButton(location, router) {
        this.location = location;
        this.router = router;
    }
    BackButton.prototype.backToPrev = function () {
        if (this.location.path) {
            this.location.back();
        }
        //else {
        //    this.router.navigate(['/']);
        //}
    };
    BackButton = __decorate([
        core_1.Component({
            selector: 'back-button',
            template: "<button type=\"button\" class=\"btn btn-default mrg10L\" (click)=\"backToPrev()\">Cancel</button>"
        }),
        __metadata("design:paramtypes", [common_1.Location, router_1.Router])
    ], BackButton);
    return BackButton;
}());
exports.BackButton = BackButton;
//# sourceMappingURL=back-button.js.map