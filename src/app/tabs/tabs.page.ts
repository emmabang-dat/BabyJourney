import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) {}

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateBack('/intro');
  }
}
