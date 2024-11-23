// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgC-rl1F7qvq0i6JIBQwJzBDrmc67X0O8",
  authDomain: "blogging-app-cf3a3.firebaseapp.com",
  projectId: "blogging-app-cf3a3",
  storageBucket: "blogging-app-cf3a3.firebasestorage.app",
  messagingSenderId: "812040248352",
  appId: "1:812040248352:web:372394b97538f077bd7045",
  measurementId: "G-E9GPCF0BMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;