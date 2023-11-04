import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ForgotPasswordModalPage } from 'src/app/account/forgot-password-modal/forgot-password-modal.page';

import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.validators();
  }

  get email() {
    return this.credentials?.get('email');
  }

  validators() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async forgotPassword() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.forgotPassword(this.credentials.value).then(
      async (res: any) => {
        await loading.dismiss();
        const modal = await this.modalCtrl.create({
          component: ForgotPasswordModalPage,
          cssClass: 'my-modal',
        });
        modal.onDidDismiss().then(() => {
          this.navCtrl.navigateBack('/login');
        });
        await modal.present();
      },
      async (err: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Reset password failed',
          message: err.message,
          buttons: [{ text: 'OK', role: 'ok' }],
        });

        await alert.present();
      }
    );
  }
}
