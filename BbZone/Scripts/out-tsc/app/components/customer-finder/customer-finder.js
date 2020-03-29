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
var data_service_1 = require("../../services/data.service");
var apiController_1 = require("../../enums/apiController");
var rxjs_1 = require("rxjs");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var forms_1 = require("@angular/forms");
var CustomerFinder = /** @class */ (function () {
    function CustomerFinder(el, formEvent, dataService) {
        var _this = this;
        this.el = el;
        this.formEvent = formEvent;
        this.dataService = dataService;
        this.selectedCustomer = null;
        this.dropdownItems = [];
        this.loadData = false;
        this.startSearching = false;
        this.searchFieldInput = new rxjs_1.Subject();
        this.onItemSelected = new core_1.EventEmitter();
        this.disabledEdit = false;
        this.subscription = this.formEvent.notification.subscribe(function (form) {
            _this.parentForm = form.template;
            _this.validate();
        });
    }
    CustomerFinder_1 = CustomerFinder;
    Object.defineProperty(CustomerFinder.prototype, "displayText", {
        set: function (data) {
            this.selectedCustomer = data;
        },
        enumerable: true,
        configurable: true
    });
    CustomerFinder.prototype.ngOnInit = function () {
        var _this = this;
        this.searchFieldInput.asObservable().debounceTime(500).distinctUntilChanged().subscribe(function (data) {
            _this.search(data);
        });
    };
    CustomerFinder.prototype.onItemClicked = function (selectedIndex) {
        this.selectedCustomer = this.dropdownItems[selectedIndex].customerName;
        this.onItemSelected.emit(this.dropdownItems[selectedIndex]);
        this.hideDropwdown();
        this.clearErrorMessages();
    };
    CustomerFinder.prototype.onSearchInputChanged = function (keyword) {
        this.searchFieldInput.next(keyword);
        if (!keyword) {
            this.selectedCustomer = null;
            this.hideDropwdown();
            this.onItemSelected.emit(null);
        }
    };
    CustomerFinder.prototype.validate = function () {
        var thisElement = $(this.el.nativeElement);
        if (this.selectedCustomer === null) {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
            $(this.parentForm.controls[this.fieldId]).addClass('data-invalid');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages();
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    };
    CustomerFinder.prototype.clearErrorMessages = function () {
        var thisElement = $(this.el.nativeElement);
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        thisElement.next().remove();
    };
    CustomerFinder.prototype.search = function (keyword) {
        var _this = this;
        if (!keyword)
            return;
        this.loadData = true;
        this.startSearching = true;
        this.dataService.get(apiController_1.ApiController.CustomerApplication + "/Find/" + keyword).subscribe(function (data) {
            _this.startSearching = false;
            _this.dropdownItems = !data ? [] : data;
        });
    };
    CustomerFinder.prototype.hideDropwdown = function () {
        this.loadData = false;
        this.dropdownItems = [];
    };
    CustomerFinder.prototype.writeValue = function (val) { };
    CustomerFinder.prototype.registerOnChange = function (fn) { };
    CustomerFinder.prototype.registerOnTouched = function () { };
    CustomerFinder.prototype.setDisabledState = function () { };
    var CustomerFinder_1;
    __decorate([
        core_1.ViewChild('searchInput'),
        __metadata("design:type", core_1.ElementRef)
    ], CustomerFinder.prototype, "searchInput", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CustomerFinder.prototype, "onItemSelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CustomerFinder.prototype, "disabledEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CustomerFinder.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CustomerFinder.prototype, "displayText", null);
    CustomerFinder = CustomerFinder_1 = __decorate([
        core_1.Component({
            selector: 'customer-finder',
            templateUrl: './customer-finder.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return CustomerFinder_1; }),
                    multi: true
                }
                //,{ provide: NG_VALIDATORS, useExisting: forwardRef(() => FieldBuilder), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            broadcast_service_1.BroadcastService,
            data_service_1.DataService])
    ], CustomerFinder);
    return CustomerFinder;
}());
exports.CustomerFinder = CustomerFinder;
//# sourceMappingURL=customer-finder.js.map