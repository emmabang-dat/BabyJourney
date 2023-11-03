import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})

export class LoginPage {
  credentials: FormGroup | any;
  email!: string;
  password!: string;
  message!: string;

  constructor(
    public toastController: ToastController,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    ) { }

    ngOnInit() {
      this.validators();
     }
    //  get email() {
    //   return this.credentials?.get('email');
    // }
  
    // get password() {
    //   return this.credentials?.get('password');
    // }
  
    validators() {
      this.credentials = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }

  //Not sure with toast yet.
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.authService.login(this.credentials.value).then(
      async (res: any) => {
        await loading.dismiss();
        // this.router.navigateByUrl('tabs', { replaceUrl: true });
        this.router.navigateByUrl('tabs/tab1');
        this.presentToast('');
      },
      async (err: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: err.message,
          buttons: ['OK'],
        });
  
        await this.presentToast('Login Failed, something went wrong:\n' + alert.present());
      }
    );
  }

  navToForgotPassword() {
    this.navCtrl.navigateForward(['login/forgot-password'])
  }

  

  //For inline modal
  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }
  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `Hello, ${ev.detail.data}!`;
  //   }
  // }

}
