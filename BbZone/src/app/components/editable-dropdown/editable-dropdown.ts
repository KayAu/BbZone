import { ViewChild, Component, EventEmitter, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DropdownItem } from "../../model/dropdown.item.model";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
selector: 'editable-dropdown',
    templateUrl: './editable-dropdown.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditableDropdown),
            multi: true
        }
    ]
})

export class EditableDropdown implements ControlValueAccessor {

    private editRowIndex: number = -1;
    private editedItem: DropdownItem = new DropdownItem();

    @ViewChild('newItem') input: ElementRef;
    @Output() itemChanged = new EventEmitter();
    @Input() dataTextField: string;
    @Input() dataValueField: string;
    @Input() dataSourceUrl: string;
    @Input() title: string;

    selectedItemText: string;
    selectedItemValue: any;
    dropdownItems: any[] = [];
    showSelectionMenu: boolean;
    onEditMode: boolean;
    disabled = false;
    checked = false;
    propagateChange: any = () => { };

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.showSelectionMenu = false;
        this.onEditMode = false;
        this.loadDropdownItems();        
    }

    writeValue(val: number): void {
        if (!val)
            this.selectedItemText = `Select`;
        else {
            this.selectedItemValue = val;
        }
    }
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched() { }
    setDisabledState?() { }

    setEditMode(isEdit) {
        this.onEditMode = isEdit.checked;
        this.clearEditedModel();
    }

    addItem() {
        if (this.input.nativeElement.value === '') return;

        this.dataService.add(this.dataSourceUrl, this.input.nativeElement.value).subscribe(data => {
            this.dropdownItems.splice(0, 0, data);
            this.input.nativeElement.value = '';
            this.emitItemChanged();
        });
    }

    updateItem(rowIndex: number) {
        if (this.dropdownItems[rowIndex][this.dataTextField] === '')
            return;

        this.dataService.update(this.dataSourceUrl, this.dropdownItems[rowIndex][this.dataValueField], this.dropdownItems[rowIndex][this.dataTextField]).subscribe(data => {
            this.editRowIndex = -1;
            this.resetDisplayAfterRowUpdate(rowIndex);
            this.emitItemChanged();
        });
    }

    deleteItem(rowIndex: number) {
        this.dataService.remove(this.dataSourceUrl, this.dropdownItems[rowIndex][this.dataValueField]).subscribe(data => {
            this.resetDisplayAfterRowUpdate(rowIndex, true);
            this.dropdownItems.splice(rowIndex, 1);
            this.emitItemChanged();
        });
    }

    editItem(rowIndex: number) {
        this.editRowIndex = rowIndex;
        this.editedItem = (<any>Object).assign(this.editedItem, this.dropdownItems[this.editRowIndex]);
    }

    cancelEdit(rowIndex: number) {
        this.clearEditedModel();
    }

    rowOnEdit(rowIndex: number) {
        return rowIndex === this.editRowIndex;
    }

    openMenu()
    {
        this.showSelectionMenu = !this.showSelectionMenu;
        if (!this.showSelectionMenu) {
            this.onEditMode = false;
            this.clearEditedModel();
        }
    }

    onItemClicked(selectedIndex: number) {
        this.showSelectionMenu = false;
        this.selectedItemText = this.dropdownItems[selectedIndex][this.dataTextField];
        this.selectedItemValue = this.dropdownItems[selectedIndex][this.dataValueField];
        this.propagateChange(this.selectedItemValue);
    }

  private loadDropdownItems() {

    this.dataService.getAll(this.dataSourceUrl).subscribe(data => {
            this.dropdownItems = data;
            this.emitItemChanged();

            if (this.selectedItemValue) 
                this.setSelectedText(this.selectedItemValue);
        });
    }

    private setSelectedText(bindValue: number) {
        let defaultItem = this.dropdownItems.find(item => item[this.dataValueField] === bindValue);
        this.selectedItemText = defaultItem[this.dataTextField];
    }

    private clearEditedModel() {
        if (this.editRowIndex >= 0) {
            this.dropdownItems[this.editRowIndex] = (<any>Object).assign(this.dropdownItems[this.editRowIndex], this.editedItem);
            this.editRowIndex = -1;
        }
    }

    private emitItemChanged() {
        if (this.itemChanged)
            this.itemChanged.emit(this.dropdownItems);
    }

    private resetDisplayAfterRowUpdate(updatedRowIndex: number, deleted?: boolean) {
        
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
    }

}
