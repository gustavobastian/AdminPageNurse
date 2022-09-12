import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MqttConfigPage } from './mqtt-config.page';

const routes: Routes = [
  {
    path: '',
    component: MqttConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MqttConfigPageRoutingModule {}
