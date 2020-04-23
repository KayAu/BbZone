import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ListEvent } from 'src/app/interfaces/listEvent';
import { ApiController } from 'src/app/enums/apiController';
import { FormDataMapping } from 'src/app/model/form.data.mapping';
import { ViewAnnouncementColumns } from 'src/app/metadata/announcementFields';
import { StatusAndKeywordParams } from 'src/app/model/search-params';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'view-announcement',
    templateUrl: './view-announcement.html'
})
export class ViewAnnouncement extends ListEvent {

    dataRowMapper: TablerowDataMapping[] = [];
    searchFields: FormDataMapping[] = [];
    displayType = DataDisplayType;
    searchParams = new StatusAndKeywordParams(null, null);
    keyField: string;

    constructor(public loaderService: LoaderService, public dataService: DataService, private toastr: ToastrService) {
        super(loaderService, dataService, "", false);
    }

    ngOnInit() {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.keyField = this.dataRowMapper.find(d => d.keyField === true).fieldName;
        this.controllerName = ApiController.Announcement;
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ViewAnnouncementColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    clearFilter() {
        this.searchParams = new StatusAndKeywordParams(null, null);
        this.reloadData();
    }

    sendEmail(anncId: number) {
        this.dataService.get(`${ApiController.Announcement}/EmailAgents/${anncId}`).subscribe(data => {
            this.toastr.success('The emails is broadcasted successfully', 'Annoucement email sent', { positionClass: 'toast-bottom-full-width' });
        });
    }
}


