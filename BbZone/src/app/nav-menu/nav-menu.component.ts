import { Component, Input } from '@angular/core';
import { LoginUser } from '../model/login-user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {
    isExpanded = false;
    @Input() currentUser: LoginUser = new LoginUser();
    
    constructor(private router: Router) { }

    collapse() {
        this.isExpanded = false; 
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
    }
}
