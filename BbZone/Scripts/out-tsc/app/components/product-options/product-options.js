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
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("src/app/enums/apiController");
var forms_1 = require("@angular/forms");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var ProductOptions = /** @class */ (function () {
    function ProductOptions(dataService, el, formEvent) {
        this.dataService = dataService;
        this.el = el;
        this.formEvent = formEvent;
        this.onProductSelected = new core_1.EventEmitter();
        this.propagateChange = function () { };
    }
    ProductOptions_1 = ProductOptions;
    ProductOptions.prototype.ngOnInit = function () {
        var _this = this;
        this.loadOptions();
        if (this.required) {
            this.subscription = this.formEvent.notification.subscribe(function (form) {
                _this.parentForm = form.template;
                _this.validate();
            });
        }
    };
    ProductOptions.prototype.loadOptions = function () {
        var _this = this;
        this.dataService.getAll(apiController_1.ApiController.Dropdown + "/GetProducts").subscribe(function (results) {
            _this.products = results;
        });
    };
    ProductOptions.prototype.onClick = function (productId, itemNo) {
        this.selectedProduct = this.products[itemNo];
        this.propagateChange(productId);
        this.onProductSelected.emit();
        //this.onProductSelected.emit(productId);
    };
    ProductOptions.prototype.clearSelection = function () {
        this.selectedProduct = null;
    };
    ProductOptions.prototype.validate = function () {
        var thisElement = $(this.el.nativeElement);
        if (this.selectedProduct === null || this.selectedProduct === undefined || this.selectedProduct === "") {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger display-block">This is required</span>');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages(thisElement);
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    };
    ProductOptions.prototype.clearErrorMessages = function (thisElement) {
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        thisElement.next().remove();
    };
    ProductOptions.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    ProductOptions.prototype.setChanges = function () { };
    ProductOptions.prototype.writeValue = function () { };
    ProductOptions.prototype.registerOnTouched = function () { };
    ProductOptions.prototype.setDisabledState = function () { };
    var ProductOptions_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductOptions.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductOptions.prototype, "required", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductOptions.prototype, "onProductSelected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductOptions.prototype, "propagateChange", void 0);
    ProductOptions = ProductOptions_1 = __decorate([
        core_1.Component({
            selector: 'product-options',
            templateUrl: './product-options.html',
            styleUrls: ['./product-options.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return ProductOptions_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, core_1.ElementRef, broadcast_service_1.BroadcastService])
    ], ProductOptions);
    return ProductOptions;
}());
exports.ProductOptions = ProductOptions;
//# sourceMappingURL=product-options.js.map