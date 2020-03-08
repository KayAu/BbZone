import { Directive, ElementRef, Renderer2, Input, HostListener} from '@angular/core';
import { NgModel } from '@angular/forms';
import { BroadcastService } from '../services/broadcast.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Directive({
    selector: '[no-empty-row][ngModel]',
    providers: [NgModel]
})

export class NoEmptyRowValidator  {
    private subscription: Subscription;
    isFormSubmitted: boolean;

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

    private handleError() {

        let value = this.ngModel.model;
        let thisElement = $(this.el.nativeElement);

        if (value === null || value === undefined || value.length === 0) {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
        }
        else {
            thisElement.next().remove();
        }
    }

}