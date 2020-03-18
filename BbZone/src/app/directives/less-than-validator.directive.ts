import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateLessThan]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => LessThanValidator), multi: true }
    ]
})

export class LessThanValidator implements Validator {
    //constructor(@Attribute('validateLessThan') public targetControlName: string) { }
    private _valueToCompare: number;

    @Input('compare-value')
    set valueToCompare(val: number) {
        this._valueToCompare = val;
    }

    validate(thisControl: AbstractControl): { [key: string]: any } {
        let myValue = thisControl.value;

        if (myValue) {
            // value not equal
            if (this._valueToCompare && myValue > this._valueToCompare)
                return { validateLessThan: true };
        }

        return null;
    }
}