import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYloUHzRCaHGbhzr_GfhpriRsTLNKCmO4",
  authDomain: "portfolio-jakir.firebaseapp.com",
  projectId: "portfolio-jakir",
  storageBucket: "portfolio-jakir.firebasestorage.app",
  messagingSenderId: "1090516557860",
  appId: "1:1090516557860:web:4dda96814ad03bc40c38b1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();