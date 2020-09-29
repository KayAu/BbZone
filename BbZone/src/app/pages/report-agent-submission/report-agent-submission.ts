import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { DataDisplayType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { ApiController } from 'src/app/enums/apiController';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { OrderFilter } from 'src/app/enums/RecordMode';
import { AuthenticationService } from 'src/app/services/authentication';
import { RouterService } from 'src/app/services/router.service';
import { DateRange } from '../../model/date.range';
import { ViewAgentSubmissionStatusColumns } from '../../metadata/viewReportColumns';

@Component({
    selector: 'report-agent-submission',
    templateUrl: './report-agent-submission.html'
})

export class ReportAgentSubmission extends ListEvent {

    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;
    orderFilter = OrderFilter;
    searchParams = new DateRange();
    keyField: string;

    constructor(public loaderService: LoaderService, public dataService: DataService, private authenticationService: AuthenticationService, private routerExtService: RouterService) {
        super(loaderService, dataService, "agentLevel", true);
    }

    ngOnInit() {
        this.controllerName = ApiController.ReportAgentSubmission;
        this.dataRowMapper = this.getTablerowDataMapping()
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewAgentSubmissionStatusColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    filterDataByDate() {
        if (!this.searchParams.startDate || !this.searchParams.endDate) return;
        this.reloadData();
    }

    exportRecords() {
        this.dataService.export(`${ApiController.ReportAgentSubmission}/Download`, this.searchParams).subscribe(data => {
            let filename = `reportAgentSubmission_${formatDate(new Date(), 'ddMMyyyyhhmm', 'en-US')}.xlsx`;
            const file: Blob = new Blob([data], { type: 'application/xlsx' });
            saveAs(file, filename);
        });
    }


    clearSearchParam() {
        this.searchParams = new DateRange();
        this.reloadData();
    }
}


