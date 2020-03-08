import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewOrderFields } from '../../metadata/newOrderFields';
import { FormDataMapping } from '../../model/form.data.mapping';
import { ControlType } from '../../enums/dataDisplayType';
import { DataFieldControl } from '../../model/data.field.control';
import { BroadcastService } from '../../services/broadcast.service';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from '../../enums/apiController';
import { FormSubmit } from 'src/app/model/form-submit';
import { NgForm } from '@angular/forms';
import { CascadeData } from 'src/app/model/cascade-data';
import { CascadeService } from 'src/app/services/cascade.service';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.html'
})
export class CreateOrder {

    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    selectedCategory: number;
    newRecord: any  = {};
    isUpdating: boolean = false;
    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private cascadeService: CascadeService, private router: Router) {}

    ngOnInit() {
        this.formFields = this.getFormFeldsMapping();
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let columnMappings = NewOrderFields.fields.map(o => new FormDataMapping(o.fieldName,
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

    create() {
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

        this.dataService.postForm(ApiController.CustomerApplication, formData).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-order']);
        });
    }

    loadCategories(productId: number) {
        this.cascadeService.subject.next(new CascadeData("categoryId", productId));
    }

    clearPackages() {
        this.selectedCategory = null;
        this.cascadeService.subject.next(new CascadeData("prodPkgId", this.selectedCategory));
    }
}


