import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsPacientPage } from './stats-pacient.page';

const routes: Routes = [
  {
    path: '',
    component: StatsPacientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsPacientPageRoutingModule {}
