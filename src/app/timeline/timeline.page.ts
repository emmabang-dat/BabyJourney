import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/database';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  data: any;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.fetchData().then((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
}