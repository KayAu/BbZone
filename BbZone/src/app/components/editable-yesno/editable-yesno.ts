import { Component, EventEmitter, Input, Output, ElementRef, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'editable-yesno',
    templateUrl: './editable-yesno.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditableYesNo),
            multi: true
        }
    ]
})

export class EditableYesNo implements ControlValueAccessor{
    currentValue: boolean;
    onEdit: boolean;
    @Output() valueChanged: any = () => { };
    @Input() id: any;
    @Input() disabled: boolean = false;

    @Input("onEdit") 
    set inEditMode(editing: boolean) {
        this.onEdit = editing;
    }

    constructor(private el: ElementRef) {}

    clear() {
        this.currentValue = null;
        this.valueChanged(null);
    }

    writeValue(val: any): void {
        this.currentValue = val;
    }

    registerOnChange(fn: any): void {
        this.valueChanged = fn;
    }

    setChangedValue(value) {
        this.valueChanged(value);
    }

    registerOnTouched() { }
    setDisabledState?() { }

}