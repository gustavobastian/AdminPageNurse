import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPacientPageRoutingModule } from './stats-pacient-routing.module';

import { StatsPacientPage } from './stats-pacient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPacientPageRoutingModule
  ],
  declarations: [StatsPacientPage]
})
export class StatsPacientPageModule {}
