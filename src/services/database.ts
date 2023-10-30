import { Injectable } from '@angular/core';
import { collection, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

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

  getNextData(lastDoc: any) {
    let q = query(
      collection(db, 'Konrad'),
      orderBy('Date', 'desc'),
      startAfter(lastDoc),
      limit(4)
    );
    return getDocs(q);
  }
}
