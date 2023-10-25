import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email!: string;
  password!: string;

  constructor(public toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
  }

  signUp() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("New user created:", user);
        this.presentToast("You created a profile! ${user}");

        //TODO: Navigate to homepage

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error creating new user:", errorMessage);
        this.presentToast("Something went wrong ${errorMessage}");
      });
  }

}
