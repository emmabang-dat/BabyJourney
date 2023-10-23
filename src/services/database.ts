import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import { environment } from '../environments/environment';

// Initialiser Firebase
const app = initializeApp(environment.firebase);

// Få en reference til Firestore-databasen
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  fetchData() {
    // Get a reference to the document
    const docRef = doc(db, "Konrad", "caaUsGfff7dG2fY4hKwd");

    // Fetch the document
    return getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
}
