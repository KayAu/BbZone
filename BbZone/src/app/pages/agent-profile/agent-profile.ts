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
import { AuthenticationService } from 'src/app/services/authentication';
import { LoginUser } from 'src/app/model/login-user';

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
    agentId: number;
    currentUser: LoginUser;

    constructor(public loaderService: LoaderService,
        public dataService: DataService,
        public formEvent: BroadcastService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.agentId = this.route.snapshot.params.id;
        this.currentUser = this.authenticationService.currentUserValue;
        this.formFields = this.getFormFeldsMapping();
        if (!this.currentUser.isAdmin)
            this.setReadonlyFields();
        this.loadRecord();
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let fields = AgentProfileFields.fields.map(o => new FormDataMapping(o.fieldName,
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

        this.dataService.update(ApiController.Agent, this.formRecord[AgentProfileFields.keyField], this.formRecord).subscribe(data => {
            this.isUpdating = false;
            this.superiorField.editable = false;
            this.setControlsAsUnouched();
            this.toastr.success('The record is updated into the system successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
        });
    }

    loadRecord() {
        let url = this.agentId ? `${ApiController.Agent}/${this.agentId}` : `${ApiController.Agent}`;

        this.dataService.get(url).subscribe(results => {
            this.formRecord = results;
            this.superiorField.editable = !this.formRecord.superiorId || this.currentUser.isAdmin ? true : false;
        });
    }

    private setReadonlyFields() {
        let bankNameFldIdx = this.formFields.findIndex(f => f.fieldName == 'bankName');
        let bankAccNoFldIdx = this.formFields.findIndex(f => f.fieldName == 'bankAccNo');
        this.formFields[bankNameFldIdx].dataFieldControl.readonly = true;
        this.formFields[bankAccNoFldIdx].dataFieldControl.readonly = true;
    }

    private setControlsAsTouched() {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched()
        }
    }

    private setControlsAsUnouched() {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsUntouched();
        }
    }
}