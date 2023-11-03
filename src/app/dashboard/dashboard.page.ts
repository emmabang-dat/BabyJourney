import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(private router: Router, private auth: Auth) { }
  username = this.auth.currentUser?.email;

    openTimeline(){
      this.router.navigate(['/timeline'])
    }
    
    openModal(){
      this.router.navigate(['/modal-add'])
    }
    
    
  ngOnInit() {
  }
}


