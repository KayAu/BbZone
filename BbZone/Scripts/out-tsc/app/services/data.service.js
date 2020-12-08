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
var Rx_1 = require("rxjs/Rx");
var angular2_cookie_1 = require("angular2-cookie");
var DataService = /** @class */ (function () {
    //headerOptions: any;
    function DataService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.currentUser = null;
        //this.headerOptions = { headers: new HttpHeaders({ 'Content-Type': "application/json" }) };
    }
    DataService.prototype.getHeaderOptions = function () {
        this.currentUser = this.cookieService.get('currentUser') !== undefined ? JSON.parse(this.cookieService.get('currentUser')) : null;
        if (this.currentUser !== null) {
            return {
                headers: new http_1.HttpHeaders({
                    'Content-Type': "application/json",
                    Authorization: "Bearer " + this.currentUser.access_token
                })
            };
        }
        else {
            return { headers: new http_1.HttpHeaders({ 'Content-Type': "application/json" }) };
        }
    };
    DataService.prototype.getHeaderTokenOnlyOption = function () {
        this.currentUser = this.cookieService.get('currentUser') !== undefined ? JSON.parse(this.cookieService.get('currentUser')) : null;
        if (this.currentUser !== null) {
            return { headers: new http_1.HttpHeaders({ Authorization: "Bearer " + this.currentUser.access_token }) };
        }
    };
    DataService.prototype.export = function (apiControllerName, filterParams) {
        return this.http.post(this.getWebMethodUrl(apiControllerName), JSON.stringify(filterParams), {
            headers: new http_1.HttpHeaders({ 'Content-Type': "application/json", Authorization: "Bearer " + this.currentUser.access_token }),
            responseType: 'blob'
        }).catch(this.errorHandler);
    };
    DataService.prototype.login = function (apiControllerName, username, password, isAdmin) {
        var userData = "username=" + username + "&password=" + password + "&isAdmin=" + isAdmin + "&grant_type=password";
        var loginHeaderOptions = new http_1.HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'No-Auth': 'True'
        });
        return this.http.post(this.getWebMethodUrl(apiControllerName), userData, {
            headers: loginHeaderOptions
        }).catch(this.errorHandler);
    };
    DataService.prototype.get = function (apiControllerName, recordId) {
        return this.http.get(this.getWebMethodUrl(apiControllerName, recordId), this.getHeaderOptions()).catch(this.errorHandler);
    };
    DataService.prototype.add = function (apiControllerName, record) {
        return this.http.post(this.getWebMethodUrl(apiControllerName), JSON.stringify(record), this.getHeaderOptions()).catch(this.errorHandler);
    };
    DataService.prototype.postForm = function (apiControllerName, formData) {
        return this.http.post(this.getWebMethodUrl(apiControllerName), formData, this.getHeaderTokenOnlyOption()).catch(this.errorHandler);
    };
    DataService.prototype.updateForm = function (apiControllerName, recordId, formData) {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), formData, this.getHeaderTokenOnlyOption()).catch(this.errorHandler);
    };
    DataService.prototype.update = function (apiControllerName, recordId, record) {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), JSON.stringify(record), this.getHeaderOptions()).catch(this.errorHandler);
    };
    DataService.prototype.remove = function (apiControllerName, recordId) {
        return this.http.delete(this.getWebMethodUrl(apiControllerName, recordId), this.getHeaderOptions()).catch(this.errorHandler);
    };
    DataService.prototype.getListDataByPage = function (apiControllerName, fromRecord, pageSize, filterParams, sortColumn, sortInAsc) {
        if (pageSize === void 0) { pageSize = 25; }
        var searchParams = typeof filterParams === 'object' ? JSON.stringify(filterParams) : filterParams;
        var params = new http_1.HttpParams();
        params = params.append('currentPage', fromRecord.toString())
            .append('pageSize', pageSize.toString())
            .append('sortColumn', sortColumn)
            .append('sortInAsc', sortInAsc.toString())
            .append('searchParams', searchParams);
        var headers = new http_1.HttpHeaders({
            'Content-Type': "application/json",
            Authorization: "Bearer " + this.currentUser.access_token
        });
        var options = { headers: headers, params: params };
        return this.http.get(this.getWebMethodUrl(apiControllerName), options).catch(this.errorHandler);
    };
    DataService.prototype.getAll = function (apiControllerName) {
        return this.http.get(this.getWebMethodUrl(apiControllerName), this.getHeaderOptions()).catch(this.errorHandler);
    };
    DataService.prototype.getWebMethodUrl = function (apiControllerName, param) {
        if (param)
            return "/api/" + apiControllerName + "/" + param;
        else
            return "/api/" + apiControllerName;
    };
    DataService.prototype.errorHandler = function (error) {
        // In a real world app, we might use a remote logging infrastructure  
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.error ? error.error : error.toString();
        }
        console.log(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, angular2_cookie_1.CookieService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map