import { Directive, ElementRef, Renderer2, Input, HostListener} from '@angular/core';
import { NgModel } from '@angular/forms';
import { BroadcastService } from '../services/broadcast.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Directive({
    selector: '[required][ngModel]',
    providers: [NgModel]
})

export class RequiredValidator  {
    private subscription: Subscription;
    isFormSubmitted: boolean;

    //@Input('check-on')
    //set checkon(formSubmitted: boolean) {
    //    if (!formSubmitted)
    //        return;

    //    this.isFormSubmitted = formSubmitted;
    //    this.handleError();
    //}

    constructor(
        private el: ElementRef,
        private ngModel: NgModel,
        private formSubmitted: BroadcastService
    ) { }

    ngOnInit() {
        this.subscription = this.formSubmitted.notification.subscribe((res) => {
            this.handleError();
        });
    }

    @HostListener('blur') onBlur() {
        if (!this.isFormSubmitted)
            return;

        this.handleError();
    }

    private handleError() {
        let thisElement = this.isInputGroupControl() ? $(this.el.nativeElement).parent() : $(this.el.nativeElement);
        if (!thisElement[0].required) return;
        let value = this.ngModel.model;
        if (value === null || value === undefined || value === "") {
            thisElement.addClass('data-invalid');
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
        }
        else {
            if (this.ngModel.valid) {
                thisElement.removeClass('data-invalid');
                thisElement.next().remove();
            }
        }
    }

    private isInputGroupControl(): boolean {
        return $(this.el.nativeElement).parent().hasClass('input-group') ? true : false;  
    }
}