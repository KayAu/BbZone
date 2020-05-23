import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EditOrderFields } from '../../metadata/editOrderFields';
import { FormDataGroupMapping } from '../../model/form.data.mapping';
import { ControlType } from '../../enums/dataDisplayType';
import { DataFieldControl } from '../../model/data.field.control';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { ApiController } from '../../enums/apiController';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/model/login-user';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'edit-order',
  templateUrl: './edit-order.html'
})

export class EditOrder  {
    @ViewChild(NgForm) form: NgForm;
    applicationFields: FormDataGroupMapping[] = [];
    orderFields: FormDataGroupMapping[] = [];
    displayFields: FormDataGroupMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    recordId: number;
    currentUser: LoginUser;
    commIsConfigured: boolean = true;
    controlType = ControlType;

    constructor(public loaderService: LoaderService,
                public dataService: DataService,
                private router: Router,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.recordId = this.route.snapshot.params.id;
        this.loadRecord(this.route.snapshot.params.id);
        const dataFields = this.getFormFeldsMapping();
        this.displayFields = dataFields.filter(c => c.dataFieldControl.controlType === this.controlType.label);
        this.applicationFields = dataFields.filter(c => c.groupName === 'application' && c.dataFieldControl.controlType !== this.controlType.label);
        this.orderFields = dataFields.filter(c => c.groupName === 'orderInfo');
    }

    getFormFeldsMapping(): FormDataGroupMapping[] {
        let columnMappings = EditOrderFields.fields.map(o =>
            new FormDataGroupMapping(o.fieldName,
                                o.displayText,
                                o.hidden,
                                o.groupName,
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
        this.setControlsAsTouched();
        if (!this.form.valid) return;
        if (this.preventPosComplete()) return;

        this.isUpdating = true;

        const formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));

        if (this.formRecord.customerDocuments) {
            for (let i = 0; i < this.formRecord.customerDocuments.length; i++) {
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

    showEForm(show) {
        if (!show) show = false;
        const index = this.orderFields.findIndex(i => i.fieldName === "eForm");
        this.orderFields[index].hidden = !show;
    }

    checkCommissionSettings() {

        this.dataService.get(`${ApiController.CustomerApplication}/CheckCommissionSettings/${this.formRecord['categoryId']}/${this.formRecord['agent']}`).subscribe(isConfigured => {
            this.commIsConfigured = isConfigured;
        });
    }

    private preventPosComplete() {
        if (!this.commIsConfigured && this.formRecord['appStatusId'] === 4) {
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
        });
    }

    private setControlsAsTouched() {
        for (let i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    }

}


