import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BedsPage } from './beds.page';

const routes: Routes = [
  {
    path: '',
    component: BedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BedsPageRoutingModule {}
