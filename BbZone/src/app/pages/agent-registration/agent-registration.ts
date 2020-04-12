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


@Component({
    selector: 'agent-registration',
    templateUrl: './agent-registration.html'
})

export class AgentRegistration {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    completed: boolean = false;
    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private router: Router, private route: ActivatedRoute) { }

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
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;

        this.isUpdating = true;
        const formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));

        if (this.formRecord.files) {
            for (var i = 0; i < this.formRecord.files.length; i++) {
                formData.append("file" + i, this.formRecord.files[i]);
            }
        }

        this.dataService.postForm(ApiController.Registration, formData).subscribe(data => {
            this.isUpdating = false;
            this.completed = true;
        });
    }

}