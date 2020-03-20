import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { SearchOrderParams } from '../../model/search-params';
import { ApiController } from 'src/app/enums/apiController';
import { FormDataMapping } from 'src/app/model/form.data.mapping';
import { DataFieldControl } from 'src/app/model/data.field.control';
import { ViewOrderColumns } from 'src/app/metadata/viewOrderColumns ';
import { SearchOrderFields } from 'src/app/metadata/searchOrderFields';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.html'
})
export class ViewOrder extends ListEvent { 
    categories: any[];
    packages: any[];
    agents: any[];
    dataRowMapper: TablerowDataMapping[] = [];
    searchFields: FormDataMapping[] = [];
    displayType = DataDisplayType;
    searchParams = new SearchOrderParams(null, null, null, null, null, null, null, null);

    keyField: string;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService) {
        super(loaderService, dataService, "applicationId", false);
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.controllerName = ApiController.CustomerApplication;
        //this.loadDropdown();
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewOrderColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    getSearchFeldsMapping(): FormDataMapping[] {
        let columnMappings = SearchOrderFields.fields.map(o => new FormDataMapping(o.fieldName,
            o.displayText,
            o.hidden,
            !o.dataFieldControl ? null :
                new DataFieldControl(
                    o.dataFieldControl.controlName,
                    ControlType[o.dataFieldControl.controlType],
                    o.dataFieldControl.required,
                    o.dataFieldControl.maxLength,
                    o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null,
                    o.dataFieldControl.cascadeTo !== undefined ? o.dataFieldControl.cascadeTo : null
                )));

        return columnMappings;
    }
 
    clearSearchParam() {
        this.searchParams = new SearchOrderParams(null, null, null, null, null, null, null, null);
        this.reloadData();
    }
}


