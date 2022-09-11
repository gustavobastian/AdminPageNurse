import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulerPage } from './scheduler.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulerPageRoutingModule {}
