import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { Timestamp, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { DatetimePopoverComponent } from 'src/app/datetime-popover/datetime-popover.component';
import { FirestoreService } from 'src/services/database';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {
  @ViewChild('popoverContent') popoverContent!: TemplateRef<any>;
  item: any;
  docId: string = '';
  selectedDate = '01 January 1970';
  imageUrl: string | undefined;
  description: string = '';
  isEditingPhoto = false;

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    public popoverController: PopoverController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const modal = await this.modalController.getTop();
    if (modal && modal.componentProps) {
      this.item = modal.componentProps['item'];
      this.docId = modal.componentProps['docId'];
      this.selectedDate = new Date(this.item.Date.split('.').reverse().join('-')).toISOString();
      this.description = this.item.Description;
      this.imageUrl = this.item.PhotoURL;
      this.isEditingPhoto = false;

      this.cdr.detectChanges();
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  editPhoto() {
    this.isEditingPhoto = true;
  }
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    this.imageUrl = image.webPath;
    this.isEditingPhoto = false;
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    this.imageUrl = image.webPath;
    this.isEditingPhoto = false;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DatetimePopoverComponent,
      event: ev,
      translucent: true,
    });

    popover.onDidDismiss().then((data) => {
      if (data.data) {
        this.updateDate(data.data);
      }
    });

    return await popover.present();
  }

  updateDate(date: string) {
    this.selectedDate = date;
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
    await this.firestoreService.deleteData(this.docId);
    this.modalController.dismiss({ delete: true });
  }

  async save() {
    const data = {
      Date: Timestamp.fromDate(new Date(this.selectedDate)),
      Description: this.description,
      PhotoURL: this.imageUrl,
    };
    try {
      const docRef = doc(this.firestoreService.db, 'Konrad', this.docId);
      await updateDoc(docRef, data);
      console.log('Document updated with ID: ', this.docId);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  
    this.modalController.dismiss();
  }
}
