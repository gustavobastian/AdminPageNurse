import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientPage } from './pacient.page';

const routes: Routes = [
  {
    path: '',
    component: PacientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientPageRoutingModule {}
