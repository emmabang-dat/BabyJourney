import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import { environment } from '../environments/environment';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  fetchData() {
    const docRef = doc(db, "Konrad", "caaUsGfff7dG2fY4hKwd");

    return getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
}
