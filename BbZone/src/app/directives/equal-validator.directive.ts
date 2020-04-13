import { Directive, forwardRef, Attribute, Input, ElementRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, NgModel, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BroadcastService } from '../services/broadcast.service';
import { FormSubmit } from '../model/form-submit';

declare var $: any;

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [NgModel]
})

export class EqualValidator {
    private subscription: Subscription; 
    private _valueToCompare: number;
    parentForm: NgForm;

    @Input() errorMessage: string;
    @Input() fieldId: string;
    @Input() valueToCompare: any;
    //set valueToCompare(val: number) {
    //    this._valueToCompare = val;
    //}

    constructor(
        private el: ElementRef,
        private ngModel: NgModel,
        private formEvent: BroadcastService
    ) { }

    ngOnInit() {
        this.subscription = this.formEvent.notification.subscribe((form: FormSubmit) => {
            this.parentForm = form.template;
            this.validate();
        });
    }

    private validate() {
        let thisElement = $(this.el.nativeElement);
        $(this.el.nativeElement).next('.text-danger').remove();

        let value = this.parentForm.controls[this.fieldId].value;

        if (this.valueToCompare && value && value !== this.valueToCompare) {
            thisElement.parent().find('.equal-error').remove();
            thisElement.after(`<span class='text-danger equal-error'>${this.errorMessage}</span>`);
            this.parentForm.controls[this.fieldId].setErrors({ 'equalValidator': true });
        }
        else {
            thisElement.parent().find('.equal-error').remove();
        }
    }

    //validate(thisControl: AbstractControl): { [key: string]: any } {
    //    let myValue = thisControl.value;

    //    if (myValue) {
    //        if (this._valueToCompare && myValue !== this._valueToCompare)
    //            return { validateEqual: true };
    //    }

    //    return null;
    //}
}