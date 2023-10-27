import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOverviewPage } from '../modal/modal-overview/modal-overview.page';
//import { ModalOverviewPage } from '../modal/modal-overview/modal-overview.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page {
  constructor(public modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalOverviewPage,
      componentProps: {
        // Her kan du tilføje eventuelle data, som du vil sende til modalen
      },
    });
    return await modal.present();
  }
}
