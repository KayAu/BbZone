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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dataAction_1 = require("../../interfaces/dataAction");
var TablerowAction = /** @class */ (function (_super) {
    __extends(TablerowAction, _super);
    function TablerowAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //@Input() editMode: boolean;
    //@Input() displayIconOnly: boolean;
    //@Output() onEdit = new EventEmitter();
    //@Output() onDelete = new EventEmitter();
    //@Output() onUpdate = new EventEmitter();
    //@Output() onCancelEdit = new EventEmitter();
    TablerowAction.prototype.editRow = function () {
        this.onEdit.emit();
    };
    TablerowAction.prototype.updateRow = function () {
        this.onUpdate.emit();
    };
    TablerowAction.prototype.deleteRow = function () {
        this.onDelete.emit();
    };
    TablerowAction.prototype.cancelEdit = function () {
        this.onCancelEdit.emit();
    };
    TablerowAction = __decorate([
        core_1.Component({
            selector: 'tablerow-action',
            template: "<div *ngIf=\"!editMode; else editActions\">\n              <button type=\"button\" class=\"btn btn-rounded btn-sm btn-primary mrg10R\" (click)=\"editRow()\">\n                Edit\n                <i class=\"ti-pencil\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-rounded btn-sm btn-danger\" (click)=\"deleteRow()\">\n                Delete\n                <i class=\"ti-trash\"></i>\n              </button>\n            </div>\n            <ng-template #editActions>\n              <button type=\"button\" class=\"btn btn-rounded btn-sm btn-success mrg10R\" (click)=\"updateRow()\">\n                Update\n                <i class=\"ti-check\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-rounded btn-sm\" (click)=\"cancelEdit()\">\n                Cancel\n                <i class=\"ti-close\"></i>\n              </button>\n            </ng-template>"
        })
    ], TablerowAction);
    return TablerowAction;
}(dataAction_1.DataAction));
exports.TablerowAction = TablerowAction;
//# sourceMappingURL=tablerow-action.js.map