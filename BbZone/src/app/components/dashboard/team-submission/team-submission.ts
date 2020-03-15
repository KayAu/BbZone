import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';

@Component({
    selector: 'team-submission',
    templateUrl: './team-submission.html'
})

export class TeamSubmission {
    totalAgents: number;
    totalCompleted: number;
    totalInProgress: number;
    dashboardData: any[] = [];

    constructor(public dataService: DataService) {
        this.loadData();
    }

    loadData() {
        this.dataService.get(`${ApiController.Dashboard}/GetMyTeamSubmissions`).subscribe(data => {
            this.dashboardData = data.displayData;
            this.totalAgents = data.totalAgents;
            this.getTotal();
        });
    }

    getTotal() {
        this.totalCompleted = this.dashboardData.map(d => d.totalCompleted).reduce((a, b) => a + b, 0);
        this.totalInProgress = this.dashboardData.map(d => d.totalInProgress).reduce((a, b) => a + b, 0);
    }

}