import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiController } from '../../enums/apiController';
import { AuthenticationService } from '../../services/authentication';
import { Router } from '@angular/router';

@Component({
    selector: 'impersonate-user',
    templateUrl: './impersonate-user.html',

})

export class ImpersonateUser {

    users: any[] = [];
    impersonating: boolean = false;
    impersonated: boolean = false;
    impersonateUser: string;
    showMenu: boolean = false;
 

    constructor(private dataService: DataService, private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.loadExisitingUsers();
    }

    impersonate() {
        this.impersonating = true;
        this.dataService.getAll(`${ApiController.Impersonation}/Impersonate/${this.impersonateUser}`).subscribe(userDetails => {
            this.impersonated = true;
            this.impersonating = false;
            this.resetApp(userDetails);
        });
    }

    displayDropdown() {
        this.showMenu = !this.showMenu;
    }

    stopImpersonate() {
        this.dataService.getAll(`${ApiController.Impersonation}/StopImpersonate`).subscribe(userDetails => {
            this.impersonated = false;
            this.resetApp(userDetails);
        });
    }

    private loadExisitingUsers() {
        this.dataService.getAll(`${ApiController.Impersonation}/LoadUsers`).subscribe(data => {
            this.users = data;
        });
    }

    private resetApp(userDetails: any) {
        //this.authenticationService.updateLogin(userDetails);
        //this.displayDropdown();
        //this.router.navigate(['/']);
    }
    
}