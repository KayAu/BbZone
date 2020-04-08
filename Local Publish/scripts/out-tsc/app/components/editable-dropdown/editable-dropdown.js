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
var dropdown_item_model_1 = require("../../model/dropdown.item.model");
var forms_1 = require("@angular/forms");
var EditableDropdown = /** @class */ (function () {
    function EditableDropdown(dataService) {
        this.dataService = dataService;
        this.editRowIndex = -1;
        this.editedItem = new dropdown_item_model_1.DropdownItem();
        this.itemChanged = new core_1.EventEmitter();
        this.dropdownItems = [];
        this.disabled = false;
        this.checked = false;
        this.propagateChange = function () { };
    }
    EditableDropdown_1 = EditableDropdown;
    EditableDropdown.prototype.ngOnInit = function () {
        this.showSelectionMenu = false;
        this.onEditMode = false;
        this.loadDropdownItems();
    };
    EditableDropdown.prototype.writeValue = function (val) {
        if (!val)
            this.selectedItemText = "Select";
        else {
            this.selectedItemValue = val;
        }
    };
    EditableDropdown.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    EditableDropdown.prototype.registerOnTouched = function () { };
    EditableDropdown.prototype.setDisabledState = function () { };
    EditableDropdown.prototype.setEditMode = function (isEdit) {
        this.onEditMode = isEdit.checked;
        this.clearEditedModel();
    };
    EditableDropdown.prototype.addItem = function () {
        var _this = this;
        if (this.input.nativeElement.value === '')
            return;
        this.dataService.add(this.dataSourceUrl, this.input.nativeElement.value).subscribe(function (data) {
            _this.dropdownItems.splice(0, 0, data);
            _this.input.nativeElement.value = '';
            _this.emitItemChanged();
        });
    };
    EditableDropdown.prototype.updateItem = function (rowIndex) {
        var _this = this;
        if (this.dropdownItems[rowIndex][this.dataTextField] === '')
            return;
        this.dataService.update(this.dataSourceUrl, this.dropdownItems[rowIndex][this.dataValueField], this.dropdownItems[rowIndex][this.dataTextField]).subscribe(function (data) {
            _this.editRowIndex = -1;
            _this.resetDisplayAfterRowUpdate(rowIndex);
            _this.emitItemChanged();
        });
    };
    EditableDropdown.prototype.deleteItem = function (rowIndex) {
        var _this = this;
        this.dataService.remove(this.dataSourceUrl, this.dropdownItems[rowIndex][this.dataValueField]).subscribe(function (data) {
            _this.resetDisplayAfterRowUpdate(rowIndex, true);
            _this.dropdownItems.splice(rowIndex, 1);
            _this.emitItemChanged();
        });
    };
    EditableDropdown.prototype.editItem = function (rowIndex) {
        this.editRowIndex = rowIndex;
        this.editedItem = Object.assign(this.editedItem, this.dropdownItems[this.editRowIndex]);
    };
    EditableDropdown.prototype.cancelEdit = function (rowIndex) {
        this.clearEditedModel();
    };
    EditableDropdown.prototype.rowOnEdit = function (rowIndex) {
        return rowIndex === this.editRowIndex;
    };
    EditableDropdown.prototype.openMenu = function () {
        this.showSelectionMenu = !this.showSelectionMenu;
        if (!this.showSelectionMenu) {
            this.onEditMode = false;
            this.clearEditedModel();
        }
    };
    EditableDropdown.prototype.onItemClicked = function (selectedIndex) {
        this.showSelectionMenu = false;
        this.selectedItemText = this.dropdownItems[selectedIndex][this.dataTextField];
        this.selectedItemValue = this.dropdownItems[selectedIndex][this.dataValueField];
        this.propagateChange(this.selectedItemValue);
    };
    EditableDropdown.prototype.loadDropdownItems = function () {
        var _this = this;
        this.dataService.getAll(this.dataSourceUrl).subscribe(function (data) {
            _this.dropdownItems = data;
            _this.emitItemChanged();
            if (_this.selectedItemValue)
                _this.setSelectedText(_this.selectedItemValue);
        });
    };
    EditableDropdown.prototype.setSelectedText = function (bindValue) {
        var _this = this;
        var defaultItem = this.dropdownItems.find(function (item) { return item[_this.dataValueField] === bindValue; });
        this.selectedItemText = defaultItem[this.dataTextField];
    };
    EditableDropdown.prototype.clearEditedModel = function () {
        if (this.editRowIndex >= 0) {
            this.dropdownItems[this.editRowIndex] = Object.assign(this.dropdownItems[this.editRowIndex], this.editedItem);
            this.editRowIndex = -1;
        }
    };
    EditableDropdown.prototype.emitItemChanged = function () {
        if (this.itemChanged)
            this.itemChanged.emit(this.dropdownItems);
    };
    EditableDropdown.prototype.resetDisplayAfterRowUpdate = function (updatedRowIndex, deleted) {
        if (deleted) {
            // item deleted
            if (this.selectedItemValue === this.dropdownItems[updatedRowIndex][this.dataValueField]) {
                this.selectedItemValue = '';
                this.selectedItemText = '';
            }
        }
        else {
            // item updated
            if (this.selectedItemValue === this.dropdownItems[updatedRowIndex][this.dataValueField]) {
                this.selectedItemText = this.dropdownItems[updatedRowIndex][this.dataTextField];
            }
        }
    };
    var EditableDropdown_1;
    __decorate([
        core_1.ViewChild('newItem'),
        __metadata("design:type", core_1.ElementRef)
    ], EditableDropdown.prototype, "input", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], EditableDropdown.prototype, "itemChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditableDropdown.prototype, "dataTextField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditableDropdown.prototype, "dataValueField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditableDropdown.prototype, "dataSourceUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditableDropdown.prototype, "title", void 0);
    EditableDropdown = EditableDropdown_1 = __decorate([
        core_1.Component({
            selector: 'editable-dropdown',
            templateUrl: './editable-dropdown.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return EditableDropdown_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], EditableDropdown);
    return EditableDropdown;
}());
exports.EditableDropdown = EditableDropdown;
//# sourceMappingURL=editable-dropdown.js.map