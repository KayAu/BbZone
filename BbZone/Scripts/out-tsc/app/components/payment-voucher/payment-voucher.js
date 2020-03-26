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
var tablerow_data_mapping_1 = require("src/app/model/tablerow.data.mapping");
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var dataDisplayType_1 = require("src/app/enums/dataDisplayType");
var viewWithdrawalColumns_1 = require("src/app/metadata/viewWithdrawalColumns");
var apiController_1 = require("src/app/enums/apiController");
var PaymentVoucher = /** @class */ (function () {
    function PaymentVoucher(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.dataRowMapper = [];
    }
    PaymentVoucher.prototype.loadPaymentVoucher = function () {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.WithdrawalView + "/GetPaymentVoucher", this.withdrawalId).subscribe(function (results) {
            _this.payment = results;
        });
    };
    PaymentVoucher.prototype.getTablerowDataMapping = function () {
        var columnMappings = viewWithdrawalColumns_1.ViewWithdrawalColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PaymentVoucher.prototype, "withdrawalId", void 0);
    PaymentVoucher = __decorate([
        core_1.Component({
            selector: 'payment-voucher',
            templateUrl: './payment-voucher.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], PaymentVoucher);
    return PaymentVoucher;
}());
exports.PaymentVoucher = PaymentVoucher;
//# sourceMappingURL=payment-voucher.js.map