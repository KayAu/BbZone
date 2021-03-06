import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { SearchOrderParams } from '../../model/search-params';
import { ApiController } from 'src/app/enums/apiController';
import { SearchFieldMapping } from 'src/app/model/form.data.mapping';
import { SearchFieldControl } from 'src/app/model/data.field.control';
import { ViewOrderColumns } from 'src/app/metadata/viewOrderColumns ';
import { SearchOrderFields } from 'src/app/metadata/searchOrderFields';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { OrderFilter } from 'src/app/enums/RecordMode';
import { AuthenticationService } from 'src/app/services/authentication';
import { LoginUser } from 'src/app/model/login-user';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.html'
})
export class ViewOrder extends ListEvent { 
    categories: any[];
    packages: any[];
    agents: any[];
    currentUser: LoginUser;
    dataRowMapper: TablerowDataMapping[] = [];
    searchFields: SearchFieldMapping[] = [];
    displayType = DataDisplayType;
    orderFilter = OrderFilter;
    searchParams = new SearchOrderParams(null, null, null, null, null, null, null, null, 0);
    keyField: string;
    totalUnreadMsg: number;
    totalCommINotConfig: number;
    totalOddClaimed: number;
    previousUrl: string;

    constructor(public loaderService: LoaderService, public dataService: DataService, private authenticationService: AuthenticationService, private routerExtService: RouterService) {
        super(loaderService, dataService, "applicationId", false);
        this.dataSourceSubject.asObservable().subscribe((data: any) => {
            this.totalUnreadMsg = data.totalUnreadMsg;
            this.totalCommINotConfig = data.totalCommINotConfig;
            this.totalOddClaimed = data.totalOddClaimed;
        });
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.controllerName = ApiController.CustomerApplication;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.setSearchParams();
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewOrderColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));
    
        return columnMappings;
    }

    getSearchFeldsMapping(): SearchFieldMapping[] {
        let columnMappings = SearchOrderFields.fields.map(o => new SearchFieldMapping(o.fieldName,
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

    exportRecords() {
        this.dataService.export(`${ApiController.Download}/CustomerApplication`, this.searchParams).subscribe(data => {
            let filename = `CustomerApplication_${formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US')}.xlsx`;
            const file: Blob = new Blob([data], { type: 'application/xlsx' });
            saveAs(file, filename);
        });
    }

    filterView(filterBy: OrderFilter) {
        if (this.searchParams.filterByMode === filterBy) {
            this.searchParams.filterByMode = OrderFilter.None;
        }
        else {
            this.searchParams.filterByMode = filterBy;
        }

        localStorage.setItem('viewOrderParams', JSON.stringify(this.searchParams));
        this.reloadData();
    }

    filterRecords() {
        localStorage.setItem('viewOrderParams', JSON.stringify(this.searchParams));
        this.reloadData();
    }

    setSearchParams() {
        let previous = this.routerExtService.getPreviousUrl();
        if (previous.indexOf('edit-order') === -1) {
            localStorage.removeItem('viewOrderParams');
            return;
        }
        if (localStorage.getItem('viewOrderParams') !== null) {
            this.searchParams = JSON.parse(localStorage.getItem('viewOrderParams'));
        }
    }

    clearSearchParam() {
        localStorage.removeItem('viewOrderParams');
        this.searchParams = new SearchOrderParams(null, null, null, null, null, null, null, null, 0);
        this.reloadData();
    }
}


