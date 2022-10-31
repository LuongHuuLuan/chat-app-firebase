import { initializeApp } from "firebase/app";
import {getAnalytics} from 'firebase/analytics';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCM2Sb6QQBdYYAomMk64HTDIR-EaBLHeDY",
  authDomain: "my-chat-app-b3b04.firebaseapp.com",
  projectId: "my-chat-app-b3b04",
  storageBucket: "my-chat-app-b3b04.appspot.com",
  messagingSenderId: "634368008219",
  appId: "1:634368008219:web:05a4e584c5a44c0756d8be",
  measurementId: "G-8C2XQ1DNMR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

 
export {db, auth};