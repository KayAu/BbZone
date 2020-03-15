import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ListEvent } from 'src/app/interfaces/listEvent';

@Component({
    selector: 'gridview',
    templateUrl: './gridview.html'
})

export class Gridview // extends ListEvent
{
    showTotal: boolean = false;
    dataColumns: any[] = [];
    @Input() showPager: boolean = true;
    @Input() itemLink: string;
    @Input() itemKey: string;
    @Input() hideColumns: number[] = [];
    dataSource: any[] = [];
    @Input()
    set displayTotal(show: boolean) {
        this.showTotal = show;
     
    }

    @Input()
    set dataItems(data: any[]) {
        this.dataSource = data;
        if (Array.isArray(this.dataColumns) && !this.dataColumns.length)
            this.setColumnNames();
    }

    //constructor(public loaderService: LoaderService, public dataService: DataService) {
    //    super(loaderService, dataService, "");
    //    this.dataSourceSubject.asObservable().subscribe(data => this.setColumnNames());
    //}

    getRowData(row: any): any[] {
        return Object.values(row);
    }

    private setColumnNames() {
        if (this.dataSource.length === 0) return;
        let dataKeys = Object.keys(this.dataSource[0]);
        // get columns which are not visible only
        dataKeys = dataKeys.filter((key, index) => !this.hideColumns.includes(index));
        this.dataColumns = dataKeys.map(d => d.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, d[0].toUpperCase()));
    }

    private sumColumnTotal(colIndex: number) : any {
        let dataRowItem = this.dataSource[0];
        let propName = Object.keys(dataRowItem)[colIndex];

        if (typeof this.dataSource[0][Object.keys(dataRowItem)[colIndex]] === 'number') {
            return this.dataSource.reduce((sum, data) => sum + data[propName], 0);
        }

        return null;
    }

}