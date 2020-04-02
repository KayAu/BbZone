import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { ApiController } from 'src/app/enums/apiController';
import { DataFieldControl } from 'src/app/model/data.field.control';
import { ViewWithdrawalColumns } from 'src/app/metadata/viewWithdrawalColumns';
import { FormDataMapping } from 'src/app/model/form.data.mapping';
import { SearchWithdrawalViewParams } from 'src/app/model/search-params';
import { SearchWithdrawalFields } from 'src/app/metadata/searchWithdrawalFields';
import { LoginUser } from 'src/app/model/login-user';
import { AuthenticationService } from 'src/app/services/authentication';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';

@Component({
    selector: 'view-withdrawal',
    templateUrl: './view-withdrawal.html'
})

export class ViewWithdrawal extends ListEvent {
    currentUser: LoginUser;
    dataRowMapper: TablerowDataMapping[] = [];
    searchFields: FormDataMapping[] = [];
    displayType = DataDisplayType;
    searchParams = new SearchWithdrawalViewParams(null, null, null, null);
    keyField: string;   
    totalAmountPayout: any;
    totalAmountClaimed: any;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private authenticationService: AuthenticationService) {
        super(loaderService, dataService, "", false);
        this.dataSourceSubject.asObservable().subscribe((data: any) => {
            this.totalAmountPayout = data.totalAmountPayout;
            this.totalAmountClaimed = data.totalAmountClaimed;
        });
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchFields = this.getSearchFeldsMapping();
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.controllerName = ApiController.WithdrawalView;
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewWithdrawalColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    getSearchFeldsMapping(): FormDataMapping[] {
        let fieldMappings = SearchWithdrawalFields.fields.map(o => new FormDataMapping(o.fieldName,
            o.displayText,
            o.fieldForAdmin !== undefined ? (o.fieldForAdmin && !this.currentUser.isAdmin ? true: false ): o.hidden,  // hide the field
            !o.dataFieldControl ? null :
                new DataFieldControl(
                    o.dataFieldControl.controlName,
                    ControlType[o.dataFieldControl.controlType],
                    o.dataFieldControl.required,
                    o.dataFieldControl.maxLength,
                    o.dataFieldControl.datasourceUrl
                )));

        return fieldMappings;
    }

    clearSearchParam() {
        this.searchParams = new SearchWithdrawalViewParams(null, null, null, null);
        this.reloadData();
    }

    exportRecords() {
        this.dataService.export(`${ApiController.WithdrawalView}/Download`, this.searchParams).subscribe(data => {
            let filename = `Withdrawal_${formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US')}.xlsx`;
            const file: Blob = new Blob([data], { type: 'application/xlsx' });
            saveAs(file, filename);
        });
    }
}


