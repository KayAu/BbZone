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
var SupplierService = /** @class */ (function () {
    function SupplierService(http) {
        this.http = http;
        this.webMethodUrl = "";
        this.webMethodUrl = "/api/Supplier/";
        this.headerOptions = { headers: new http_1.HttpHeaders({ 'Content-Type': "application/json" }) };
    }
    SupplierService.prototype.addSupplier = function (suppliername) {
        return this.http.post(this.webMethodUrl, JSON.stringify(suppliername), this.headerOptions).catch(this.errorHandler);
    };
    SupplierService.prototype.updateSupplier = function (supplier) {
        return this.http.put(this.webMethodUrl + '/' + supplier.supplierId, JSON.stringify(supplier), this.headerOptions).catch(this.errorHandler);
    };
    SupplierService.prototype.removeSupplier = function (supplierId) {
        return this.http.delete(this.webMethodUrl + '/' + supplierId).catch(this.errorHandler);
    };
    SupplierService.prototype.getSupplierList = function (fromRecord, pageSize, searchKeyword, sortColumn, sortInAsc) {
        var params = new http_1.HttpParams();
        params = params.append('currentPage', fromRecord.toString())
            .append('pageSize', pageSize.toString())
            .append('sortColumn', sortColumn)
            .append('sortInAsc', sortInAsc.toString())
            .append('searchKeyword', searchKeyword);
        return this.http.get(this.webMethodUrl, { params: params }).catch(this.errorHandler);
    };
    SupplierService.prototype.errorHandler = function (error) {
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
        return Rx_1.Observable.throw(errMsg);
    };
    SupplierService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SupplierService);
    return SupplierService;
}());
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map