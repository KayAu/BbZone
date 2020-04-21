import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BroadcastService {
    private notifySubject = new Subject<any>();

    notification = this.notifySubject.asObservable();

    constructor(){}

    public notify(data?: any) {
        if (data) {
            this.notifySubject.next(data);
        }
        else {
            this.notifySubject.next();
        }
    }


}