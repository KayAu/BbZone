import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication';
import { LoginUser } from '../../model/login-user';

@Component({
  selector: 'home',
  templateUrl: './home.html',
})
export class Home {
    currentUser: LoginUser;
    constructor(private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        
    }

}
