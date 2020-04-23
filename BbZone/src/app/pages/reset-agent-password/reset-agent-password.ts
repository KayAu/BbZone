import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { NgForm } from '@angular/forms';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication';
import { LoginUser } from 'src/app/model/login-user';
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';
import { FormSubmit } from 'src/app/model/form-submit';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'reset-agent-password',
    templateUrl: './reset-agent-password.html'
})

export class ResetAgentPassword {
    @ViewChild(NgForm) dataForm: NgForm;
    isUpdating: boolean = false;
    passwordFields: any = { agent: null, newPassword: null};
    dropdownItems: any[];

    constructor(public loaderService: LoaderService,
        private dataService: DataService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.loadAgents();
    }

    submit() {
        this.setControlsAsTouched();
        if (!this.dataForm.valid) return;

        this.dataService.add(`${ApiController.Password}/ResetPassword`, this.passwordFields).subscribe(data => {
            this.toastr.success('The agent password is reset successfully', 'Password Updated', { positionClass: 'toast-bottom-full-width' });         
            this.isUpdating = false;
        });
    }

    loadAgents() {
        this.dataService.getAll(`${ApiController.Dropdown}/GetAgents`).subscribe(results => {
            this.dropdownItems = results;
        });
    }

    private setControlsAsTouched() {
        for (var i in this.dataForm.controls) {
            this.dataForm.controls[i].markAsTouched();
        }
    }

    private setControlsAsUnouched() {
        for (var i in this.dataForm.controls) {
            this.dataForm.controls[i].markAsUntouched();
        }
    }
}