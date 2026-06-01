// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsXsTojJScsppSAJswqjmo941zw2GSWsU",
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

// Export these so we can use them in your login page later
export { auth, googleProvider };