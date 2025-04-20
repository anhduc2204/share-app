// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJfVJrDcKHDF5BaIYmPk_qgH9NIJ7-CN4',
  authDomain: 'noreply@shareapp-976ea.firebaseapp.com',
  projectId: 'shareapp-976ea',
  // storageBucket: 'your-app.appspot.com',
  messagingSenderId: '528183681954',
  appId: '1:528183681954:android:64ac3c26227b06b64588fb'
};

const app = initializeApp(firebaseConfig);
const FirebaseDb = getFirestore(app);
const auth = getAuth(app);
// const FirebaseStorage = getStorage(app);

export { FirebaseDb, auth };
