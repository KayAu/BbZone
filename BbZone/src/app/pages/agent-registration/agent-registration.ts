import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgentRegistrationFields } from '../../metadata/agentFields';
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

declare var $: any;

@Component({
    selector: 'agent-registration',
    templateUrl: './agent-registration.html'
})

export class AgentRegistration {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    hasLoginExists: boolean = false;
    completed: boolean = false;
    agree: boolean = false;
    constructor(public loaderService: LoaderService, public dataService: DataService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.formFields = this.getFormFeldsMapping();
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let fields = AgentRegistrationFields.fields.map(o => new FormDataMapping(o.fieldName,
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

        return fields;
    }

    submit() {
        this.setControlsAsTouched();
        if (!this.form.valid) return;

        this.isUpdating = true;
        this.dataService.get(`${ApiController.User}/HasLoginExists`, this.formRecord["userLogin"]).subscribe(hasExist => {
            if (!hasExist) {
                this.postData();
            }
            else {
                this.isUpdating = false;
            }
            this.hasLoginExists = hasExist;
            this.setControlsAsUnouched();
        });
    }

    private postData() {
        this.dataService.postForm(ApiController.Registration, this.getFormData()).subscribe(data => {
            this.isUpdating = false;
            this.completed = true;           
        });
    }

    private getFormData(): FormData {
        const formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));

        if (this.formRecord.files) {
            for (var i = 0; i < this.formRecord.files.length; i++) {
                formData.append("file" + i, this.formRecord.files[i]);
            }
        }
        return formData;
    }

    private setControlsAsTouched() {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched()
        }
    }

    private setControlsAsUnouched() {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    }
}