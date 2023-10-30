import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from 'firebase/firestore';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor() {}

  fetchData() {
    const q = query(collection(db, 'Konrad'), orderBy('Date', 'desc'));

    return getDocs(q)
      .then((querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData) {
            docData['Date'] = new Date(
              docData['Date'].seconds * 1000
            ).toLocaleDateString('da-DK');
            data.push(docData);
          }
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents:', error);
      });
  }
}
