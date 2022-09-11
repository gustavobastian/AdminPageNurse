import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulerPageRoutingModule } from './scheduler-routing.module';

import { SchedulerPage } from './scheduler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SchedulerPageRoutingModule
  ],
  declarations: [SchedulerPage]
})
export class SchedulerPageModule {}
