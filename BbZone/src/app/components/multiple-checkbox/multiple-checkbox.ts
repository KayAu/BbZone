import { Component, Input, Output, ElementRef, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, NgForm } from '@angular/forms';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { FormSubmit } from 'src/app/model/form-submit';
import { ApiController } from 'src/app/enums/apiController';
import { SelectItem } from 'src/app/model/select.item';
import { CascadeService } from 'src/app/services/cascade.service';

declare var $: any;

@Component({
    selector: 'multiple-checkbox',
    templateUrl: './multiple-checkbox.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultipleCheckboxes),
            multi: true
        }
    ]
})


export class MultipleCheckboxes implements ControlValueAccessor {
    private checkboxItems: SelectItem[] = [];
    private subscription: Subscription;
    private selectedItemText: string;
    private selectedItems: any;
    private parentForm: NgForm;

    @Input() required: boolean;
   // @Input() parentForm: NgForm;
    @Input() fieldId: string;
    @Input() displayText: string;
    @Input('dataItems')
    set dataItems(data: SelectItem[]) {
        this.checkboxItems = data;
    }

    @Output() propagateChange: any = () => { };
  
    constructor(
        private el: ElementRef,
        private formEvent: BroadcastService,
        private cascadeEvent: CascadeService,
        private dataService: DataService

    ) { }

    ngOnInit() {
        if (this.required) {
            this.subscription = this.formEvent.notification.subscribe((form: FormSubmit) => {
                this.parentForm = form.template;
                this.validate();
            });
        }
    }

    writeValue(data: SelectItem[]): void {
        this.checkboxItems = data;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    setChanges() {
        //this.propagateChange(this.data);
    }

    itemSelected(event, itemNo) {
        this.selectedItemText = this.checkboxItems.filter(i => i.selected === true).map(i => i.displayText).join(',');
        this.selectedItems = this.checkboxItems.filter(i => i.selected === true).map(i => i.displayValue);
        this.propagateChange(this.selectedItems);
    }

    removeSelection() {
        this.checkboxItems = this.checkboxItems.filter(a => a.selected === false);
        this.selectedItems = null;
        this.selectedItemText = ""
    }

    private validate() {
        let thisElement = $(this.el.nativeElement);

        if (this.selectedItems === null || this.selectedItems === undefined || this.selectedItems.length === 0) {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger display-block">This is required</span>');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages(thisElement);
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    }

    private clearErrorMessages(thisElement: any) {
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        this.parentForm.controls[this.fieldId].setErrors(null);
        thisElement.next().remove();
    }

    registerOnTouched() { }
    setDisabledState?() { }
}
