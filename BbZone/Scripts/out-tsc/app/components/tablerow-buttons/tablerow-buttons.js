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
var TableRowButtons = /** @class */ (function (_super) {
    __extends(TableRowButtons, _super);
    function TableRowButtons() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideDelete = false;
        _this.onEdit = new core_1.EventEmitter();
        _this.onDelete = new core_1.EventEmitter();
        _this.onUpdate = new core_1.EventEmitter();
        _this.onCancelEdit = new core_1.EventEmitter();
        return _this;
    }
    TableRowButtons.prototype.editRow = function () {
        this.onEdit.emit();
    };
    TableRowButtons.prototype.updateRow = function () {
        this.onUpdate.emit();
    };
    TableRowButtons.prototype.deleteRow = function () {
        this.onDelete.emit();
    };
    TableRowButtons.prototype.cancelEdit = function () {
        this.onCancelEdit.emit();
    };
    TableRowButtons.prototype.addRow = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableRowButtons.prototype, "editMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableRowButtons.prototype, "hideDelete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TableRowButtons.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TableRowButtons.prototype, "onDelete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TableRowButtons.prototype, "onUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TableRowButtons.prototype, "onCancelEdit", void 0);
    TableRowButtons = __decorate([
        core_1.Component({
            selector: 'tablerow-buttons',
            template: "<div *ngIf=\"!editMode; else editActions\">\n              <button type=\"button\" class=\"btn btn-success mrg5R\" (click)=\"editRow()\" [ngClass]=\"{'btn-sm' : hideDelete, 'btn-xs' : !hideDelete }\">\n                <i class=\"fa fa-edit\"></i>\n                 <span *ngIf=\"hideDelete\">Edit</span>\n              </button>\n              <button type=\"button\" class=\"btn btn-xs btn-info\" (click)=\"deleteRow()\" *ngIf=\"!hideDelete\">\n                <i class=\"fa fa-trash\"></i>\n              </button>\n            </div>\n            <ng-template #editActions>\n              <button type=\"button\" class=\"btn btn-xs btn-primary mrg5R\" (click)=\"updateRow()\">\n                <i class=\"fa fa-check\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-xs btn-warning\" (click)=\"cancelEdit()\">\n                <i class=\"fa fa-times\"></i>\n              </button>\n            </ng-template>"
        })
    ], TableRowButtons);
    return TableRowButtons;
}(dataRowAction_1.DataRowAction));
exports.TableRowButtons = TableRowButtons;
//# sourceMappingURL=tablerow-buttons.js.map