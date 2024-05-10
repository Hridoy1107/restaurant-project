// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIWcnh0oD8WQhX8sgeZTOPirtpqNggGTg",
  authDomain: "restaurant-project-6b5ac.firebaseapp.com",
  projectId: "restaurant-project-6b5ac",
  storageBucket: "restaurant-project-6b5ac.appspot.com",
  messagingSenderId: "795970717814",
  appId: "1:795970717814:web:6560c71d253c117ab6f757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;