import { Component, Input, Output, ElementRef, forwardRef, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, NgForm, Validators  } from '@angular/forms';
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
    controlLoaded: boolean = false;
    controlType = ControlType;
    dropdownItems: any[];
    @Input() parentForm: NgForm;
    @Input() formName: string;
    @Input() field: DataFieldControl;
    @Input() fieldId: string;
    @Input() onEdit: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() forDataFilter: boolean = false;
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
        if (this.field.controlType === ControlType.select)
            this.loadOptions();
        else if (this.field.controlType === ControlType.cascadeDropdown) {
            this.subscribeToParentField();
        }
    }

    ngAfterViewChecked() {
        if (this.field.required && this.parentForm.controls[this.fieldId]) {
            this.parentForm.controls[this.fieldId].setValidators(Validators.required);
            this.parentForm.controls[this.fieldId].updateValueAndValidity();
            this.controlLoaded = true;
        }
    }

    writeValue(val: any): void {

        if (this.field.controlType === this.controlType.select || this.field.controlType === this.controlType.cascadeDropdown) {
                this.data = val ? val.toString() : null;
                if (this.field.cascadeTo) {
                    this.cascadeEvent.subject.next(new CascadeData(this.field.cascadeTo, this.data));
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
            this.onModelChanged.emit(this.data);
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
