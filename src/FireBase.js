// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYeOTGxCbw_TBxafhu0M5s8WA-viPIFbM",
  authDomain: "del-luna.firebaseapp.com",
  projectId: "del-luna",
  storageBucket: "del-luna.appspot.com",
  messagingSenderId: "861813498118",
  appId: "1:861813498118:web:f1a177117008ea94727e87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

