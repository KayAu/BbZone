import { Component, Output, Input, EventEmitter, ElementRef, forwardRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, NgForm } from '@angular/forms';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { Subscription } from 'rxjs';
import { FormSubmit } from 'src/app/model/form-submit';

declare var $: any;

@Component({
    selector: 'product-options',
    templateUrl: './product-options.html',
    styleUrls: ['./product-options.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductOptions),
            multi: true
        }
    ]
})

export class ProductOptions implements ControlValueAccessor {
    private subscription: Subscription;
    private parentForm: NgForm;
    products: any[];
    selectedProduct: any;

    @Input() fieldId: string;
    @Input() required: boolean;
    @Output() onProductSelected = new EventEmitter();
    @Output() propagateChange: any = () => { };

    constructor(private dataService: DataService, private el: ElementRef, private formEvent: BroadcastService) { }

    ngOnInit() {
        this.loadOptions();
        if (this.required) {
            this.subscription = this.formEvent.notification.subscribe((form: FormSubmit) => {
                this.parentForm = form.template;
                this.validate();
            });
        }
    }

    loadOptions() {
        this.dataService.getAll(`${ApiController.Dropdown}/GetProducts`).subscribe(results => {
            this.products = results;
        });
    }

    onClick(productId: number, itemNo: number) {

        this.selectedProduct = this.products[itemNo];
        this.propagateChange(productId);
        this.onProductSelected.emit();
        //this.onProductSelected.emit(productId);
    }

    clearSelection() {
        this.selectedProduct = null;
    }

    private validate() {
        let thisElement = $(this.el.nativeElement);

        if (this.selectedProduct === null || this.selectedProduct === undefined || this.selectedProduct === "") {
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
        thisElement.next().remove();
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    setChanges() {}
    writeValue() { }
    registerOnTouched() { }
    setDisabledState?() { }
}


