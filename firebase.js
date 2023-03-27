// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYJEQEbhF0B6CzHwTSf50NtR9acIiwfpw",
  authDomain: "signingo-c6b7f.firebaseapp.com",
  projectId: "signingo-c6b7f",
  storageBucket: "signingo-c6b7f.appspot.com",
  messagingSenderId: "596221088121",
  appId: "1:596221088121:web:a71e45a3e209b96e045fa8",
  measurementId: "G-9XNTFWJK8N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
