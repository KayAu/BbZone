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
    selector: 'edit-password',
    templateUrl: './edit-password.html'
})

export class EditPassword {
    @ViewChild(NgForm) form: NgForm;
    invalidOldPassword: boolean = false;
    isUpdating: boolean = false;
    currentUser: LoginUser;
    passwordFields: any = { oldPassword: null, newPassword: null, confirmPassword: null };

    constructor(public loaderService: LoaderService,
        private dataService: DataService,
        private formEvent: BroadcastService,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService) {
    }
    
    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue; 
    }

    submit() {
        this.formEvent.notify(new FormSubmit(this.form, 'dataForm'));
        if (!this.form.valid) return;

        if (!this.currentUser.isAdmin) {
            this.updatePassword(`${ApiController.User}/UpdateAgentPassword`, this.currentUser.agentId);
        }
        else {
            this.updatePassword(`${ApiController.User}/UpdateAdminPassword`, this.currentUser.username);
        } 
    }

    private updatePassword(url: string, userId: any) {
        this.isUpdating = true;
        this.dataService.update(url, userId, this.passwordFields).subscribe(isValid => {
            if (isValid) {
                this.toastr.success('The new password is updated successfully', 'Password Updated', { positionClass: 'toast-bottom-full-width' });
            }
            this.invalidOldPassword = !isValid;
            this.isUpdating = false;
        });
    }
}