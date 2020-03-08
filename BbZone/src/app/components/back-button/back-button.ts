import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'back-button',
    template: `<button type="button" class="btn btn-default float-right" (click)="backToPrev()">Cancel</button>`
})

export class BackButton {

    constructor(private location: Location, private router: Router) {
    }

    backToPrev() {
        if (this.location.path) {
            this.location.back();
        }
        //else {
        //    this.router.navigate(['/']);
        //}
    }
}
