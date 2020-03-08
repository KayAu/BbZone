import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgentProfileFields } from '../../metadata/agentFields';
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
import { ToastrService } from 'ngx-toastr';
import { SuperiorField } from 'src/app/components/superior-field/superior-field';

@Component({
    selector: 'agent-profile',
    templateUrl: './agent-profile.html'
})

export class AgentProfile {
    @ViewChild(NgForm) form: NgForm;
    @ViewChild(SuperiorField) superiorField: SuperiorField;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    completed: boolean = false;
    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

    ngOnInit() {
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord();
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let fields = AgentProfileFields.fields.map(o => new FormDataMapping(o.fieldName,
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

        return fields;
    }

    submit() {
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;

        this.isUpdating = true;

        this.dataService.update(ApiController.Agent, this.formRecord[AgentProfileFields.keyField] ,this.formRecord).subscribe(data => {
            this.isUpdating = false;
            this.superiorField.editable = false;
            this.toastr.success('The record is updated into the system successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
        });
    }

    loadRecord() {
        this.dataService.getAll(`${ApiController.Agent}`).subscribe(results => {
            this.formRecord = results;
            this.superiorField.editable = !this.formRecord.superiorId ? true : false;
        });
    }

}