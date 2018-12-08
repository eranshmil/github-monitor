import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorComponent } from './monitor.component';
import { CommitsComponent } from './containers/commits/commits.component';
import { ForksComponent } from './containers/forks/forks.component';
import { IssuesComponent } from './containers/issues/issues.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {
        path: '',
        redirectTo: 'commits',
        pathMatch: 'full'
      },
      {
        path: 'commits',
        component: CommitsComponent
      },
      {
        path: 'forks',
        component: ForksComponent
      },
      {
        path: 'issues',
        component: IssuesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {}
