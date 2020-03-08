import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../model/page.model';
import { Observable } from 'rxjs';
const pageDisplayLimit = 8;
@Component({
  selector: 'pager',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})

export class Pagination {
    @Output() pageClick = new EventEmitter();

    pageButtons: any[] = [];
    page: Page = new Page();
    pageDesc: string;
    disabledNextAndLastBtn: boolean = false;
    disabledFirstAndPrevBtn: boolean = false;
    private _totalRecord: number;

    ngOnInit() {
        this.page.pageSize = 30;
        this.resetToFirstPage();
    }

    goToPage(pageNo: number) {
        this.page.currentPage = pageNo;
        this.disabledNextAndLastBtn = this.page.currentPage >= this.page.totalPages ? true : false;
        this.disabledFirstAndPrevBtn = this.page.currentPage === 1 ? true : false;
        this.setPager();
        this.pageClick.emit(this.page);
    }

    goNext() {
        if (this.page.currentPage === this.page.totalPages) return;

        this.page.currentPage++;
        this.pageClick.emit(this.page);

        if (this.page.currentPage > this.page.endPage) {
            this.page.startPage = this.page.currentPage;
            this.page.endPage = (this.page.currentPage + pageDisplayLimit) - 1;
        }

        this.disabledNextAndLastBtn = this.page.endPage >= this.page.totalPages ? true : false;
        this.disabledFirstAndPrevBtn = false;
        this.loadPagerButtons();
        this.setPager();
    }

    goPrevious() {
        if (this.page.currentPage === this.page.totalPages) return;

        this.page.currentPage--;
        this.pageClick.emit(this.page);

        if (this.page.currentPage < this.page.startPage) {
            this.page.startPage = (this.page.currentPage - pageDisplayLimit) + 1;
            this.page.endPage = this.page.currentPage;
        }

        this.disabledFirstAndPrevBtn = this.page.currentPage === 1 ? true : false;
        this.disabledNextAndLastBtn = this.page.totalPages === 1 ? true : false;
        this.loadPagerButtons();
        this.setPager();
    }

    goFirstPage() {
        this.resetToFirstPage();
    }

    goLastPage() {
        this.page.currentPage = this.page.totalPages;
        this.pageClick.emit(this.page);

        if (this.page.totalPages > pageDisplayLimit) {
            this.page.startPage = (this.page.totalPages - pageDisplayLimit) + 1;
            this.page.endPage = this.page.totalPages;
        }

        this.disabledFirstAndPrevBtn = false;
        this.disabledNextAndLastBtn = true;
        this.loadPagerButtons();
        this.setPager();
    }

    @Input()
    set totalRecord(totalNo: number) {
        if (!totalNo) return;

        this._totalRecord = totalNo;
        this.page.totalPages = Math.ceil(totalNo / this.page.pageSize);
        this.updatePager();
    }

    isActivePage(pagerIndex: number): boolean {
        return pagerIndex === this.page.currentPage;
    }

    private setPager() {
        let toRow = this.page.currentPage * this.page.pageSize;
        let fromRow = (toRow - this.page.pageSize) + 1;

        if (toRow >= this._totalRecord)
            toRow = this._totalRecord;

        this.pageDesc = `Showing ${fromRow} to ${toRow} of ${this._totalRecord} entries`;
    }

    private loadPagerButtons() {
        this.pageButtons = [];
        for (let pageNo = this.page.startPage; pageNo <= this.page.endPage; pageNo++) {
            this.pageButtons.push(pageNo);
        }
    }

    private resetToFirstPage() {

        this.updatePager();
        this.pageClick.emit(this.page);
    }

    private updatePager() {
        this.page.currentPage = 1;
        this.page.startPage = 1;
        this.page.endPage = this.page.totalPages > pageDisplayLimit ? pageDisplayLimit : this.page.totalPages;
        this.disabledFirstAndPrevBtn = true;
        this.disabledNextAndLastBtn = this.page.totalPages === 1 ? true : false;
        this.loadPagerButtons();
        this.setPager();
    }
}
