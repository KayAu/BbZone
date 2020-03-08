import { Page } from '../model/page.model';
import { Sort } from '../model/sort.model';
import { DataService } from '../services/data.service';
import { LoaderService } from '../loader/loader.service';
import { Subject } from 'rxjs';

export abstract class ListEvent {
    searchParams: any;
    listPage: Page;
    sortBy: Sort;
    totalRecords: number;
    dataSource: any[] = [];
    controllerName: string; 
    dataSourceSubject = new Subject<string>()

    //dataSourceObs = this.dataSourceSub.asObservable();

    constructor(public loaderService: LoaderService, public dataService: DataService, public defaultSortField, public sortInAsc?: boolean) {
        sortInAsc = !sortInAsc ? false : sortInAsc;
        this.sortBy = new Sort(defaultSortField, sortInAsc);
    }

    pageChanged(event) {
        this.listPage = event;
        this.loadDataList();
    }

    sortList(event) {
        this.sortBy = event;
        this.loadDataList();
    }

    displaySearchItem(event) {
        this.loadDataList();
    }

    setListDisplay(data: any) {
        this.dataSource = data.displayData;
        this.totalRecords = data.totalRecords;
    }

    resetSorting() {
        this.sortBy = new Sort(this.defaultSortField, false);
    }

    reloadData() {
        this.listPage.currentPage = 1;
        this.resetSorting();
        this.loadDataList();
    }

  private loadDataList() {

        if (this.controllerName) {
            this.dataService.getListDataByPage(this.controllerName, this.listPage.currentPage, this.listPage.pageSize, this.searchParams, this.sortBy.header, this.sortBy.isAscOrder)
                .subscribe(data => {
                    this.setListDisplay(data);
                    this.dataSourceSubject.next(data);
                });
        }
  }

 
}
