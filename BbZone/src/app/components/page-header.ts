import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  template: `<div class="row wrapper border-bottom white-bg page-heading mrg15B">
                <div class="col-lg-10">
                    <h2>{{title}}</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a [routerLink]='["/"]'>Home</a>
                        </li>
                        <li class="breadcrumb-item" *ngIf="parentCategory">
                            <a>{{parentCategory}}</a>
                        </li>
                        <li class="breadcrumb-item active">
                            <strong>{{title}}</strong>
                        </li>
                    </ol>
                </div>
                <div class="col-lg-2">
                </div>
            </div>`,
})

export class PageHeader {

  @Input() title: string;
  @Input() parentCategory: string = null;
}
