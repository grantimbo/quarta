// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Added Auth since you are using Google Login

// Your web app's Firebase configuration using Environment Variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: "G-VQP01VYLEL", // You can also move this to .env if you prefer
};

// Initialize Firebase (Preventing double initialization in Next.js)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics only on the client side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Auth for use in your Login component
export const auth = getAuth(app);
export { app, analytics };
