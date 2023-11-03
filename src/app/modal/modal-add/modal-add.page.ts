import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DatetimePopoverComponent } from 'src/app/datetime-popover/datetime-popover.component';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { FirestoreService } from 'src/services/database';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {
  @ViewChild('popoverContent') popoverContent!: TemplateRef<any>;
  selectedDate = '01 January 1970';
  imageUrl: string | undefined;
  description: string = "";
  constructor(
    private modalController: ModalController,
    public popoverController: PopoverController,
    private firestoreService: FirestoreService
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    this.imageUrl = image.webPath;
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    this.imageUrl = image.webPath;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DatetimePopoverComponent,
      event: ev,
      translucent: true,
    });

    // Listen for the 'dateChange' event from the popover
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

  async save() {
    const data = {
      Date: Timestamp.fromDate(new Date(this.selectedDate)),
      Description: this.description,
      PhotoURL: this.imageUrl,
    };
  
    try {
      const docRef = await addDoc(collection(this.firestoreService.db, 'Konrad'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
