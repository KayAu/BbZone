import { Directive, ElementRef, Renderer2, Input, HostListener} from '@angular/core';
import { NgModel } from '@angular/forms';
import { BroadcastService } from '../services/broadcast.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Directive({
    selector: '[no-empty-cell][ngModel]',
    providers: [NgModel]
})

export class NoEmptyCellValidator  {

    constructor(
        private el: ElementRef,
        private ngModel: NgModel
    ) { }



    @HostListener('blur', ['$event'])
    onBlur(event) {
        let value = this.ngModel.model;
        if (value === null || value === undefined || value === '') {
            event.stopPropagation();
            this.el.nativeElement.focus();
        }
    }
}

