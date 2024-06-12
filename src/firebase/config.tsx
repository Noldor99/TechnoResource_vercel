import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "technoresource-dc9ad.firebaseapp.com",
  databaseURL: "https://technoresource-dc9ad-default-rtdb.firebaseio.com",
  projectId: "technoresource-dc9ad",
  storageBucket: "technoresource-dc9ad.appspot.com",
  messagingSenderId: "631988621979",
  appId: "1:631988621979:web:316d7071829ae74fd36c3e",
  measurementId: "G-XQ32E8428M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
