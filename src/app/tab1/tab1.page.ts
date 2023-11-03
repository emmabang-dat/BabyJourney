import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Auth } from 'firebase/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private authService: AuthenticationService, private navCtrl: NavController) { }
  uid = this.authService.uid;


  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateBack('/intro');
  }

}
