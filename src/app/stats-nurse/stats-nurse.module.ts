import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsNursePageRoutingModule } from './stats-nurse-routing.module';

import { StatsNursePage } from './stats-nurse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsNursePageRoutingModule
  ],
  declarations: [StatsNursePage]
})
export class StatsNursePageModule {}
