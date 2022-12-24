import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";
=======
import { getDatabase } from "@firebase/database";
>>>>>>> 69e6846faa2fd769419867581eb387894b7ecf61
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBLbHcHqnTMClDa12ibW4oYuFdJ32Nv-pI",
  authDomain: "teambo-c231b.firebaseapp.com",
  projectId: "teambo-c231b",
  storageBucket: "teambo-c231b.appspot.com",
  messagingSenderId: "913130016248",
  appId: "1:913130016248:web:45fc7e991e3afe9d765a0d",
};

export const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
<<<<<<< HEAD
export const db = getDatabase(fire);
=======
export const database = getDatabase(fire);
>>>>>>> 69e6846faa2fd769419867581eb387894b7ecf61
