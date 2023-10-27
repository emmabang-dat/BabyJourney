import { Component, ViewChild } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastController, NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  @ViewChild(IonModal) modal!: IonModal;

  email!: string;
  password!: string;
  message!: string;

  constructor(public toastController: ToastController, private navCtrl: NavController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  login() {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User logged in:", user);
        this.presentToast("User logged in successfully!").then(() => {
          this.navCtrl.navigateForward('/tabs/tab1');
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error logging in:", errorMessage);
        this.presentToast("Error logging in. Please try again.");
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
