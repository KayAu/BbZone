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
import { AuthenticationService } from '../../services/authentication';
import { LoginUser } from '../../model/login-user';
import { SearchFieldControl } from '../../model/data.field.control';

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
    totalWithdrawalAmt: any = 0;
    totalClaimedItems: any = 0;
    allowSubmit: boolean = true;
    oriDataSource: any[] = [];
    viewSelectedItems: boolean = false;
    selectAllItems: boolean = false;
    currentUser: LoginUser;
    agentField: SearchFieldControl;
    selectedAgent: any;

    constructor(public loaderService: LoaderService, public dataService: DataService, private authenticationService: AuthenticationService, private formEvent: BroadcastService, private router: Router) {
        super(loaderService, dataService, '', false);
        this.dataSourceSubject.asObservable().subscribe((data: any) => {
            //this.selectAllItems = false;
            //this.totalClaimedItems = 0;
            this.totalAmountToDeduct = data.totalAmountToDeduct;
            this.totalIncentives = data.totalIncentives;
            this.totalWithdrawalAmt = (this.totalSelectedAmount + data.totalIncentives) - data.totalAmountToDeduct;
            this.setDefaultSelectedItems();
            this.setSelectedItems();
            this.checkAllItemsSelected();
        });
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new SearchWithdrawalToSubmitParams(null, null, null);
        this.controllerName = ApiController.WithdrawalSubmit;

        this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user; 
            this.searchParams.agent = user.username;
            if (user.isAdmin) {
                this.agentField = new SearchFieldControl("agent", ControlType.select, 0, "GetAgents");
            }
        });
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
            const index = this.selectedItems.findIndex(p => p.claimCommId === item.claimCommId);
            if (index >= 0)
                this.selectedItems.splice(index, 1);
        }

        this.updateWithdrawalAmt();
        this.checkAllItemsSelected();
    }

    allItemsSelected() {
        this.dataSource.forEach((selectedItem, i, self) => {              
            if (self[i].transactionType === 'Own Sales' || self[i].transactionType === 'Override') {  
                if (this.selectAllItems) {
                    if (self[i].selected !== this.selectAllItems) {
                        this.selectedItems.push(self[i]);
                    }     
                }
                else {
                    this.selectedItems.splice(this.selectedItems.indexOf(self[i]), 1);
                }
                self[i].selected = this.selectAllItems;
            }
        });

        this.updateWithdrawalAmt();
    }

    getAgentWithdrawalItems() {
        this.searchParams.agent = this.selectedAgent;
        this.reloadData();
    }

    submit() {
        let claimItems = this.selectedItems.concat(this.defaultSelectedItems);
        let newRecord = {
            withdrawalItems: claimItems,
            withdrawAmount: this.totalWithdrawalAmt,
            claimed: this.totalSelectedAmount,
            incentives: this.totalIncentives,
            deduction: this.totalAmountToDeduct,
            agent: this.selectedAgent ? this.selectedAgent: null
        }

        this.isUpdating = true;
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
        this.selectedAgent = null;
        this.searchParams = new SearchWithdrawalToSubmitParams(null, null, this.currentUser.username);
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

    private updateWithdrawalAmt() {
        this.totalSelectedAmount = this.selectedItems.map(d => d.claimAmount).reduce((a, b) => a + b, 0);
        this.totalWithdrawalAmt = this.totalSelectedAmount === 0 ? 0 : (this.totalSelectedAmount + this.totalIncentives) - this.totalAmountToDeduct;
        this.allowSubmit = this.totalWithdrawalAmt > 0 ? true : false;
    }

    private checkAllItemsSelected() {
        if (this.dataSource.length === 0) return;
        const selectableItems = this.dataSource.filter(i => i.transactionType === 'Own Sales' || i.transactionType === 'Override');
        const selectedItems = selectableItems.filter(i => i.selected === true);
        this.selectAllItems = selectableItems.length === selectedItems.length ? true : false;
    }
}


