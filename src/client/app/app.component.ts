import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isMobile: boolean;

  private _mobileBreakpointSubscription: Subscription;

  constructor(
    private _translate: TranslateService,
    private _breakpointObserver: BreakpointObserver
  ) {}

  /**
   * Control sidenav behaviors in mobile/desktop.
   */
  private _initResponsiveSidenav() {
    this._mobileBreakpointSubscription = this._breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(breakpointState => (this.isMobile = breakpointState.matches));
  }

  ngOnInit() {
    this._translate.use('en');

    this._initResponsiveSidenav();
  }

  ngOnDestroy() {
    this._mobileBreakpointSubscription.unsubscribe();
  }
}
