import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import {
  CommitsComponent,
  ForksComponent,
  IssuesComponent
} from './containers';
import { FilterInputComponent } from './components';
import { CommitService, ForkService, IssueService } from './services';

@NgModule({
  declarations: [
    MonitorComponent,
    CommitsComponent,
    ForksComponent,
    IssuesComponent,
    FilterInputComponent
  ],
  imports: [SharedModule, MonitorRoutingModule],
  providers: [CommitService, ForkService, IssueService]
})
export class MonitorModule {}
