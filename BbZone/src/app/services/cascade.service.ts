import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CascadeService {
    public subject = new Subject<any>();
    constructor() { }
}