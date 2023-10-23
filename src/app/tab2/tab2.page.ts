import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/database';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  data: any;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.fetchData().then((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
}
