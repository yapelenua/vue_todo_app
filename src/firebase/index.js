// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCk9yyqyzpqlYCYqRfhitoyBvvTpV3LIBc',
  authDomain: 'todos-93d1f.firebaseapp.com',
  projectId: 'todos-93d1f',
  storageBucket: 'todos-93d1f.appspot.com',
  messagingSenderId: '460896936922',
  appId: '1:460896936922:web:926cc9bf557ca9df0556e3'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}