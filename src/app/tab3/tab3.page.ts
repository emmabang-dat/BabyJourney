import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOverviewPage } from '../modal/modal-overview/modal-overview.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
