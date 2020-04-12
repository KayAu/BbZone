import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';  
import { Observable } from 'rxjs/Rx';  


@Injectable()
export class DataService {
   
    headerOptions: any;

    constructor(private http: HttpClient) {        
        this.headerOptions = { headers: new HttpHeaders({ 'Content-Type': "application/json" }) };
    }

    export(apiControllerName: string, filterParams: any) {

        //let headerOptions = { headers: new HttpHeaders({ 'Content-Type': "application/json" }), responseType: 'blob'};
        return this.http.post(this.getWebMethodUrl(apiControllerName), JSON.stringify(filterParams), { headers: new HttpHeaders({ 'Content-Type': "application/json" }), responseType: 'blob'}).catch(this.errorHandler);


    }

    get(apiControllerName: string, recordId?: any): any {
        return this.http.get(this.getWebMethodUrl(apiControllerName, recordId), this.headerOptions).catch(this.errorHandler);
    }

    add(apiControllerName: string, record: any): any {
        return this.http.post(this.getWebMethodUrl(apiControllerName), JSON.stringify(record), this.headerOptions).catch(this.errorHandler);
    }

    postForm(apiControllerName: string, formData: any): any {
        return this.http.post(this.getWebMethodUrl(apiControllerName), formData).catch(this.errorHandler);
    }

    updateForm(apiControllerName: string, recordId: any, formData: any): any {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), formData).catch(this.errorHandler);
    }

    update(apiControllerName: string, recordId: any, record: any):any {
        return this.http.put(this.getWebMethodUrl(apiControllerName, recordId), JSON.stringify(record), this.headerOptions).catch(this.errorHandler);
    }

    remove(apiControllerName: string, recordId: number) {
        return this.http.delete(this.getWebMethodUrl(apiControllerName, recordId)).catch(this.errorHandler);
    }

    getListDataByPage(apiControllerName: string, fromRecord: number, pageSize: number = 25, filterParams: any, sortColumn: string, sortInAsc: boolean): Observable<any> {
        let searchParams = typeof filterParams === 'object' ? JSON.stringify(filterParams) : filterParams;
        let params = new HttpParams();
        params = params.append('currentPage', fromRecord.toString())
                        .append('pageSize', pageSize.toString())
                        .append('sortColumn', sortColumn    )
                        .append('sortInAsc', sortInAsc.toString())
                        .append('searchParams', searchParams);
        return this.http.get(this.getWebMethodUrl(apiControllerName), { params }).catch(this.errorHandler);
    }

    getAll(apiControllerName: string): Observable<any> {
        return this.http.get(this.getWebMethodUrl(apiControllerName), this.headerOptions).catch(this.errorHandler);
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


