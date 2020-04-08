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
var EditModeDirective = /** @class */ (function () {
    function EditModeDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    Object.defineProperty(EditModeDirective.prototype, "editMode", {
        set: function (val) {
            this._editMode = val;
            if (this._editMode) {
                this.renderer.addClass(this.el.nativeElement, 'row-edit');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'row-edit');
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('edit-mode'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], EditModeDirective.prototype, "editMode", null);
    EditModeDirective = __decorate([
        core_1.Directive({
            selector: '[edit-mode]'
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
    ], EditModeDirective);
    return EditModeDirective;
}());
exports.EditModeDirective = EditModeDirective;
//# sourceMappingURL=editmode-directive.js.map