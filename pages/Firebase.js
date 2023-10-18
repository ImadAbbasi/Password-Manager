// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM7blOkPovxwRq2Aww1peYUXHgs77ov0Y",
  authDomain: "password-manager-b58bd.firebaseapp.com",
  projectId: "password-manager-b58bd",
  storageBucket: "password-manager-b58bd.appspot.com",
  messagingSenderId: "170279703506",
  appId: "1:170279703506:web:ff87f3bf2a8e77897d6e0b",
  measurementId: "G-C8C5L8XSVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
