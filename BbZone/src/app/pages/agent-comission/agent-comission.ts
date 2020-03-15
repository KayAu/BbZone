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

@Component({
    selector: 'agent-comission',
    templateUrl: './agent-comission.html'
})

export class AgentComission {
    isUpdating: boolean = false;
    commissionSettings: any[] = [];
    agentCommissions: any[] = [];
    selectedAgents: string[];
    selectedProduct: number;
    selectedTab: number = 1;
    allowCommConfig: boolean = false;
    myAgents: SelectItem[];
    @ViewChild(NgForm) form: NgForm;
    @ViewChild(MultipleCheckboxes) multipleCheckboxes: MultipleCheckboxes;
    @ViewChild(ProductOptions) productOptions: ProductOptions;
    @ViewChild(AgentCommissionTable) agentCommissionTable: AgentCommissionTable;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private toastr: ToastrService, private router: Router) { }

    ngOnInit() {
        this.loadAgents();
    }

    loadAgents() {
        this.dataService.get(`${ApiController.Commission}/GetMyAgents`).subscribe(data => {
            this.myAgents = data.displayData;
            this.allowCommConfig = data.allowCommConfig;
        });
    }

    loadCategories() {
        this.dataService.get(`${ApiController.Commission}/GetCommissionSettings`, this.selectedProduct).subscribe(results => {
            this.commissionSettings = results;
        });
    }

    loadAgentCommissions() {
        this.agentCommissionTable.loadData(this.selectedProduct);
        //this.dataService.get(`${ApiController.Commission}/GetMyAgentCommission`, this.selectedProduct).subscribe(results => {
        //    this.agentCommissions = results;
        //});
    }

    create() {
        this.formEvent.notify(new FormSubmit(this.form, 'dataForm'));
        if (!this.form.valid) return;

        this.isUpdating = true;
        let newRecord = { agents : this.selectedAgents, commissionSettings : this.commissionSettings } 
        this.dataService.add(ApiController.Commission, newRecord).subscribe(data => {
            this.isUpdating = false;
            this.toastr.success('The record is updated into the system successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
            this.resetForm();
        });
    }

    resetForm() {
        this.commissionSettings = [];
        this.multipleCheckboxes.removeSelection();
        this.productOptions.clearSelection();
    }

    editAgentCommission(categoryId: number) {
        console.log(categoryId);
    }
}
