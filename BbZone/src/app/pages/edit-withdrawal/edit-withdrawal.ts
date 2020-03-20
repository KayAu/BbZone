import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ApiController } from 'src/app/enums/apiController';
import { CreateWithdrawalColumns } from '../../metadata/createWithdrawalColumns';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-withdrawal',
    templateUrl: './edit-withdrawal.html'
})

export class EditWithdrawal  { //extends ListEvent
    dataRowMapper: TablerowDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    recordId: number;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private router: Router, private route: ActivatedRoute) {
        //super(loaderService, dataService, '', false);
    }

    ngOnInit() {
        this.recordId = this.route.snapshot.params.id;
        this.loadRecord(this.route.snapshot.params.id);
        this.dataRowMapper = this.getTablerowDataMapping();
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = CreateWithdrawalColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    submit() {
        
    }


    private loadRecord(recordId: number) {
        this.dataService.get(ApiController.WithdrawalView, recordId).subscribe(data => {
            this.formRecord = data;
        });
    }
}


