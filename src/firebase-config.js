import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
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
export const db = getDatabase(fire);
