import { Directive, Output, Input, EventEmitter, Injectable  } from '@angular/core';
import { Sort } from '../model/sort.model';

@Directive({
  selector: '[sortable]'
})

export class SortableDirective {
  public sorted: EventEmitter<Sort>;

  @Output() onHeaderClick = new EventEmitter<Sort>();
  @Input('sort-column')
  set sortColumn(sortColumn: Sort) {
    this.sorted.emit(sortColumn);
  }

  constructor() {
    this.sorted = new EventEmitter();
  }

  public sort(sortColumn: Sort): void {
    this.onHeaderClick.emit(sortColumn);
  }
  
}
