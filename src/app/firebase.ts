
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKPzw8uXJN7nap-uLAzTVuDfmW7f8xRvM",
  authDomain: "swd123-3f572.firebaseapp.com",
  projectId: "swd123-3f572",
  storageBucket: "swd123-3f572.appspot.com",
  messagingSenderId: "750342053622",
  appId: "1:750342053622:web:dbf20125d757eee74616d7",
  measurementId: "G-2S15THZFGJ"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
