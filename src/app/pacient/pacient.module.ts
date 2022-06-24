import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientPageRoutingModule } from './pacient-routing.module';

import { PacientPage } from './pacient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientPageRoutingModule
  ],
  declarations: [PacientPage]
})
export class PacientPageModule {}
