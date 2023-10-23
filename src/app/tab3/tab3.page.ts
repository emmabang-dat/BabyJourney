import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: MyModalComponent,
      componentProps: {
        // Her kan du tilføje eventuelle data, som du vil sende til modalen
      },
    });
    return await modal.present();
  }
}
