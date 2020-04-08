"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var dataRowAction_1 = require("../../interfaces/dataRowAction");
var DropdownAction = /** @class */ (function (_super) {
    __extends(DropdownAction, _super);
    function DropdownAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onEdit = new core_1.EventEmitter();
        _this.onDelete = new core_1.EventEmitter();
        _this.onUpdate = new core_1.EventEmitter();
        _this.onCancelEdit = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(DropdownAction.prototype, "allowDelete", {
        set: function (deletable) {
            if (deletable === false) {
                this.disabledDelete = true;
            }
            else {
                this.disabledDelete = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    DropdownAction.prototype.addRow = function () { };
    DropdownAction.prototype.rowOnEdit = function (rowIndex) { };
    DropdownAction.prototype.editRow = function () {
        this.onEdit.emit();
    };
    DropdownAction.prototype.updateRow = function () {
        this.onUpdate.emit();
    };
    DropdownAction.prototype.deleteRow = function () {
        this.onDelete.emit();
    };
    DropdownAction.prototype.cancelEdit = function () {
        this.onCancelEdit.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownAction.prototype, "editMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownAction.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownAction.prototype, "onDelete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownAction.prototype, "onUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownAction.prototype, "onCancelEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DropdownAction.prototype, "allowDelete", null);
    DropdownAction = __decorate([
        core_1.Component({
            selector: 'dropdown-action',
            template: "<div *ngIf=\"!editMode; else editActions\">\n              <button type=\"button\" class=\"btn btn-success btn-flat btn-xs\" (click)=\"editRow()\">\n                <i class=\"fa fa-edit\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-info btn-flat btn-xs\" [disabled]=\"disabledDelete\" (click)=\"deleteRow()\">\n                <i class=\"fa fa-trash\"></i>\n              </button>\n            </div>\n            <ng-template #editActions>\n              <button type=\"button\" class=\"btn btn-primary btn-flat btn-xs\" (click)=\"updateRow()\">\n                <i class=\"fa fa-check\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-default btn-flat btn-xs\" (click)=\"cancelEdit()\">\n                <i class=\"fa fa-times\"></i>\n              </button>\n            </ng-template>"
        })
    ], DropdownAction);
    return DropdownAction;
}(dataRowAction_1.DataRowAction));
exports.DropdownAction = DropdownAction;
//# sourceMappingURL=dropdown-action.js.map