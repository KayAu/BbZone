import { Component, Inject, ViewChild } from '@angular/core';
import { ClawbackColumns } from '../../metadata/clawbackColumns';
import { TablerowDataMapping } from '../../model/tablerow.data.mapping';
import { DataDisplayType, ControlType, CustomerSearchType } from '../../enums/dataDisplayType';
import { ListDataCrud } from '../../interfaces/ListDataCrud';
import { DataFieldControl } from '../../model/data.field.control';
import { BroadcastService } from '../../services/broadcast.service';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from '../../enums/apiController';
import { StatusAndKeywordParams } from '../../model/search-params';

@Component({
    selector: 'manage-clawback',
    templateUrl: './manage-clawback.html'
})

export class ManageClawback extends ListDataCrud {

    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;
    controlType = ControlType;
    customerSearchType = CustomerSearchType;

    constructor(public loaderService: LoaderService, public dataService: DataService) {
        super(loaderService, dataService, 'clawbackId');
    }

    ngOnInit() {
        this.formName = "tableForm";
        this.controllerName = ApiController.Clawback;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new StatusAndKeywordParams(null, null);
        this.initDataRecord(this.dataRowMapper);
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ClawbackColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
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

    setNewCustomerDetails(data) {
        if (data) {
            this.newRecord['applicationId'] = data.applicationId;
            this.newRecord['orderNo'] = data.orderNo;
            this.newRecord['agent'] = data.agent;
        }
        else {
            this.newRecord['applicationId'] = '';
            this.newRecord['orderNo'] = '';
            this.newRecord['agent'] = '';
        }
    }

    setEditCustomerDetails(data) {
        if (data) {
            this.editedRecord['applicationId'] = data.applicationId;
            this.editedRecord['orderNo'] = data.orderNo;
            this.editedRecord['agent'] = data.agent;
        }
        else {
            this.editedRecord['applicationId'] = '';
            this.editedRecord['orderNo'] = '';
            this.editedRecord['agent'] = '';
        }
    }
}
