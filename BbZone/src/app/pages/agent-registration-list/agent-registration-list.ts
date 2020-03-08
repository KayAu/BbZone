import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { StatusAndKeywordParams, ApprovalParams } from '../../model/search-params';
import { ApiController } from 'src/app/enums/apiController';
import { AgentRegistrationColumns } from 'src/app/metadata/agentFields';
import { ApprovalMode } from "src/app/enums/RecordMode";


@Component({
    selector: 'agent-registration-list',
    templateUrl: './agent-registration-list.html'
})

export class AgentRegistrationList extends ListEvent {
    keyField: string;
    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;
    approvalMode = ApprovalMode;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService) {
        super(loaderService, dataService, '', false);
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new ApprovalParams(ApprovalMode.All, null);
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.controllerName = ApiController.Registration;
        //this.loadDropdown();
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = AgentRegistrationColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.readonly,
            o.colWidth));

        return columnMappings;
    }
 
    //getSearchFeldsMapping(): FormDataMapping[] {
    //    let columnMappings = SearchOrderFields.fields.map(o => new FormDataMapping(o.fieldName,
    //        o.displayText,
    //        o.readonly,
    //        !o.dataFieldControl ? null :
    //            new DataFieldControl(
    //                o.dataFieldControl.controlName,
    //                ControlType[o.dataFieldControl.controlType],
    //                o.dataFieldControl.required,
    //                o.dataFieldControl.maxLength,
    //                o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null,
    //                o.dataFieldControl.cascadeTo !== undefined ? o.dataFieldControl.cascadeTo : null
    //            )));

    //    return columnMappings;
    //}


    clearSearchParam() {
        this.searchParams = new ApprovalParams(ApprovalMode.All, null);
        this.reloadData();
    }
}

