import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

@Directive({
    selector: "[max][formControlName],[max][formControl],[max][ngModel]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MaxDirective,
            multi: true
        }
    ]
})
export class MaxDirective implements Validator {
   // private maxValue: number;
    private _validator: ValidatorFn;
    @Input() public set max(value: string) {
       // this.maxValue = parseInt(value, 10);
        this._validator = Validators.max(parseInt(value, 10));
    }

    public validate(thisControl: AbstractControl): { [key: string]: any } {
        return this._validator(thisControl);
        //if (thisControl.value) {
        //    if (thisControl.value > this.maxValue) {
        //        thisControl.setValue(this.maxValue);
        //        return { max: true };
        //    }
        //}
        //return null;
    }

    //private _validator: ValidatorFn;
    //@Input() public set max(value: string) {
    //    this._validator = Validators.max(parseInt(value, 10));
    //}

    //public validate(control: AbstractControl): { [key: string]: any } {
    //    return this._validator(control);
    //}
}