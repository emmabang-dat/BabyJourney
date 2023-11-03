import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
  }

  async googleLogin() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.authService.googleLogin().then(
      async (res: any) => {
        await loading.dismiss();
        this.router.navigateByUrl('tabs', { replaceUrl: true });
      },
      async (err: any) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: err.message,
          buttons: ['OK'],
        });
  
        await alert.present();
      }
    );
  }

  async facebookLogin() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.authService.facebookLogin().then(
      async (res: any) => {
        await loading.dismiss();
        this.router.navigateByUrl('tabs', { replaceUrl: true });
      },
      async (err: any) => {
        // await loading.dismiss();
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: err.message,
          buttons: ['OK'],
        });
  
        await alert.present();
      }
    );
  }

  toLogin(){
    this.router.navigate(['/login'])
  }

}
