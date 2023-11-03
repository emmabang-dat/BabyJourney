import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/services/database';
import { AlertController } from '@ionic/angular';
import { ModalEditPage } from '../modal-edit/modal-edit.page';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  item: any;
  docId: string = '';

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const modal = await this.modalController.getTop();
    if (modal && modal.componentProps) {
      this.item = modal.componentProps['item'];
      this.docId = modal.componentProps['docId'];
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.delete();
          },
        },
      ],
    });

    await alert.present();
  }

  async delete() {
    console.log(this.docId);
    try {
      await this.firestoreService.deleteData(this.docId);
      const toast = await this.toastController.create({
        message: 'Memory deleted successfully',
        duration: 2000,
        color: 'success',
        cssClass: 'toast-success'
      });
      toast.present();
    } catch (e) {
      console.error('Error deleting document: ', e);
      const toast = await this.toastController.create({
        message: 'Something went wrong',
        duration: 2000,
        color: 'danger',
        cssClass: 'toast-error'
      });
      toast.present();
    }
    this.modalController.dismiss({ delete: true });
  }

  async edit() {
    this.modalController.dismiss();
    setTimeout(async () => {
      const modal = await this.modalController.create({
        component: ModalEditPage,
        cssClass : 'my-modal',
        componentProps: { 
          item: this.item,
          docId: this.docId
        }
      });
  
      await modal.present();
    }, 50); 
  }
}
