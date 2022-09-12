import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MqttConfigPageRoutingModule } from './mqtt-config-routing.module';

import { MqttConfigPage } from './mqtt-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MqttConfigPageRoutingModule
  ],
  declarations: [MqttConfigPage]
})
export class MqttConfigPageModule {}
