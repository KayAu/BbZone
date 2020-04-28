import { Component, Input } from '@angular/core';
import { LoginUser } from '../model/login-user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {
    isExpanded = false;
    menuClickedIndex: number;
    @Input() currentUser: LoginUser = new LoginUser();
    
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        //localStorage.removeItem('currentUser');
        //this.currentUser = null;
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}
