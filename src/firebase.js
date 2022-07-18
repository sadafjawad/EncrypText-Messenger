// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZR45Uw0DWJ1knEctWYWkywKPRcY_JhBM",
  authDomain: "encryptext-4e9b9.firebaseapp.com",
  projectId: "encryptext-4e9b9",
  storageBucket: "encryptext-4e9b9.appspot.com",
  messagingSenderId: "443867784538",
  appId: "1:443867784538:web:5e211dbcbdda613ccd3f63",
  measurementId: "G-9YGW30F3ZR",
  databaseURL: "http://encryptext-4e9b9.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataBase = getFirestore(app);
const storage = getStorage(app);
export { auth, dataBase, storage };
// const analytics = getAnalytics(app);

