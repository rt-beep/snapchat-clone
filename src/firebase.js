import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6QQJA-oliz-MmMKBen31eTsraxIL-YUM",
  authDomain: "snapchat-clone-292f2.firebaseapp.com",
  projectId: "snapchat-clone-292f2",
  storageBucket: "snapchat-clone-292f2.appspot.com",
  messagingSenderId: "40052983260",
  appId: "1:40052983260:web:ad41b1af9211b2dace7b19"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, storage, db, auth, provider };
