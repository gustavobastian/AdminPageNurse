import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsNursePage } from './stats-nurse.page';

const routes: Routes = [
  {
    path: '',
    component: StatsNursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsNursePageRoutingModule {}
