import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// TODO: Replace with your project's actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjoNxhfNSw_h7JM3oTYNPFfliOXoafU2c",
  authDomain: "aquaventure-42ms0.firebaseapp.com",
  projectId: "aquaventure-42ms0",
  storageBucket: "aquaventure-42ms0.firebasestorage.app",
  messagingSenderId: "916310100943",
  appId: "1:916310100943:web:a22b6ca9aebbfebd5c20ba"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services you plan to use
export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

export default app;