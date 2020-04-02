import { Component, Input, Output, ElementRef, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, NgForm  } from '@angular/forms';
import { BroadcastService } from '../../services/broadcast.service';
import { Subscription } from 'rxjs';
import { FormSubmit } from '../../model/form-submit';
import { DataFieldControl } from '../../model/data.field.control';
import { ControlType } from '../../enums/dataDisplayType';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { ApiController } from '../../enums/apiController';
import { CascadeData } from 'src/app/model/cascade-data';
import { CascadeService } from 'src/app/services/cascade.service';

declare var $: any;

@Component({
    selector: 'data-control',
    templateUrl: './data-control.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DataControl),
            multi: true
        }
        //,{ provide: NG_VALIDATORS, useExisting: forwardRef(() => FieldBuilder), multi: true }
    ]
})

export class DataControl implements ControlValueAccessor {
    data: any;
    parentForm: NgForm;
    controlType = ControlType;
    dropdownItems : any[];
    @Input() field: DataFieldControl;
    @Input() fieldId: string;
    @Input() onEdit: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() formName: string;
    @Output() propagateChange: any = () => { };
    @Output() onModelChanged = new EventEmitter();

    private subscription: Subscription;
 
    constructor(
        private el: ElementRef,
        private formEvent: BroadcastService,
        private cascadeEvent: CascadeService,
        private dataService: DataService

    ) {  }

    ngOnInit() {
        if (this.field.required) {
            this.subscription = this.formEvent.notification.subscribe((form: FormSubmit) => {
                //   if (form.name !== this.formName) return;
                this.parentForm = form.template;
                this.validate(); 
            });
        }

        if (this.field.controlType === ControlType.select)
            this.loadOptions();
        else if (this.field.controlType === ControlType.cascadeDropdown) {
            this.subscribeToParentField();
        }
    }

    writeValue(val: any): void {

        if (this.field.controlType === this.controlType.select || this.field.controlType === this.controlType.cascadeDropdown) {
            if (val) {
                this.data = val.toString();
                if (this.field.cascadeTo) {
                    this.cascadeEvent.subject.next(new CascadeData(this.field.cascadeTo, this.data));
                }
            }
        }
        else {
            this.data = val;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    setChanges() {
        this.propagateChange(this.data);

        if (this.onModelChanged.observers.length > 0) {
            this.onModelChanged.emit();
        }

        if (this.field.cascadeTo) {
            this.cascadeEvent.subject.next(new CascadeData(this.field.cascadeTo, this.data));
        }
    }


    private loadOptions() {
        if (!this.field.datasourceUrl) return;
        this.dataService.getAll(`${ApiController.Dropdown}/${this.field.datasourceUrl}`).subscribe(results => {
            this.dropdownItems = results;
        });
    }

    private validate() {
        let thisElement =  $(this.el.nativeElement);
        
        if (this.data === null || this.data === undefined || this.data === "") {           
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
            $(this.parentForm.controls[this.fieldId]).addClass('data-invalid');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages(thisElement);
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    }

    private clearErrorMessages(thisElement: any)
    {
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        thisElement.next().remove();
    }

    private subscribeToParentField() {
        this.cascadeEvent.subject.subscribe((cascade: CascadeData) => {
            if (cascade.toField !== this.field.controlName) return;

            this.disabled = true;
            this.dropdownItems = null;
            if (this.field.cascadeTo) {
                this.cascadeEvent.subject.next(new CascadeData(this.field.cascadeTo, null));
            }

            if (cascade.value) {
                this.dataService.getAll(`${ApiController.Dropdown}/${this.field.datasourceUrl}/${cascade.value}`).subscribe(results => {
                    this.dropdownItems = results;
                    this.disabled = false;
                });
            }
        });
    }

    registerOnTouched() { }
    setDisabledState?() { }
}
