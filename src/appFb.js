import { initializeApp } from "firebase/app";
import {
  getAuth as getFbAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const getAuth = getFbAuth;
export const signUp = { withEmailAndPw: createUserWithEmailAndPassword };
export const signIn = { withEmailAndPw: signInWithEmailAndPassword };

export default app;
