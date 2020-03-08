import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { NgForm } from '@angular/forms';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication';
import { LoginUser } from 'src/app/model/login-user';

@Component({
    selector: 'login',
    templateUrl: './login.html'
})

export class Login {
    @ViewChild(NgForm) loginForm;
    user: LoginUser;
    returnUrl: string;
    error: string = '';

    constructor(public loaderService: LoaderService,
        private formSubmission: BroadcastService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
    }
    
    ngOnInit() {
        this.user = new LoginUser();
        //this.user.isAdmin = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.user).subscribe(user => {
            if (user.isAuthenticated) {
              
                this.router.navigate([this.returnUrl]);
                
            }
            else {
                this.error = "Login Failed. You do not have the permission to login to the system";
            }});
    }

}