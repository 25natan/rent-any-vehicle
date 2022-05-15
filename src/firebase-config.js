// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL2S67sdxhEgvaUEr_bf2KMZpduo-k2J4",
  authDomain: "rent-any-vehicle.firebaseapp.com",
  projectId: "rent-any-vehicle",
  storageBucket: "rent-any-vehicle.appspot.com",
  messagingSenderId: "805578427544",
  appId: "1:805578427544:web:ea5e963a1ef7696a0f94ed",
  measurementId: "G-DPHW8NJCR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);