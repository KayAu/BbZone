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
var DataAction = /** @class */ (function () {
    function DataAction() {
        this.onEdit = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.onUpdate = new core_1.EventEmitter();
        this.onCancelEdit = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataAction.prototype, "editMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataAction.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataAction.prototype, "onDelete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataAction.prototype, "onUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataAction.prototype, "onCancelEdit", void 0);
    return DataAction;
}());
exports.DataAction = DataAction;
//# sourceMappingURL=dataAction.js.map