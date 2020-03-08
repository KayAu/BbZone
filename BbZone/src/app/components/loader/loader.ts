import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../loader/loader.service';
import { LoaderState } from '../../loader/loader.state';

@Component({
  selector: 'loading',
  template: `<div class="spinner" *ngIf="show">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
             </div>`
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
