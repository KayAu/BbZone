import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewAnnouncementFields } from '../../metadata/announcementFields';
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
  selector: 'create-announcement',
    templateUrl: './create-announcement.html'
})

export class CreateAnnouncement {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    newRecord: any = {};
    isUpdating: boolean = false;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService,
                private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

    ngOnInit() {
        this.formFields = this.getFormFeldsMapping();
        this.loadApplication(this.route.snapshot.params.id);
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let columnMappings = NewAnnouncementFields.fields.map(o => new FormDataMapping(o.fieldName,
            o.displayText,
            o.hidden,
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
        formData.append('data', JSON.stringify(this.newRecord));

        if (this.newRecord.files) {
            for (var i = 0; i < this.newRecord.files.length; i++) {
                formData.append("file" + i, this.newRecord.files[i]);
            }
        }

        this.dataService.postForm(ApiController.Announcement, formData).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-announcement']);
        });
    }


    private loadApplication(applicationId:number) {
        this.dataService.get(ApiController.CustomerApplication, applicationId).subscribe(data => {
            this.newRecord = data;
        });
    }
}


