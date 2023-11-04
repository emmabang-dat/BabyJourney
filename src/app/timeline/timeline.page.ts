import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FirestoreService } from '../../services/database';
import { ModalAddPage } from '../modal/modal-add/modal-add.page';
import { ModalController, NavController } from '@ionic/angular';
import { OverviewPage } from '../modal/overview/overview.page';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  data: any;
  imageUrl: string[] = [];
  lastDoc: any;
  displayData: any;
  constructor(
    private firestoreService: FirestoreService,
    private cdRef: ChangeDetectorRef,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.firestoreService.fetchData().then((data) => {
      if (data) {
        this.data = data;
        this.displayData = [...this.data].reverse();
        this.data.forEach((item: any) => {
          this.imageUrl.push(item['PhotoURL']);
        });
      }
      if (this.data.length < 4) {
        this.loadMoreItems();
      }
      this.cdRef.detectChanges();
      this.scrollToBottom();
    });

    this.firestoreService.fetchDataRealtime((data) => {
      this.data = data;
      this.displayData = [...this.data].reverse();
      this.cdRef.detectChanges();
    });
  }

  scrollToBottom() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  loadMoreItems() {
    this.firestoreService.getNextData(this.lastDoc).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData) {
          docData['Date'] = new Date(
            docData['Date'].seconds * 1000
          ).toLocaleDateString('da-DK');
          this.data.push(docData);
        }
      });
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    });
  }

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.loadMoreItems();
    }
  }

  addData(newData: any) {
    if (
      new Date(newData.Date).getTime() > new Date(this.data[-1].Date).getTime()
    ) {
      this.data.unshift(newData);
      if (this.data.length > 4) {
        this.data.pop();
      }
    }
  }

  async addNewEvent() {
    const modal = await this.modalController.create({
      component: ModalAddPage,
      cssClass : 'my-modal',
    });

    await modal.present();
  }

  async openOverview(item: any){
    const modal = await this.modalController.create({
      component: OverviewPage,
      cssClass : 'my-modal',  componentProps: { 
        item: item,
        docId: item.id 
      }
    });

    await modal.present();
  }
}