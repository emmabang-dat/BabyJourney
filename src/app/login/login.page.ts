import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email!: string;
  password!: string;

  constructor(public toastController: ToastController) {}

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
        this.presentToast("User logged in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error logging in:", errorMessage);
        this.presentToast("Error logging in. Please try again.");
      });
  }

}
