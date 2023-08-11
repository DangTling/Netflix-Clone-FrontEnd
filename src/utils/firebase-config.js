// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwByuqX_ZQdO7wQa1NSK4cF6wDswbUtIA",
  authDomain: "netflix-clone-9764f.firebaseapp.com",
  projectId: "netflix-clone-9764f",
  storageBucket: "netflix-clone-9764f.appspot.com",
  messagingSenderId: "349514749650",
  appId: "1:349514749650:web:6343fd1694d4ddbab5ff0b",
  measurementId: "G-6LSF2H8QFH",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
