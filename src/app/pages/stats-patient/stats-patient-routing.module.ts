import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsPatientPage } from './stats-patient.page';

const routes: Routes = [
  {
    path: '',
    component: StatsPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsPatientPageRoutingModule {}
