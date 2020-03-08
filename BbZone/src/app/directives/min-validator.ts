import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

@Directive({
    selector: "[min][formControlName],[min][formControl],[min][ngModel]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MinDirective,
            multi: true
        }
    ]
})
export class MinDirective implements Validator {
    private _validator: ValidatorFn;
    //private minValue: number;
    @Input() public set min(value: string) {
        //this.minValue = parseInt(value, 10);
        this._validator = Validators.min(parseInt(value, 10));
    }

    public validate(thisControl: AbstractControl): { [key: string]: any } {
        //if (thisControl.value) {
        //    if (thisControl.value < this.minValue) {
        //        thisControl.setValue(this.minValue);
        //        return { min: true };
        //    }
        //}

        //return null;

        return this._validator(thisControl);
    }
}