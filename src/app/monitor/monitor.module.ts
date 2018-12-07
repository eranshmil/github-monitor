import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { CommitsComponent } from './containers/commits/commits.component';
import { ForksComponent } from './containers/forks/forks.component';
import { IssuesComponent } from './containers/issues/issues.component';

@NgModule({
  declarations: [
    MonitorComponent,
    CommitsComponent,
    ForksComponent,
    IssuesComponent
  ],
  imports: [SharedModule, MonitorRoutingModule]
})
export class MonitorModule {}
