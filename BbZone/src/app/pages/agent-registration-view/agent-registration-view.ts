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
import { CascadeService } from 'src/app/services/cascade.service';
import { AgentRegistrationViewFields } from 'src/app/metadata/agentFields';

@Component({
  selector: 'agent-registration-view',
  templateUrl: './agent-registration-view.html'
})

export class AgentRegistrationView {
    @ViewChild(NgForm) form: NgForm;
    formFields: FormDataMapping[] = [];
    formRecord: any = {};
    registrationDocuments: any[] = [];
    isUpdating: boolean = false;
    applicationId: number;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService,
        private cascadeService: CascadeService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

    ngOnInit() {
        this.applicationId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord(this.route.snapshot.params.id);
    }

    getFormFeldsMapping(): FormDataMapping[] {
        let columnMappings = AgentRegistrationViewFields.fields.map(o => new FormDataMapping(o.fieldName,
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

        return columnMappings;
    }

    update() {
        this.formEvent.notify(new FormSubmit(this.form, this.form.name));
        if (!this.form.valid) return;

        this.isUpdating = true;

        this.dataService.update(ApiController.Registration, this.applicationId, this.formRecord).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/agent-registration-list']);
        });
    }

    private loadRecord(recordId: number) {
        //  return Ok(new { RegistrationDetails = record, RegistrationDocuments = registrationDocuments });
        this.dataService.get(ApiController.Registration, recordId).subscribe(data => {
            this.formRecord = data.registrationDetails;
            this.registrationDocuments = data.registrationDocuments;
        });
    }
}


