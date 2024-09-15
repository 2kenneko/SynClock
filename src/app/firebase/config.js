// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx6XmYnxFx5sqKF6UD8cXlV9wLqDBvvao",
  authDomain: "clockshare-f8b57.firebaseapp.com",
  projectId: "clockshare-f8b57",
  storageBucket: "clockshare-f8b57.appspot.com",
  messagingSenderId: "134879585111",
  appId: "1:134879585111:web:9f0c64e607de37fc19d412",
  measurementId: "G-RJY7DQRXPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);