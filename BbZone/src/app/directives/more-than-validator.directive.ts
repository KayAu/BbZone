import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateMoreThan]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MoreThanValidator), multi: true }
    ]
})

export class MoreThanValidator implements Validator {
    constructor(@Attribute('validateMoreThan') public targetControlName: string) { }

    validate(thisControl: AbstractControl): { [key: string]: any } {
        let myValue = thisControl.value;

        if (myValue) {
            // control value (e.g. password)
            let targetControl = thisControl.root.get(this.targetControlName);

            // value not equal
            if (targetControl && myValue < targetControl.value)
                return { validateMoreThan: true };
        }
        return null;
    }
}