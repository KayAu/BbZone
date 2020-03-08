import { Directive, ElementRef, Attribute, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[scrollToView]'
})

export class ScrollToView {


    @Input() set scrollToView(itemNo: number) {
        if (itemNo>=0) {
            this.el.nativeElement.querySelector('.myClass').scrollIntoView({ behavior: "smooth" });
        }
    }

    constructor(private el: ElementRef) {
    
    }
}