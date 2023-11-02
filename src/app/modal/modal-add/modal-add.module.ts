import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddPageRoutingModule } from './modal-add-routing.module';

import { ModalAddPage } from './modal-add.page';
import { DatetimePopoverComponent } from 'src/app/datetime-popover/datetime-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddPageRoutingModule
  ],
  declarations: [ModalAddPage, DatetimePopoverComponent]
})
export class ModalAddPageModule {}
