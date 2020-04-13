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
    @ViewChild(NavMenuComponent) navMenu: NavMenuComponent;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userIdle: UserIdleService
    ) {
        this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

    }

    ngOnInit() {
        //Start watching for user inactivity.
        this.userIdle.startWatching();

        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(count => console.log(count));

        // Start watch when time is up.
        this.userIdle.onTimeout().subscribe(() =>
            this.logout()
        );
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        localStorage.removeItem('currentUser');
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
            this.showScroll = true;
        }
        else if (this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
            this.showScroll = false;
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

}


