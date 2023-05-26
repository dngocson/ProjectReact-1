// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDb2ibM0HP_qUXcEcGzf7UFY1yiu8JhSvI",
  authDomain: "reactjs-project-450f5.firebaseapp.com",
  projectId: "reactjs-project-450f5",
  storageBucket: "reactjs-project-450f5.appspot.com",
  messagingSenderId: "532934481868",
  appId: "1:532934481868:web:bfa4f16cedc9cce3ba2f69",
  measurementId: "G-YHJSSTGDLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
