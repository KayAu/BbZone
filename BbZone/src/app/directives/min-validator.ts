import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
import { NgModel, NgForm} from '@angular/forms';
import { BroadcastService } from '../services/broadcast.service';
import { Subscription } from 'rxjs/Subscription';
import { FormSubmit } from '../model/form-submit';

declare var $: any;

@Directive({
    selector: "[min][formControlName],[min][formControl],[min][ngModel]",
    providers: [NgModel]
})
export class MinDirective  {
    private subscription: Subscription;
    parentForm: NgForm;
    isFormSubmitted: boolean;
    minValue: number;

    @Input() fieldId: string;
    @Input() public set min(value: number) {
        this.minValue = value;
    }

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
        if (value === null || value === undefined) {
            thisElement.after('<span class= "text-danger">This is required</span>');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else if (value === 0) {
            thisElement.after(`<span class= 'text-danger'>This field must have a min value above ${this.minValue} </span>`);
            this.parentForm.controls[this.fieldId].setErrors({ 'min': true });
        }
    }
    
    //private _validator: ValidatorFn;
    ////private minValue: number;
    //@Input() public set min(value: string) {
    //    //this.minValue = parseInt(value, 10);
    //    this._validator = Validators.min(parseInt(value, 10));
    //}

    //public validate(thisControl: AbstractControl): { [key: string]: any } {
    //    //if (thisControl.value) {
    //    //    if (thisControl.value < this.minValue) {
    //    //        thisControl.setValue(this.minValue);
    //    //        return { min: true };
    //    //    }
    //    //}

    //    //return null;

    //    return this._validator(thisControl);
    //}
}