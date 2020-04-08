import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from 'src/app/enums/apiController';
import { CommissionTableDisplay } from '../../enums/dataDisplayType';

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
    agentId: number;
    displayType = CommissionTableDisplay;
    tableDisplay: CommissionTableDisplay;
    isUpdating: boolean = false;
    @Input() itemKey: string;
    @Input() hideColumns: number[] = [];
    @Output() rowItemClicked = new EventEmitter();

    constructor(public loaderService: LoaderService, public dataService: DataService) {}

    loadMyAgentsCommission(productId: number) {
        this.productId = productId;
        this.tableDisplay = CommissionTableDisplay.allAgents;
        this.dataService.get(`${ApiController.Commission}/GetMyAgentsCommission`, productId).subscribe(results => {
            this.dataSource = results;
            this.setColumnNames();            
        });
    }

    loadCurrentAgentCommission(agentId: number, productId: number) {
        this.productId = productId;
        this.agentId = agentId;
        this.tableDisplay = CommissionTableDisplay.currentAgent;
        this.dataService.get(`${ApiController.Commission}/GetMyCommission/${agentId}/${productId}`).subscribe(results => {
            this.commissionSettings = results;
        });
    }

    getRowData(row: any): any[] {
        return Object.values(row);
    }

    editRow(rowIndex: number) {
        this.agentId = this.dataSource[rowIndex].agentId;
        this.dataService.getAll(`${ApiController.Commission}/GetAgentCommissionSettings/${this.agentId }/${this.productId}`).subscribe(results => {
            this.hideEditingRow();
            this.dataSource[rowIndex].onEdit = true;
            this.commissionSettings = results;
        });
    }

    updateRow(rowIndex: number)
    {
        this.dataService.update(ApiController.Commission, this.agentId, this.commissionSettings).subscribe(data => {
            let propertyNames = Object.keys(this.dataSource[rowIndex]);
            for (var itemNo = 0; itemNo < this.commissionSettings.length; itemNo++) {
                let propertyName = propertyNames[itemNo + 2];
                this.dataSource[rowIndex][propertyName] = this.commissionSettings[itemNo].agentCommissionPer;
            }           
            this.dataSource[rowIndex].onEdit = false;
        });
    }

    updateTable() {
        this.isUpdating = true;
        this.dataService.update(ApiController.Commission, this.agentId, this.commissionSettings).subscribe(data => {
            this.isUpdating = false;
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
        this.dataColumns = dataKeys.map(data => data.replace(/([a-z])([A-Z])/g, '$1 $2'));
    }

}
