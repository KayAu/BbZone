import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from 'src/app/enums/apiController';

@Component({
    selector: 'agent-commission-table',
    templateUrl: './agent-commission-table.html'
})

export class AgentCommissionTable 
{
    dataSource: any[] = [];
    dataColumns: any[] = [];
    commissionSettings: any[] = [];
    editedRecord = {};
    productId: number;

    @Input() itemKey: string;
    @Input() hideColumns: number[] = [];
    @Output() rowItemClicked = new EventEmitter();


    //@Input()
    //set dataItems(data: any[]) {
    //    this.dataSource = data;
    //    if (Array.isArray(this.dataColumns) && !this.dataColumns.length)
    //        this.setColumnNames();
    //}

    constructor(public loaderService: LoaderService, public dataService: DataService) {}

    loadData(productId: number) {
        this.productId = productId;
        this.dataService.get(`${ApiController.Commission}/GetMyAgentCommission`, productId).subscribe(results => {
            this.dataSource = results;
            this.setColumnNames();            
        });
    }

    getRowData(row: any): any[] {
        return Object.values(row);
    }

    editRow(rowIndex: number) {
        
        this.dataService.getAll(`${ApiController.Commission}/GetAgentCommissionSettings/${this.dataSource[rowIndex].agentId}/${this.productId}`).subscribe(results => {
            this.hideEditingRow();
            this.dataSource[rowIndex].onEdit = true;
            this.commissionSettings = results;
        });
    }

    updateRow(rowIndex: number)
    {
        this.dataService.update(ApiController.Commission, this.dataSource[rowIndex].agentId, this.commissionSettings).subscribe(data => {
            let propertyNames = Object.keys(this.dataSource[rowIndex]);
            for (var itemNo = 0; itemNo < this.commissionSettings.length; itemNo++) {
                let propertyName = propertyNames[itemNo + 2];
                this.dataSource[rowIndex][propertyName] = this.commissionSettings[itemNo].agentCommissionPer;
            }           
            this.dataSource[rowIndex].onEdit = false;
        });
    }

    cancelEdit(rowIndex: number) {
        this.dataSource[rowIndex].onEdit = false;
        this.commissionSettings = [];
    }

    private hideEditingRow() {
        this.dataSource.forEach(function (element, index, array) {
            array[index].onEdit = false;
        });
    }

    private setColumnNames() {
        if (this.dataSource.length === 0) return;
        let dataKeys = Object.keys(this.dataSource[0]);
        // get columns which are not visible only
        dataKeys = dataKeys.filter((key, index) => !this.hideColumns.includes(index));
        this.dataColumns = dataKeys;
    }

}
