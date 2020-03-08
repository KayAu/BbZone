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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var AutoSuggest = /** @class */ (function () {
    function AutoSuggest(http) {
        this.http = http;
        this.onItemSelected = new core_1.EventEmitter();
        this.results = [];
        this.queryField = new forms_1.FormControl();
    }
    AutoSuggest.prototype.ngOnInit = function () {
        var _this = this;
        this.queryField.valueChanges
            .subscribe(function (queryField) { return _this.search(queryField)
            .subscribe(function (response) {
            _this.results = response;
        }); });
    };
    AutoSuggest.prototype.clearSearch = function () {
        this.queryField.reset();
        this.triggerSearch("");
    };
    AutoSuggest.prototype.triggerSearch = function (searchValue) {
        this.onItemSelected.emit(searchValue);
        this.results = [];
    };
    AutoSuggest.prototype.search = function (keyword) {
        if (keyword !== "") {
            var params = new http_1.HttpParams();
            params = params.append('keyword', keyword);
            return this.http.get(this.searchUrl, { params: params }).catch(this.errorHandler);
        }
        else {
            this.clearSearch();
        }
    };
    AutoSuggest.prototype.errorHandler = function (error) {
        // In a real world app, we might use a remote logging infrastructure  
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return rxjs_1.Observable.throw(errMsg);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoSuggest.prototype, "searchUrl", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AutoSuggest.prototype, "onItemSelected", void 0);
    AutoSuggest = __decorate([
        core_1.Component({
            selector: 'auto-suggest',
            templateUrl: './auto-suggest.html',
            styleUrls: ['./auto-suggest.css']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AutoSuggest);
    return AutoSuggest;
}());
exports.AutoSuggest = AutoSuggest;
//# sourceMappingURL=auto-suggest.js.map