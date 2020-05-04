import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewOrderFields } from '../../metadata/newOrderFields';
import { FormDataGroupMapping } from '../../model/form.data.mapping';
import { ControlType, CustomerOrderDataGroup } from '../../enums/dataDisplayType';
import { DataFieldControl } from '../../model/data.field.control';
import { BroadcastService } from '../../services/broadcast.service';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from '../../enums/apiController';
import { FormSubmit } from 'src/app/model/form-submit';
import { NgForm } from '@angular/forms';
import { CascadeData } from 'src/app/model/cascade-data';
import { CascadeService } from 'src/app/services/cascade.service';
import { AuthenticationService } from 'src/app/services/authentication';
import { LoginUser } from 'src/app/model/login-user';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.html'
})
export class CreateOrder {

    @ViewChild(NgForm) form: NgForm;
    applicationFields: FormDataGroupMapping[] = [];
    orderFields: FormDataGroupMapping[] = [];
    selectedCategory: number;
    selectedProduct: number;
    newRecord: any  = {};
    isUpdating: boolean = false;
    currentUser: LoginUser;
    commIsConfigured: boolean = true;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private cascadeService: CascadeService, private router: Router, private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        let dataFields = this.getFormFeldsMapping();
        this.applicationFields = dataFields.filter(c => c.groupName === 'application');
        this.orderFields = dataFields.filter(c => c.groupName === 'orderInfo');
    }

    getFormFeldsMapping(): FormDataGroupMapping[] {

        let columnMappings = NewOrderFields.fields.map(o => new FormDataGroupMapping(o.fieldName,
            o.displayText,
            o.hidden,
            o.groupName,
            !o.dataFieldControl ? null :
                new DataFieldControl(
                    o.dataFieldControl.controlName,
                    ControlType[o.dataFieldControl.controlType],
                    o.dataFieldControl.required,
                    o.dataFieldControl.maxLength,
                    o.dataFieldControl["datasourceUrl"] ? o.dataFieldControl["datasourceUrl"] : null,
                    o.dataFieldControl["cascadeTo"] ? o.dataFieldControl["cascadeTo"] : null,
                    o.dataFieldControl["adminField"] ? o.dataFieldControl["adminField"] : false,
                    o.dataFieldControl["dataChangedEvent"] ? o.dataFieldControl["dataChangedEvent"] : null
                )));

        if (!this.currentUser.isAdmin) {
            columnMappings = columnMappings.filter(c => c.dataFieldControl.adminField === false);
        }

        return columnMappings;
    }

    create() {
        this.setControlsAsTouched();
        if (!this.form.valid) return;

        this.isUpdating = true;

        const formData = new FormData();
        formData.append('data', JSON.stringify(this.newRecord));
       
        if (this.newRecord.files) {
            for (var i = 0; i < this.newRecord.files.length; i++) {
                formData.append("file" + i, this.newRecord.files[i]);
            }
        }

        this.dataService.postForm(ApiController.CustomerApplication, formData).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-order']);
        });
    }

    loadCategories(productId: number) {
        this.cascadeService.subject.next(new CascadeData("categoryId", this.selectedProduct));
    }

    checkCommissionSettings() {
        if (!this.newRecord['agent']) return;
        this.dataService.get(`${ApiController.CustomerApplication}/CheckCommissionSettings/${this.newRecord['categoryId']}/${this.newRecord['agent']}`).subscribe(isConfigured => {
            this.commIsConfigured = isConfigured;
        });
    }

    clearPackages() {
        this.selectedCategory = null;
        this.cascadeService.subject.next(new CascadeData("prodPkgId", this.selectedCategory));
    }

    private setControlsAsTouched() {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    }
}


