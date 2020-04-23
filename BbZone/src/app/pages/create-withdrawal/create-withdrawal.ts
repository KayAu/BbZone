import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { ApiController } from 'src/app/enums/apiController';

import { CreateWithdrawalColumns } from '../../metadata/createWithdrawalColumns';
import { SearchWithdrawalToSubmitParams } from 'src/app/model/search-params';
import { Router } from '@angular/router';

@Component({
    selector: 'create-withdrawal',
    templateUrl: './create-withdrawal.html'
})
export class CreateWithdrawal extends ListEvent {
    isUpdating: boolean = false;
    dataRowMapper: TablerowDataMapping[] = [];
    selectedItems: any[] = []; 
    defaultSelectedItems: any[] = []; 
    displayType = DataDisplayType;
    totalAmountToDeduct: any = 0;
    totalSelectedAmount: any = 0;
    totalIncentives: any = 0;
    totalClaimableAmount: any = 0;
    allowSubmit: boolean = true;
    oriDataSource: any[] = [];
    viewSelectedItems: boolean = false;

    constructor(public loaderService: LoaderService, public dataService: DataService, private formEvent: BroadcastService, private router: Router) {
        super(loaderService, dataService, '', false);
        this.dataSourceSubject.asObservable().subscribe((data: any)  => {
            this.totalAmountToDeduct = data.totalAmountToDeduct;
            this.totalIncentives = data.totalIncentives;
            this.totalClaimableAmount = (this.totalSelectedAmount + data.totalIncentives) - data.totalAmountToDeduct;
            this.setDefaultSelectedItems();
            this.setSelectedItems();
        });
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new SearchWithdrawalToSubmitParams(null, null);
        this.controllerName = ApiController.WithdrawalSubmit;
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = CreateWithdrawalColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    itemSelected(item) {
        if (item.selected) {
            if (!this.selectedItems.includes(item))
                this.selectedItems.push(item);
        }
        else {
            let index = this.selectedItems.findIndex(p => p.claimCommId === item.claimCommId);
            if (index >= 0)
                this.selectedItems.splice(index, 1);
        }

        this.totalSelectedAmount = this.selectedItems.map(d => d.claimAmount).reduce((a, b) => a + b, 0);
        this.totalClaimableAmount = this.totalSelectedAmount === 0 ? 0 : (this.totalSelectedAmount + this.totalIncentives) - this.totalAmountToDeduct;
        this.allowSubmit = this.totalClaimableAmount > 0 ? true : false;
    }

    submit() {
        let claimItems = this.selectedItems.concat(this.defaultSelectedItems);
        let newRecord = {
            withdrawalItems: claimItems,
            withdrawAmount: this.totalClaimableAmount,
            claimed: this.totalSelectedAmount,
            incentives: this.totalIncentives,
            deduction: this.totalAmountToDeduct
        }

        this.dataService.postForm(ApiController.WithdrawalSubmit, newRecord).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-withdrawal']);
        });
    }

    setSelectedItems() {
        this.dataSource.forEach((selectedItem, i, self) => {
            if (this.selectedItems.find(p => p.claimCommId === selectedItem.claimCommId)) {
                self[i].selected = true;
            }
        });
    }

    showSelectedItems() {
        this.viewSelectedItems = !this.viewSelectedItems;
        if (this.viewSelectedItems) {
            this.oriDataSource = (<any>Object).assign(this.oriDataSource, this.dataSource);
            this.dataSource = this.selectedItems;
        }
        else {
            this.dataSource = this.oriDataSource;
        }
    }

    filterDataByDate() {
        if (!this.searchParams.submittedDate.startDate || !this.searchParams.submittedDate.endDate ) return;
        this.reloadData();
    }

    clearSearchParam() {
        this.searchParams = new SearchWithdrawalToSubmitParams(null, null);
        this.reloadData();
    }

    setDefaultSelectedItems() {
        if (this.defaultSelectedItems.length === 0) {
            let defaultItems = this.dataSource.filter(i => i.selected === true);
            defaultItems.forEach((item, i, self) => {
                this.defaultSelectedItems.push(item);
            });
        }
    }
}


