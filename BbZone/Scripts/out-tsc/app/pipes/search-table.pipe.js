"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchTablePipe = /** @class */ (function () {
    function SearchTablePipe() {
    }
    SearchTablePipe.prototype.transform = function (value, keys, term) {
        if (!term)
            return value;
        return (value || []).filter(function (item) { return keys.split(',').some(function (key) { return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]); }); });
    };
    SearchTablePipe = __decorate([
        core_1.Pipe({
            name: 'search'
        })
    ], SearchTablePipe);
    return SearchTablePipe;
}());
exports.SearchTablePipe = SearchTablePipe;
//# sourceMappingURL=search-table.pipe.js.map