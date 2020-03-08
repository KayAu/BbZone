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
;
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("src/app/enums/apiController");
var ProductOptions = /** @class */ (function () {
    function ProductOptions(dataService) {
        this.dataService = dataService;
        this.onProductSelected = new core_1.EventEmitter();
    }
    ProductOptions.prototype.ngOnInit = function () {
        this.loadOptions();
    };
    ProductOptions.prototype.loadOptions = function () {
        var _this = this;
        this.dataService.getAll(apiController_1.ApiController.Dropdown + "/GetProducts").subscribe(function (results) {
            _this.products = results;
        });
    };
    ProductOptions.prototype.onClick = function (productId) {
        this.onProductSelected.emit(productId);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductOptions.prototype, "onProductSelected", void 0);
    ProductOptions = __decorate([
        core_1.Component({
            selector: 'product-options',
            templateUrl: './product-options.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], ProductOptions);
    return ProductOptions;
}());
exports.ProductOptions = ProductOptions;
//# sourceMappingURL=product-options.js.map