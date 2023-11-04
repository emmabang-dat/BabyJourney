import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { getFirestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  uid = this.auth.currentUser?.uid;
  
  async signup({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const db = getFirestore();
        await setDoc(doc(db, 'users', user.uid),  {
          uid: user.uid,
          email: email,
        });
      }
      return user;
    } catch (error: any) {
      console.log("Error during registration: ", error); // Log the error
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('The email address is already in use by another account.');
      } else {
        throw new Error('An error occurred during registration. Please try again.');
      }
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      console.log("Error during login: ", error); // Log the error
      throw new Error('Invalid email or password. Please try again.');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  async googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(this.auth, provider);
      return user;
    } catch (error) {
      console.log("Error during Google login: ", error); // Log the error
      throw new Error('Google login failed. Please try again.');
    }
  }

  //TODO: make it work.
  async facebookLogin() {
    try {
      const provider = new FacebookAuthProvider();
      const user = await signInWithPopup(this.auth, provider);
      return user;
    } catch (error) {
      console.log("Error during Facebook login: ", error); // Log the error
      throw new Error('Facebook login failed. Please try again.');
    }
  }

  async forgotPassword({ email }: { email: string }) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.log("Error during password reset: ", error); // Log the error
      throw new Error('An error occurred while sending the password reset email. Please try again.');
    }
  }
}