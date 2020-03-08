import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'auto-suggest',
  templateUrl: './auto-suggest.html',
  styleUrls: ['./auto-suggest.css']
})

export class AutoSuggest {
  @Input() searchUrl: string;
  @Output() onItemSelected = new EventEmitter();
  results: string[] = [];
  queryField: FormControl = new FormControl();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe(queryField => this.search(queryField)
        .subscribe(response => {
        this.results = response
        }));
  }

  clearSearch() {
    this.queryField.reset();
    this.triggerSearch("");
  }

  triggerSearch(searchValue: string) {
    this.onItemSelected.emit(searchValue);
    this.results = [];
  }

  private search(keyword: string): Observable<any>  {
    if (keyword !== "") {
      let params = new HttpParams();
      params = params.append('keyword', keyword);
      return this.http.get(this.searchUrl, { params }).catch(this.errorHandler);
    }
    else {
      this.clearSearch();
    }
  }

  private errorHandler(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure  
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
