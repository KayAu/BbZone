import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType, CustomerSearchType } from 'src/app/enums/dataDisplayType';
import { ApiController } from 'src/app/enums/apiController';
import { DataFieldControl } from 'src/app/model/data.field.control';
import { FormDataMapping } from '../../model/form.data.mapping';
import { ViewIncentiveReceivedColumns } from 'src/app/metadata/viewIncentiveColumns';
import { SearchIncentivesParams } from 'src/app/model/search-params';
import { SearchIncentiveFields } from 'src/app/metadata/searchIncentiveFields';
import { ListDataCrud } from 'src/app/interfaces/ListDataCrud';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';

@Component({

    selector: 'view-incentives',
    templateUrl: './view-incentives.html'
})

export class ViewIncentives extends ListDataCrud {
    dataRowMapper: TablerowDataMapping[] = [];
    searchFields: FormDataMapping[] = [];
    displayType = DataDisplayType;
    controlType = ControlType;
    customerSearchType = CustomerSearchType;
    searchParams = new SearchIncentivesParams(null, null, null, null, null);
    keyField: string;   
    totalAmountReceived: any;
    downloadUrl: string;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService) {
        super(loaderService, dataService, 'incPymntId', formEvent);
        this.dataSourceSubject.asObservable().subscribe((data: any) => {
            this.totalAmountReceived = data.totalAmountReceived;
        });
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.controllerName = ApiController.Incentives;
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewIncentiveReceivedColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
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

    getSearchFeldsMapping(): FormDataMapping[] {
        let columnMappings = SearchIncentiveFields.fields.map(o => new FormDataMapping(o.fieldName,
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
        this.searchParams = new SearchIncentivesParams(null, null, null, null, null);
        this.reloadData();
    }

    exportRecords() {
        this.dataService.export(`${ApiController.Download}/Incentives`, this.searchParams).subscribe(data => {         
            let filename = `Incentives_${formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US')}.xlsx`;
            const file: Blob = new Blob([data], { type: 'application/xlsx' });
            saveAs(file, filename);
        });
    }

    setNewCustomerDetails(data) {
        if (data) {
            this.newRecord['applicationId'] = data.applicationId;
            this.newRecord['orderNo'] = data.orderNo;
            this.newRecord['packageName'] = data.packageName;
            this.newRecord['productName'] = data.productName;
            this.newRecord['category'] = data.category;
            this.newRecord['isActive'] = true;
        }
        else {
            this.newRecord['applicationId'] = '';
            this.newRecord['orderNo'] = '';
            this.newRecord['packageName'] = '';
            this.newRecord['productName'] = '';
            this.newRecord['category'] = '';
            this.newRecord['isActive'] = true;
        }
    }

}


