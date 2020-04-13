import { Directive, ElementRef, Renderer2, Input, HostListener} from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { BroadcastService } from '../services/broadcast.service';
import { Subscription } from 'rxjs/Subscription';
import { FormSubmit } from '../model/form-submit';

declare var $: any;

@Directive({
    selector: '[mandatory][ngModel]',
    providers: [NgModel]
})

export class MandatoryValidator  {
    private subscription: Subscription;
    parentForm: NgForm;

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
        let value = this.ngModel.model;

        if (value === null || value === undefined || value === "") {
            thisElement.parent().find('.required-error').remove();
            thisElement.after('<span class= "text-danger required-error">This is required</span>');
            this.parentForm.controls[this.ngModel.name].setErrors({ 'mandatory': true });
        }
        else {
            thisElement.parent().find('.required-error').remove();
            this.parentForm.controls[this.ngModel.name].setErrors(null);
        }
    }

}