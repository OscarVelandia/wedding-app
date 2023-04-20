// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4p9OOJDX-8Xf3c8qa3axBB6vZ-v0hAu4",
  authDomain: "wedding-19fb4.firebaseapp.com",
  projectId: "wedding-19fb4",
  storageBucket: "wedding-19fb4.appspot.com",
  messagingSenderId: "840876073722",
  appId: "1:840876073722:web:14c3486c967ebc10079f43",
  measurementId: "G-WG8YTEE0FG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getFirestore(app)
