// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAA29tsB21kdD3-8fTPC0qeiubkvBx_Sc",
  authDomain: "moovie-6c6c9.firebaseapp.com",
  projectId: "moovie-6c6c9",
  storageBucket: "moovie-6c6c9.firebasestorage.app",
  messagingSenderId: "947916430351",
  appId: "1:947916430351:web:93268d07a9b8007094577a",
  measurementId: "G-KX5JT8D5XX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
