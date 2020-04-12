import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { SearchOrderParams, SearchCompletedOrderParams } from '../../model/search-params';
import { ApiController } from 'src/app/enums/apiController';
import { SearchFieldMapping } from 'src/app/model/form.data.mapping';
import { SearchFieldControl } from 'src/app/model/data.field.control';
import { ViewCompletedOrderColumns } from 'src/app/metadata/viewCompletedOrderColumns';
import { SearchCompletedOrderFields } from 'src/app/metadata/SearchCompletedOrderFields';


@Component({
  selector: 'view-complete-app',
  templateUrl: './view-complete-app.html'
})
export class ViewCompletedApp extends ListEvent { 
    categories: any[];
    packages: any[];
    agents: any[];
    dataRowMapper: TablerowDataMapping[] = [];
    searchFields: SearchFieldMapping[] = [];
    displayType = DataDisplayType;
    searchParams = new SearchCompletedOrderParams(null, null, null, null, null, null, null, null);
    keyField: string;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService) {
        super(loaderService, dataService, "applicationId", false);
    }

    ngOnInit() {
        this.controllerName = ApiController.CompletedApplication;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewCompletedOrderColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));
    
        return columnMappings;
    }

    getSearchFeldsMapping(): SearchFieldMapping[] {
        let columnMappings = SearchCompletedOrderFields.fields.map(o => new SearchFieldMapping(o.fieldName,
            o.displayText,
            o.width,
            !o.dataFieldControl ? null :
                new SearchFieldControl(
                    o.dataFieldControl.controlName,
                    ControlType[o.dataFieldControl.controlType],
                    o.dataFieldControl.maxLength,
                    o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null,
                    o.dataFieldControl.cascadeTo !== undefined ? o.dataFieldControl.cascadeTo : null,
                    o.dataFieldControl.placeholder !== undefined ? o.dataFieldControl.placeholder : null
                )));
  
        return columnMappings;
    }

    clearSearchParam() {
        this.searchParams = new SearchCompletedOrderParams(null, null, null, null, null, null, null, null);
        this.reloadData();
    }
}


