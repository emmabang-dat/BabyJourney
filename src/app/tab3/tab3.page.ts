import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page {
  isModalOpen1 = false;
  isModalOpen2 = false;

  setOpen1(isOpen: boolean) {
    this.isModalOpen1 = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }
}
