import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYGOCpNmPqLm-ozM9csp5ulFNB2AVGfN4",
  authDomain: "sample-firebase-ai-app-1d35d.firebaseapp.com",
  projectId: "sample-firebase-ai-app-1d35d",
  storageBucket: "sample-firebase-ai-app-1d35d.firebasestorage.app",
  messagingSenderId: "412333696880",
  appId: "1:412333696880:web:3c65101ba5165abdf5d1b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
