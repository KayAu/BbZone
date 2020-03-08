import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateLessThan]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => LessThanValidator), multi: true }
    ]
})

export class LessThanValidator implements Validator {
    constructor(@Attribute('validateLessThan') public targetControlName: string) { }

    validate(thisControl: AbstractControl): { [key: string]: any } {
        let myValue = thisControl.value;

        if (myValue) {
            // control value (e.g. password)
            let targetControl = thisControl.root.get(this.targetControlName);

            // value not equal
            if (targetControl && myValue > targetControl.value)
                return { validateLessThan: true };
        }

        return null;
    }
}