import { Component, OnInit } from '@angular/core';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup | any;

  // email!: string;
  // password!: string;

  constructor(
    public toastController: ToastController, 
    private navCtrl: NavController,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
    this.validators();
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  get rePassword() {
    return this.credentials?.get('rePassword');
  }

  validators() {
    this.credentials = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    let pass = control.get('password')?.value || '';
    let confirmPass = control.get('rePassword')?.value || '';

    return pass === confirmPass ? null : { notSame: true };
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    try {
      console.log(this.credentials.value)
      const user = await this.authService.signup(this.credentials.value);
      await loading.dismiss();
      console.log(user);
      if (user) {
        // this.navCtrl.navigateBack('login', { replaceUrl: true });
        this.presentToast('Succesfully signed up!\nWelcome ' + user.email);
        this.navCtrl.navigateForward('tabs/dashboard');
      }
    } catch (error: any) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: error.message,
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

  // signUp() {
  //   const auth = getAuth();

  //   createUserWithEmailAndPassword(auth, this.email, this.password)
  //     .then((userCredential) => {
  //       // Signed up 
  //       const user = userCredential.user;
  //       console.log("New user created:", user);
  //       this.presentToast("You created a user! Thanks for joining :)").then(() => {
  //         this.navCtrl.navigateForward('/tabs/dashboard');
  //       });

  //       //TODO: Navigate to homepage

  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log("Error creating new user:", errorMessage);
  //       this.presentToast("Something went wrong: Password should be atleast 6 characters.");
  //     });
  // }

}
