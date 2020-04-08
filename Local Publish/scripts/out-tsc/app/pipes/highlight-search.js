"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HighlightSearchPipe = /** @class */ (function () {
    function HighlightSearchPipe() {
    }
    HighlightSearchPipe.prototype.transform = function (value, searchKey) {
        if (!searchKey) {
            return value;
        }
        var re = new RegExp(searchKey, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
        return value.replace(re, "<mark>" + searchKey + "</mark>");
    };
    HighlightSearchPipe = __decorate([
        core_1.Pipe({
            name: 'highlight'
        })
    ], HighlightSearchPipe);
    return HighlightSearchPipe;
}());
exports.HighlightSearchPipe = HighlightSearchPipe;
//# sourceMappingURL=highlight-search.js.map