import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PacientPageRoutingModule } from './pacient-routing.module';

import { PacientPage } from './pacient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PacientPageRoutingModule
  ],
  declarations: [PacientPage]
})
export class PacientPageModule {}
