import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDw4EZ-LGj0IyMIUfwkS6zcTLcw7M9EHWc",
  authDomain: "pinia-vite-fire9.firebaseapp.com",
  projectId: "pinia-vite-fire9",
  storageBucket: "pinia-vite-fire9.appspot.com",
  messagingSenderId: "1097966452728",
  appId: "1:1097966452728:web:ab38b077cd03a8c50da00d"
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };