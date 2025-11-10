import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW2eI26806p45Pk31Tk3PHu3VDTybGXNQ",
  authDomain: "corelab-c3668.firebaseapp.com",
  projectId: "corelab-c3668",
  storageBucket: "corelab-c3668.firebasestorage.app",
  messagingSenderId: "988407391761",
  appId: "1:988407391761:web:91bb60aa36962f9a75b3b0",
  measurementId: "G-2ME0CQW9MS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage references
export const auth = getAuth(app);
export const db = getFirestore(app);

