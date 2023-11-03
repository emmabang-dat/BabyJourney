import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePopoverComponent } from 'src/app/datetime-popover/datetime-popover.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DatetimePopoverComponent],
  imports: [CommonModule, IonicModule],
  exports: [DatetimePopoverComponent]
})
export class SharedModule { }
