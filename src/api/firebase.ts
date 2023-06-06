import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDkqVHxlh4tsQKqoXiMueA4_tGkylbW2Xk',
  authDomain: 'library-7a4ac.firebaseapp.com',
  databaseURL: 'https://library-7a4ac-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'library-7a4ac',
  storageBucket: 'library-7a4ac.appspot.com',
  messagingSenderId: '348777418437',
  appId: '1:348777418437:web:09a64a98b80495fbee6aac',
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
