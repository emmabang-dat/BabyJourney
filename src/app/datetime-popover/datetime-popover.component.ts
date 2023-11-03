import { Component, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-datetime-popover',
  templateUrl: './datetime-popover.component.html',
  styleUrls: ['./datetime-popover.component.scss'],
})
export class DatetimePopoverComponent {
  constructor(public popoverController: PopoverController) {}

  updateDate(event: Event) {
    if (event instanceof CustomEvent) {
      this.popoverController.dismiss(event.detail.value);
    }
  }
}
