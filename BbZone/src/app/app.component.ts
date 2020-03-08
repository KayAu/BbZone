import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication';
import { UserIdleService } from 'angular-user-idle'
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginUser } from './model/login-user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    currentUser: LoginUser;
    showScroll: boolean;
    showScrollHeight = 300;
    hideScrollHeight = 10;
    @ViewChild('navMenu') navMenu: NavMenuComponent;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userIdle: UserIdleService
    ) {
        this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        localStorage.removeItem('currentUser');
    }

}


