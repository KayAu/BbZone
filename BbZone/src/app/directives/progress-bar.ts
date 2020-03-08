import { Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '.progress-bar'
})

export class ProgressBar  {
    _CurrentValue: number = 0;
    _MaxValue: number = 0;

    @Input('current-value')
    set currentValue(value: number) {
        this._CurrentValue = value;
    }

    @Input('max-value')
    set maxValue(value: number) {
        this._MaxValue = value;
    }

    constructor( private el: ElementRef) { }

    ngOnInit() {
        this.el.nativeElement.style.width = this.calculateWidth();
    }
  

    private calculateWidth() : string {
        let width = (this._CurrentValue / this._MaxValue) * 100;
        return width + '%' ;
    }


}