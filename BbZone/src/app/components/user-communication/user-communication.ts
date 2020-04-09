import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { LoginUser } from 'src/app/model/login-user';
import { ApiController } from '../../enums/apiController';


@Component({
    selector: 'user-communication',
    templateUrl: './user-communication.html',
})

export class UserCommunication  {
    currentUser: LoginUser;
    textMessage: string;
    isUpdating: boolean = false;
    unreadMessages: number;
    communications: any[] = [];
    showCommunicationPanel: boolean = false;
    @Input() applicationId: number;

    constructor(public loaderService: LoaderService,
        public dataService: DataService) { }

    ngOnInit() { 
        //this.currentUser = this.authenticationService.currentUserValue;
        this.loadRecord();
    }

    loadRecord() {
        this.dataService.get(`${ApiController.Communication}`, this.applicationId).subscribe(results => {
            this.communications = results.communications;
            this.unreadMessages = results.unreadMessages;
        });
    }

    handleCommunication() {
        this.showCommunicationPanel = !this.showCommunicationPanel;
        if (this.unreadMessages > 0) {
            this.dataService.update(`${ApiController.Communication}`, this.applicationId, null).subscribe(results => {
                this.unreadMessages = 0;
            });
        }
    }
    
    submit() {
        if (this.textMessage) {
            let newMessage = { applicationId : this.applicationId, message : this.textMessage };
            this.dataService.add(`${ApiController.Communication}`, newMessage).subscribe(results => {
                if (results) {
                    this.communications.push(results);
                    this.textMessage = '';
                }
            });
        }
    }
}
