import { Directive, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[format-date][ngModel]',
    providers: [NgModel],
    //host: {
    //    '(ngModelChange)': 'onInputChange($event)'
    //}
})

export class FormatDateDirective {

    @Output() dateFormatted = new EventEmitter();

   // constructor(private el: ElementRef, private ngModel: NgModel) {}
    constructor(private el: ElementRef) { }
    ngOnInit() {
        //this.checkDateFormat(this.ngModel.model);       
    }

    onInputChange(event) {
        this.checkDateFormat(event);
    }

    @Input() set ngModel(value: any) {
        //listen to the input value change of ngModel and change in the plugin accordingly.
        this.checkDateFormat(value);
    }
    checkDateFormat(date) {
        if (!date) return;

        if (date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/g)) {
            let newDate = this.formatDate(date);
            //this.ngModel.valueAccessor.writeValue(newDate);
            this.dateFormatted.emit(newDate);
            //this.el.nativeElement.value = newDate;
        }
    }

    formatDate(date) {
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let formattedDate = month + '/' + day + '/' + year;
        return formattedDate;
    }
}
