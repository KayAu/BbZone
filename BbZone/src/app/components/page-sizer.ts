import { Component, Output, Input,  EventEmitter } from '@angular/core';

@Component({
    selector: 'page-sizer',
    template: `<div class="dataTables_length float-right">
                    <label>Show
                    <select class="form-control form-control-sm mrg5L mrg5R" [(ngModel)]="selectedPageSize" (ngModelChanged)="selectionChanged()">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                     </select>
                    entries
                    </label>
                </div>`,
})

export class PageSizer {
    selectedPageSize: number;
    @Output() pageSizeChanged = new EventEmitter();
    @Input()
    public set defaultOption(value: number) {
        this.selectedPageSize = value;
    }

    selectionChanged() {
        this.pageSizeChanged.emit(this.selectedPageSize);
    }
}
