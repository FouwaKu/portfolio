// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDTEfNow7u9u37heoYmAwPt2fhMYaHQa54",
  authDomain: "portfolio-cdd5e.firebaseapp.com",
  projectId: "portfolio-cdd5e",
  storageBucket: "portfolio-cdd5e.appspot.com",
  messagingSenderId: "478409892314",
  appId: "1:478409892314:web:7612e85117b1a73ac2a0e3",
  measurementId: "G-EB3FHBKGYL"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export {storage, firebase as default};
