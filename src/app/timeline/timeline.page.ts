import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/database';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  data: any;
  imageUrl: string[] = [];
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.fetchData().then((data) => {
      if (data) {
        this.data = data.slice(0, 4);
        this.data.forEach((item: any) => {
          item.Description = this.truncateText(item.Description, 80);
          this.imageUrl.push(item['PhotoURL']);
        });
      }
    });
  }

  //Antal charaters i description-card
  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  addData(newData: any) {
    if (new Date(newData.Date).getTime() > new Date(this.data[-1].Date).getTime()) {
      this.data.unshift(newData);
      if (this.data.length > 4) {
        this.data.pop(); 
      }
    }
  }

// Logik for fab button
  addNewEvent() {
    console.log('FAB clicked!');
  }

}
