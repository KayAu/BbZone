import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from 'src/app/enums/apiController';

@Component({
    selector: 'announcement',
    templateUrl: './announcement.html'
})

export class Announcement 
{
    dataSource: any[] = [];

    constructor(public loaderService: LoaderService, public dataService: DataService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {  
        this.dataService.getAll(`${ApiController.Announcement}/GetAnnouncements`).subscribe(results => {
            this.dataSource = results;          
        });
    }
}
