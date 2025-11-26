import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgOK3DYPLNKeQkrVEByOp4nC9SqA2khLs",
  authDomain: "shopnest-official.firebaseapp.com",
  projectId: "shopnest-official",
  storageBucket: "shopnest-official.firebasestorage.app",
  messagingSenderId: "1092056605420",
  appId: "1:1092056605420:web:233dce5cc665e806ecbbc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);