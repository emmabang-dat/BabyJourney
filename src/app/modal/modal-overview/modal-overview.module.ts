import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOverviewPageRoutingModule } from './modal-overview-routing.module';

import { ModalOverviewPage } from './modal-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOverviewPageRoutingModule
  ],
  declarations: [ModalOverviewPage]
})
export class ModalOverviewPageModule {}
