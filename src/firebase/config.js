// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNlaxVPEPaAZKWA1cQ26oX-qZ-5VGvFIg",
  authDomain: "films-35627.firebaseapp.com",
  projectId: "films-35627",
  storageBucket: "films-35627.firebasestorage.app",
  messagingSenderId: "440072148225",
  appId: "1:440072148225:web:f4e970b9c97609f7fd3700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };