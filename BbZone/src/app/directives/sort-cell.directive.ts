import { Directive, ElementRef, Output, Input, Renderer, Renderer2, EventEmitter, HostListener } from '@angular/core';
import { Sort } from '../model/sort.model';
import { SortableDirective } from '../directives/sortable.directive';

@Directive({
  selector: '[sort-cell]'
})

export class SortCellDirective {
  private _IsAscOrder: boolean;
  private _HeaderName: string;

  @Input('sort-cell')
  set headerName(name: string) {
    this._HeaderName = name;
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private table: SortableDirective) {
    table.sorted.subscribe(sort => this.updateSortStatus(sort));
  }

  ngOnInit() {
    if (!this._HeaderName) return;

    this._IsAscOrder = null;
    this.setCss(this._IsAscOrder);
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    this._IsAscOrder = !this._IsAscOrder;
    this.table.sort(new Sort(this._HeaderName, this._IsAscOrder));  
  }

  private updateSortStatus(sortedColumn: Sort) {
    if (sortedColumn.header === this._HeaderName) {
      this.setCss(sortedColumn.isAscOrder);
    }
    else {
      this.setCss(null);
    }
  }

  private setCss(ascOrder: boolean) {
    
    this.clearCss();

    switch (ascOrder) {
      case true: {
        this.renderer.addClass(this.el.nativeElement, 'sorting_asc');
        break;
      }
      case false: {
        this.renderer.addClass(this.el.nativeElement, 'sorting_desc');
        break;
      }
      default: {
        this.renderer.addClass(this.el.nativeElement, 'sorting');
        break;
      }
    }
  }

  private clearCss() {
    this.renderer.removeClass(this.el.nativeElement, 'sorting');
    this.renderer.removeClass(this.el.nativeElement, 'sorting_asc');
    this.renderer.removeClass(this.el.nativeElement, 'sorting_desc');
  }
}
