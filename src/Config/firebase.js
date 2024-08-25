// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import {getAnalytics} from 'firebase/analytics'
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFM9yOtVYowl1JqnOaZ1KPnO-bnoxK2wY",
  authDomain: "event-junction-145.firebaseapp.com",
  projectId: "event-junction-145",
  storageBucket: "event-junction-145.appspot.com",
  messagingSenderId: "296213774900",
  appId: "1:296213774900:web:439c8b15d1843fd81e0061",
  measurementId: "G-9691HR7J5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {auth , analytics , firestore , storage }
