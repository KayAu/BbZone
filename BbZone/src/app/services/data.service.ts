import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';  
import { Observable } from 'rxjs/Rx';  
import { LoginUser } from '../model/login-user';
import { CookieService } from 'angular2-cookie';
import { HttpParamsOptions } from '@angular/common/http/src/params';


@Injectable()
export class DataService {
    currentUser: LoginUser = null;
    //headerOptions: any;
    
    constructor(private http: HttpClient, private cookieService: CookieService) {        
        //this.headerOptions = { headers: new HttpHeaders({ 'Content-Type': "application/json" }) };
    }

    getHeaderOptions() {
        this.currentUser = this.cookieService.get('currentUser') !== undefined ? JSON.parse(this.cookieService.get('currentUser')) : null;

        if (this.currentUser !== null) {
            return {
                headers: new HttpHeaders({
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${this.currentUser.access_token}`
                })
            };
        }
        else
        {
            return { headers: new HttpHeaders({ 'Content-Type': "application/json" }) };
        }
    }

    getHeaderTokenOnlyOption() {
        this.currentUser = this.cookieService.get('currentUser') !== undefined ? JSON.parse(this.cookieService.get('currentUser')) : null;
        if (this.currentUser !== null) 
        {
            return { headers: new HttpHeaders({ Authorization: `Bearer ${this.currentUser.access_token}` }) };
        }
       
    }

    export(apiControllerName: string, filterParams: any) {
        return this.http.post(this.getWebMethodUrl(apiControllerName),
            JSON.stringify(filterParams),
            {
                headers: new HttpHeaders({ 'Content-Type': "application/json", Authorization: `Bearer ${this.currentUser.access_token}` }),
                responseType: 'blob'
            }).catch(this.errorHandler);
    }

    login(apiControllerName: string, username: string, password: string, isAdmin: boolean) {
        const userData = "username=" + username + "&password=" + password + "&isAdmin=" + isAdmin + "&grant_type=password";

        const loginHeaderOptions = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'No-Auth': 'True'
        });

        return this.http.post(this.getWebMethodUrl(apiControllerName), userData, {
            headers: loginHeaderOptions
        }).catch(this.errorHandler);
    }

    get(apiControllerName: string, recordId?: any): any {
        return this.http.get(this.getWebMethodUrl(apiControllerName, recordId), this.getHeaderOptions()).catch(this.errorHandler);
    }

    add(apiControllerName: string, record: any): any {
        return this.http.post(this.getWebMethodUrl(apiControllerName), JSON.stringify(record), this.getHeaderOptions()).catch(this.errorHandler);
    }

    postForm(apiControllerName: string, formData: any): any {
        return this.http.post(this.getWebMethodUrl(apiControllerName), formData, this.getHeaderTokenOnlyOption()).catch(this.errorHandler);
    }

    updateForm(apiControllerName: string, recordId: any, formData: any): any {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), formData, this.getHeaderTokenOnlyOption()).catch(this.errorHandler);
    }

    update(apiControllerName: string, recordId: any, record: any):any {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), JSON.stringify(record), this.getHeaderOptions()).catch(this.errorHandler);
    }

    remove(apiControllerName: string, recordId: number) {
        return this.http.delete(this.getWebMethodUrl(apiControllerName, recordId), this.getHeaderOptions()).catch(this.errorHandler);
    }

    getListDataByPage(apiControllerName: string, fromRecord: number, pageSize: number = 25, filterParams: any, sortColumn: string, sortInAsc: boolean): Observable<any> {
        let searchParams = typeof filterParams === 'object' ? JSON.stringify(filterParams) : filterParams;
        let params = new HttpParams();
        params = params.append('currentPage', fromRecord.toString())
                       .append('pageSize', pageSize.toString())
                       .append('sortColumn', sortColumn)
                       .append('sortInAsc', sortInAsc.toString())
                       .append('searchParams', searchParams);

        let headers = new HttpHeaders({
            'Content-Type': "application/json",
            Authorization: `Bearer ${this.currentUser.access_token}`
        });

        const options = { headers: headers, params: params };
        return this.http.get(this.getWebMethodUrl(apiControllerName), options).catch(this.errorHandler);
    }

    getAll(apiControllerName: string): Observable<any> {
        return this.http.get(this.getWebMethodUrl(apiControllerName), this.getHeaderOptions()).catch(this.errorHandler);
    }

    private getWebMethodUrl(apiControllerName: string, param?: any) {
     
        if (param)
          return `/api/${apiControllerName}/${param}`;
        else
          return `/api/${apiControllerName}`;
    }

    private errorHandler(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure  
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body || JSON.stringify(body); 
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.error ? error.error : error.toString();
        }
   
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

}


