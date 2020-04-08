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
import { AgentCommissionTable } from 'src/app/components/agent-commission-table/agent-commission-table';

@Component({
    selector: 'agent-view',
    templateUrl: './agent-view.html'
})

export class AgentView {
    @ViewChild(NgForm) form: NgForm;
    @ViewChild(SuperiorField) superiorField: SuperiorField;
    @ViewChild(AgentCommissionTable) agentCommissionTable: AgentCommissionTable;

    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    completed: boolean = false;
    selectedProduct: number;
    selectedTab: number = 1;
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
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;

        this.isUpdating = true;

        this.dataService.update(ApiController.Agent, this.formRecord[AgentProfileFields.keyField], this.formRecord).subscribe(data => {
            this.isUpdating = false;
            this.superiorField.editable = false;
            this.formRecord.isActive = data.isActive;
            this.formRecord.modifiedOn = data.modifiedOn;
            this.formRecord.modifiedBy = data.modifiedBy;
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

    loadAgentCommissions() {
        this.agentCommissionTable.loadCurrentAgentCommission(this.agentId, this.selectedProduct);
    }
}