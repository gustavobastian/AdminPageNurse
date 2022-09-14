import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaSpecTreatPageRoutingModule } from './tabla-spec-treat-routing.module';

import { TablaSpecTreatPage } from './tabla-spec-treat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaSpecTreatPageRoutingModule
  ],
  declarations: [TablaSpecTreatPage]
})
export class TablaSpecTreatPageModule {}
