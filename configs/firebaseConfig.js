// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "datvu-project.firebaseapp.com",
  projectId: "datvu-project",
  storageBucket: "datvu-project.firebasestorage.app",
  messagingSenderId: "926338423365",
  appId: "1:926338423365:web:2fbc154255d0d4cc08a12c",
  measurementId: "G-3Z6G30K104",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);