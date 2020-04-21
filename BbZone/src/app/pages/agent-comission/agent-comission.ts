import { Component, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { SelectItem } from 'src/app/model/select.item';
import { Router } from '@angular/router';
import { ApiController } from 'src/app/enums/apiController';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { MultipleCheckboxes } from 'src/app/components/multiple-checkbox/multiple-checkbox';
import { ProductOptions } from 'src/app/components/product-options/product-options';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { FormSubmit } from 'src/app/model/form-submit';
import { AgentCommissionTable } from 'src/app/components/agent-commission-table/agent-commission-table';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'agent-comission',
    templateUrl: './agent-comission.html'
})

export class AgentComission {
    isUpdating: boolean = false;
    commissionSettings: any[] = [];
    agentCommissions: any[] = [];
    appsWithoutCommission: any[] = [];
    selectedAgents: string[];
    selectedProduct: number;
    selectedTab: number = 1;
    allowCommConfig: boolean = true;
    myAgents: SelectItem[];
    noAgentsReturned: boolean = false;
    @ViewChild(NgForm) form: NgForm;
    @ViewChild(MultipleCheckboxes) multipleCheckboxes: MultipleCheckboxes;
    @ViewChild(ProductOptions) productOptions: ProductOptions;
    @ViewChild(AgentCommissionTable) agentCommissionTable: AgentCommissionTable;

    constructor(public loaderService: LoaderService, public dataService: DataService, private toastr: ToastrService, private router: Router) { }

    ngOnInit() {
        this.loadAppWithoutCommissionSet();
    }

    loadAppWithoutCommissionSet() {
        this.dataService.get(`${ApiController.Commission}/GetAppWithoutCommissionSet`).subscribe(results => {
            this.appsWithoutCommission = results;
        });
    }

    loadCategories() {
        this.multipleCheckboxes.removeSelection();
        forkJoin([this.dataService.get(`${ApiController.Commission}/GetMyAgentsForCommissionSetting`, this.selectedProduct),
            this.dataService.get(`${ApiController.Commission}/GetCommissionSettings`, this.selectedProduct)])
            .subscribe(results =>
            {
                this.loadAgents(results[0]);
                this.commissionSettings = results[1]; 
        });
    }

    loadAgents(data: any) {
        this.myAgents = data.displayData;
        this.allowCommConfig = data.allowCommConfig;
        this.noAgentsReturned = this.myAgents.length === 0;
    }

    loadAgentCommissions() {
        this.agentCommissionTable.loadMyAgentsCommission(this.selectedProduct);
    }

    create() {
       // this.formEvent.notify(new FormSubmit(this.form, 'dataForm'));
        this.setControlsAsTouched();
        if (!this.form.valid) return;

        this.isUpdating = true;
        let newRecord = { agents : this.selectedAgents, commissionSettings : this.commissionSettings } 
        this.dataService.add(ApiController.Commission, newRecord).subscribe(data => {
            this.toastr.success('The record is updated into the system successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
            this.isUpdating = false;
            this.resetForm();
            this.loadAppWithoutCommissionSet();
        });
    }

    resetForm() {
        this.commissionSettings = [];
        this.multipleCheckboxes.removeSelection();
        this.productOptions.clearSelection();
        this.setControlsAsUnouched();
    }

    editAgentCommission(categoryId: number) {
        console.log(categoryId);
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
