import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditOrderFields } from '../../metadata/editOrderFields';
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
import { CascadeData } from 'src/app/model/cascade-data';
import { CascadeService } from 'src/app/services/cascade.service';

@Component({
  selector: 'edit-order',
  templateUrl: './edit-order.html'
})

export class EditOrder {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    applicationId: number;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService,
        private cascadeService: CascadeService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

    ngOnInit() {
        this.applicationId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadApplication(this.route.snapshot.params.id);
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let columnMappings = EditOrderFields.fields.map(o => new FormDataMapping(o.fieldName,
            o.displayText,
            o.readonly,
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

    update() {
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;

        this.isUpdating = true;

        const formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));

        if (this.formRecord.customerDocuments) {
            for (var i = 0; i < this.formRecord.customerDocuments.length; i++) {
                if (!this.formRecord.customerDocuments[i].deleted) {
                    formData.append("file" + i, this.formRecord.customerDocuments[i]);
                }
            }
        }

        this.dataService.updateForm(ApiController.CustomerApplication, this.applicationId, formData).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-order']);
        });
    }

    private loadApplication(applicationId:number) {
        this.dataService.get(ApiController.CustomerApplication, applicationId).subscribe(data => {
            this.formRecord = data;
        });
    }
}


