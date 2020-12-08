import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../model/login-user';
import { DataService } from './data.service'
import { ApiController } from 'src/app/enums/apiController';
import { CookieService } from 'angular2-cookie/core'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<LoginUser>;
    public currentUser: Observable<LoginUser>;

    constructor(private dataService: DataService, private cookieService: CookieService) {
        const currentUser = this.cookieService.get('currentUser') !== undefined ? JSON.parse(this.cookieService.get('currentUser')) : null;
        this.currentUserSubject = new BehaviorSubject<LoginUser>(currentUser);
        this.currentUser = this.currentUserSubject.asObservable();

        //this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
        //this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoginUser {
        return this.currentUserSubject.value;
    }

    login(loginuser: LoginUser) {
        return this.dataService.login(ApiController.Token, loginuser.username, loginuser.password, loginuser.isAdmin).pipe(map((user: LoginUser) => {
            // login successful if there's a jwt token in the response
            if (user && user.isAuthenticated) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.cookieService.put('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    updateLogin(user: LoginUser) {
        if (user) {
            //localStorage.setItem('currentUser', JSON.stringify(user));
            this.cookieService.put('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
    }

    isCookiesCleared() {
        return this.cookieService.get('currentUser') === '' ? true : false;
    }

    clearCookies() {
        localStorage.removeItem('viewOrderParams');
        this.cookieService.removeAll();
    }

    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        localStorage.removeItem('viewOrderParams');
        this.cookieService.removeAll();
        this.currentUserSubject.next(null);
    }
}