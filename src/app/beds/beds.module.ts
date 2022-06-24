import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BedsPageRoutingModule } from './beds-routing.module';

import { BedsPage } from './beds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BedsPageRoutingModule
  ],
  declarations: [BedsPage]
})
export class BedsPageModule {}
