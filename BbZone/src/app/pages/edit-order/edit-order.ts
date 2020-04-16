import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditOrderFields } from '../../metadata/editOrderFields';
import { FormDataMapping } from '../../model/form.data.mapping';
import { ControlType } from '../../enums/dataDisplayType';
import { DataFieldControl } from '../../model/data.field.control';
import { BroadcastService } from '../../services/broadcast.service';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { ApiController } from '../../enums/apiController';
import { FormSubmit } from 'src/app/model/form-submit';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/model/login-user';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'edit-order',
  templateUrl: './edit-order.html'
})

export class EditOrder {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    recordId: number;
    currentUser: LoginUser;
    commIsConfigured: boolean = true;

    constructor(public loaderService: LoaderService,
                public dataService: DataService,
                public formEvent: BroadcastService,
                private router: Router,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.recordId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord(this.route.snapshot.params.id);
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let columnMappings = EditOrderFields.fields.map(o =>
            new FormDataMapping(o.fieldName,
                                o.displayText,
                                o.hidden,
                                !o.dataFieldControl ? null : new DataFieldControl(
                                                            o.dataFieldControl.controlName,
                                                            ControlType[o.dataFieldControl.controlType],
                                                            o.dataFieldControl.required,
                                                            o.dataFieldControl.maxLength,
                                                            o.dataFieldControl["datasourceUrl"] ? o.dataFieldControl["datasourceUrl"] : null,
                                                            o.dataFieldControl["cascadeTo"] ? o.dataFieldControl["cascadeTo"] : null,
                                                            o.dataFieldControl["adminField"] ? o.dataFieldControl["adminField"] : false,
                                                            o.dataFieldControl["dataChangedEvent"] ? o.dataFieldControl["dataChangedEvent"] : null
                                )
        ));

        if (!this.currentUser.isAdmin) {
            columnMappings = columnMappings.filter(c => c.dataFieldControl.adminField === false);
        }

        return columnMappings;
    }

    update() {
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;
        if (this.preventPosComplete()) return;

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

        this.dataService.updateForm(ApiController.CustomerApplication, this.recordId, formData).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-order']);
        });
    }

    showProcessedDetails(show) {
        if (!show) show = false;
        let updateFields = ["orderNo", "userId", "telNo"];
        for (var field of  updateFields) {
            let index = this.formFields.findIndex(i => i.fieldName == field);
            this.formFields[index].hidden = !show;
        }
    }

    showEForm(show) {
        if (!show) show = false;
        let index = this.formFields.findIndex(i => i.fieldName == "eForm");
        this.formFields[index].hidden = !show;
    }

    checkCommissionSettings() {

        this.dataService.get(`${ApiController.CustomerApplication}/CheckCommissionSettings/${this.formRecord['categoryId']}/${this.formRecord['agent']}`).subscribe(isConfigured => {
            this.commIsConfigured = isConfigured;
        });
    }

    private preventPosComplete() {
        if (!this.commIsConfigured && this.formRecord['appStatusId'] == 4) {
            window.scrollTo(0, 0);
            return true;
        }

        return false;
    }

    private loadRecord(recordId:number) {
        this.dataService.get(ApiController.CustomerApplication, recordId).subscribe(data => {
            this.formRecord = data;
            this.commIsConfigured = this.formRecord['commIsConfigured'];
            this.showEForm(this.formRecord["showEForm"]);
            this.showProcessedDetails(this.formRecord["isProcessed"]);
        });
    }
}


