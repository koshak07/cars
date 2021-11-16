import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDeiv5dWCS3tySCX1XPiesltPQqQoMr1C8",
  authDomain: "shopcar-7e2e6.firebaseapp.com",
  projectId: "shopcar-7e2e6",
  storageBucket: "shopcar-7e2e6.appspot.com",
  messagingSenderId: "243570777838",
  appId: "1:243570777838:web:e5f0859a287b4f207cddff",
  measurementId: "G-E8NVDFY8YY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)