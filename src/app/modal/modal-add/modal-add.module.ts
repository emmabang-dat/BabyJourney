import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddPageRoutingModule } from './modal-add-routing.module';

import { ModalAddPage } from './modal-add.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddPageRoutingModule,
    SharedModule
  ],
  declarations: [ModalAddPage]
})
export class ModalAddPageModule {}
