import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditAnnouncementFields } from '../../metadata/announcementFields';
import { FormDataMapping } from '../../model/form.data.mapping';
import { ControlType } from '../../enums/dataDisplayType';
import { DataFieldControl } from '../../model/data.field.control';
import { BroadcastService } from '../../services/broadcast.service';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApiController } from '../../enums/apiController';
import { FormSubmit } from 'src/app/model/form-submit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'edit-announcement',
    templateUrl: './edit-announcement.html'
})

export class EditAnnouncement {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    recordId: number;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService,
        private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

    ngOnInit() {
        this.recordId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord(this.route.snapshot.params.id);
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let columnMappings = EditAnnouncementFields.fields.map(o => new FormDataMapping(o.fieldName,
            o.displayText,
            o.readonly,
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

    submit() {
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;

        this.isUpdating = true;

        const formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));

        if (this.formRecord.customerDocuments) {
            for (var i = 0; i < this.formRecord.announcementDocuments.length; i++) {
                if (!this.formRecord.customerDocuments[i].deleted) {
                    formData.append("file" + i, this.formRecord.announcementDocuments[i]);
                }
            }
        }

        this.dataService.updateForm(ApiController.Announcement, this.recordId, formData).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-announcement']);
        });
    }


    private loadRecord(recordId: number) {
        this.dataService.get(ApiController.Announcement, recordId).subscribe(data => {
            this.formRecord = data;
        });
    }
}


