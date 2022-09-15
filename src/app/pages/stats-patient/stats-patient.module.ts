import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPatientPageRoutingModule } from './stats-patient-routing.module';

import { StatsPatientPage } from './stats-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPatientPageRoutingModule
  ],
  declarations: [StatsPatientPage]
})
export class StatsPatientPageModule {}
