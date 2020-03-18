import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';

@Component({
    selector: 'submission-status-count',
    templateUrl: './submission-status-count.html',
    styleUrls: ['./submission-status-count.css']
})

export class SubmissionStatusCount {
    selectedYear: number;
    yearOptions: number[] = [];
    dashboardData: any[] = [];

    constructor(public dataService: DataService) {
        this.loadYearOptions();
        this.loadData();
    }

    loadData() {
        this.dataService.get(`${ApiController.Dashboard}/GetSubmissionStatusCount`, this.selectedYear ).subscribe(data => {
            this.dashboardData = data;
        });
    }

    loadYearOptions() {
        let currentYear = (new Date()).getFullYear();

        for (var year = 2019; year <= currentYear; year++) {
            this.yearOptions.push(year);
        }
        this.selectedYear = currentYear;
    }

    onYearSelected(year: number) {
        this.selectedYear = year;
        this.loadData();
    }

}