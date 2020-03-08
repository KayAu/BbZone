"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormatDatePipe = /** @class */ (function () {
    function FormatDatePipe() {
    }
    FormatDatePipe.prototype.transform = function (date) {
        if (!date)
            return;
        if (date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/g)) {
            date = this.formatDate(date);
        }
        return date;
    };
    FormatDatePipe.prototype.formatDate = function (date) {
        var year = date.slice(0, 4);
        var month = date.slice(5, 7);
        var day = date.slice(8, 10);
        var formattedDate = month + '/' + day + '/' + year;
        return formattedDate;
    };
    FormatDatePipe = __decorate([
        core_1.Pipe({ name: 'formatDate' })
    ], FormatDatePipe);
    return FormatDatePipe;
}());
exports.FormatDatePipe = FormatDatePipe;
//# sourceMappingURL=format-date.js.map