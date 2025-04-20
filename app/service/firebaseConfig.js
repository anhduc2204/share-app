// src/services/firebaseConfig.js
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage'; // Uncomment nếu cần sử dụng Firebase Storage

const firebaseConfig = {
  apiKey: 'AIzaSyDJfVJrDcKHDF5BaIYmPk_qgH9NIJ7-CN4',
  authDomain: 'noreply@shareapp-976ea.firebaseapp.com',
  projectId: 'shareapp-976ea',
  messagingSenderId: '528183681954',
  appId: '1:528183681954:android:64ac3c26227b06b64588fb',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // nếu Firebase đã được khởi tạo rồi thì không cần khởi tạo lại
}
const FirebaseDb = firestore();
const FirebaseAuth = auth();
// const FirebaseStorage = storage();

export { FirebaseDb, FirebaseAuth };
