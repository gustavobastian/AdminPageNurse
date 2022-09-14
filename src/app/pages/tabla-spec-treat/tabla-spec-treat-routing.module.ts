import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaSpecTreatPage } from './tabla-spec-treat.page';

const routes: Routes = [
  {
    path: '',
    component: TablaSpecTreatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaSpecTreatPageRoutingModule {}
