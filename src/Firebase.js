// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDI7GISq_T4vVyPU4tF98R1_a7Hehi9dXc",
  authDomain: "portfolio-fc096.firebaseapp.com",
  databaseURL: "https://portfolio-fc096-default-rtdb.firebaseio.com",
  projectId: "portfolio-fc096",
  storageBucket: "portfolio-fc096.appspot.com",
  messagingSenderId: "890925992173",
  appId: "1:890925992173:web:5a2d61ddda64567fb824e4",
  measurementId: "G-VPL94SSHNM"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export {storage, firebase as default};
