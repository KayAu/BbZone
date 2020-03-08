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
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.headerOptions = { headers: new http_1.HttpHeaders({ 'Content-Type': "application/json" }) };
    }
    DataService.prototype.get = function (apiControllerName, recordId) {
        return this.http.get(this.getWebMethodUrl(apiControllerName, recordId), this.headerOptions).catch(this.errorHandler);
    };
    DataService.prototype.add = function (apiControllerName, record) {
        return this.http.post(this.getWebMethodUrl(apiControllerName), JSON.stringify(record), this.headerOptions).catch(this.errorHandler);
    };
    DataService.prototype.postForm = function (apiControllerName, formData) {
        return this.http.post(this.getWebMethodUrl(apiControllerName), formData).catch(this.errorHandler);
    };
    DataService.prototype.updateForm = function (apiControllerName, recordId, formData) {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), formData).catch(this.errorHandler);
    };
    DataService.prototype.update = function (apiControllerName, recordId, record) {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), JSON.stringify(record), this.headerOptions).catch(this.errorHandler);
    };
    DataService.prototype.remove = function (apiControllerName, recordId) {
        return this.http.delete(this.getWebMethodUrl(apiControllerName, recordId)).catch(this.errorHandler);
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
        return this.http.get(this.getWebMethodUrl(apiControllerName), { params: params }).catch(this.errorHandler);
    };
    DataService.prototype.getAll = function (apiControllerName) {
        return this.http.get(this.getWebMethodUrl(apiControllerName), this.headerOptions).catch(this.errorHandler);
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
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map