// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Added this line

// Your web app's Firebase configuration
const firebaseConfig = {
  // Adding "as string" tells TypeScript: "Trust me, this variable exists"
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: "marketing-web-1707b.firebaseapp.com",
  projectId: "marketing-web-1707b",
  storageBucket: "marketing-web-1707b.firebasestorage.app",
  messagingSenderId: "498202701301",
  appId: "1:498202701301:web:111f897da28cec232e44bc"
};

// Next.js Best Practice: This checks if Firebase is already running so it doesn't try to start twice.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication and the Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore Database
const db = getFirestore(app); // <-- Added this line

// Export these so we can use them in your login page and utils later
export { auth, googleProvider, db }; // <-- Added db here