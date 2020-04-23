import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { StatusAndKeywordParams, ApprovalParams } from '../../model/search-params';
import { ApiController } from 'src/app/enums/apiController';
import { AgentMaintenanceColumns } from 'src/app/metadata/agentFields';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
    selector: 'agent-maintenance',
    templateUrl: './agent-maintenance.html'
})

export class AgentMaintenance extends ListEvent {
    keyField: string;
    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;

    constructor(public loaderService: LoaderService, public dataService: DataService) {
        super(loaderService, dataService, '', false);
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new StatusAndKeywordParams(null, null);
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.controllerName = ApiController.Agent;
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = AgentMaintenanceColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    clearSearchParam() {
        this.searchParams = new StatusAndKeywordParams(null, null);
        this.reloadData();
    }

    exportRecords() {
        this.dataService.export(`${ApiController.Download}/Agent`, this.searchParams).subscribe(data => {
            let filename = `Agents_${formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US')}.xlsx`;
            const file: Blob = new Blob([data], { type: 'application/xlsx' });
            saveAs(file, filename);
        });
    }
}

