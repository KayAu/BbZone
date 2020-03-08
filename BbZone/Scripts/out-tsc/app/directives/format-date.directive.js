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
var forms_1 = require("@angular/forms");
var FormatDateDirective = /** @class */ (function () {
    // constructor(private el: ElementRef, private ngModel: NgModel) {}
    function FormatDateDirective(el) {
        this.el = el;
        this.dateFormatted = new core_1.EventEmitter();
    }
    FormatDateDirective.prototype.ngOnInit = function () {
        //this.checkDateFormat(this.ngModel.model);       
    };
    FormatDateDirective.prototype.onInputChange = function (event) {
        this.checkDateFormat(event);
    };
    Object.defineProperty(FormatDateDirective.prototype, "ngModel", {
        set: function (value) {
            //listen to the input value change of ngModel and change in the plugin accordingly.
            this.checkDateFormat(value);
        },
        enumerable: true,
        configurable: true
    });
    FormatDateDirective.prototype.checkDateFormat = function (date) {
        if (!date)
            return;
        if (date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/g)) {
            var newDate = this.formatDate(date);
            //this.ngModel.valueAccessor.writeValue(newDate);
            this.dateFormatted.emit(newDate);
            //this.el.nativeElement.value = newDate;
        }
    };
    FormatDateDirective.prototype.formatDate = function (date) {
        var year = date.slice(0, 4);
        var month = date.slice(5, 7);
        var day = date.slice(8, 10);
        var formattedDate = month + '/' + day + '/' + year;
        return formattedDate;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FormatDateDirective.prototype, "dateFormatted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FormatDateDirective.prototype, "ngModel", null);
    FormatDateDirective = __decorate([
        core_1.Directive({
            selector: '[format-date][ngModel]',
            providers: [forms_1.NgModel],
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FormatDateDirective);
    return FormatDateDirective;
}());
exports.FormatDateDirective = FormatDateDirective;
//# sourceMappingURL=format-date.directive.js.map