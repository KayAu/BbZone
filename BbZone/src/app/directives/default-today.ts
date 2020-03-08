import { Directive, ElementRef,  } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Directive({
    selector: '[default-today]',
    providers: [NgModel, DatePipe]
})
     
export class DefaultToday  {

    constructor(private model: NgModel, private datepipe: DatePipe) { }


    ngOnInit() {
        let today = this.datepipe.transform((new Date()), 'yyyy-MM-dd');
        this.model.valueAccessor.writeValue(today);
    }


}