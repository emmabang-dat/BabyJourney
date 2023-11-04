import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
} from '@angular/fire/auth';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(private authService: AuthenticationService, private router: Router, private auth: Auth, private navCtrl: NavController ) { }
  username = this.auth.currentUser?.email;

  uid = this.authService.uid;
    openTimeline(){
      this.router.navigate(['/timeline'])
    }
    
    openModal(){
      this.router.navigate(['/modal-add'])
    }

    async logout() {
      await this.authService.logout();
      this.navCtrl.navigateBack('/intro');
    }
    
    
  ngOnInit() {
  }
}


