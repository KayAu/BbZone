import { Component, Inject, ViewChild } from '@angular/core';
import { AgentPocketColumns } from '../../metadata/agentPocketColumns';
import { TablerowDataMapping } from '../../model/tablerow.data.mapping';
import { DataDisplayType, ControlType } from '../../enums/dataDisplayType';
import { ListDataCrud } from '../../interfaces/ListDataCrud';
import { DataFieldControl } from '../../model/data.field.control';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from '../../enums/apiController';
import { StatusAndKeywordParams } from '../../model/search-params';

@Component({
    selector: 'agent-pocket',
    templateUrl: './agent-pocket.html'
})

export class AgentPocket extends ListDataCrud {

    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;
    controlType = ControlType;

    constructor(public loaderService: LoaderService, public dataService: DataService) {
        super(loaderService, dataService, "agentPktId");
    }

    ngOnInit() {
        this.formName = "tableForm";
        this.controllerName = ApiController.AgentPocket;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new StatusAndKeywordParams(null, null);
        this.initDataRecord(this.dataRowMapper);
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = AgentPocketColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth,
            !o.dataFieldControl ? null :
            new DataFieldControl(
                o.dataFieldControl.controlName,
                ControlType[o.dataFieldControl.controlType],
                o.dataFieldControl.required,
                o.dataFieldControl.maxLength,
                o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null
            )));

        return columnMappings;
    }
}
