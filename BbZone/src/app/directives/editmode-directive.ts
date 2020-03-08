import { Directive, ElementRef, Input, Renderer, Renderer2 } from '@angular/core';

@Directive({
  selector: '[edit-mode]'
})

export class EditModeDirective {
  private _editMode: boolean;

  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  @Input('edit-mode')
  set editMode(val: boolean) {
    this._editMode = val;
    if (this._editMode) {
      this.renderer.addClass(this.el.nativeElement, 'row-edit');
    }
    else {
      this.renderer.removeClass(this.el.nativeElement, 'row-edit');
    }
  }
}
