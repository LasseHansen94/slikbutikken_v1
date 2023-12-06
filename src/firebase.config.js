import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB8efARQdHdUtKWPBJz_y76U_hVP1ndjc",
    authDomain: "slikbutik.firebaseapp.com",
    databaseURL: "https://slikbutik.firebasedatabase.app",
    projectId: "slikbutik",
    storageBucket: "slikbutik.appspot.com",
    messagingSenderId: "1034395634412",
    appId: "1:1034395634412:web:e1e3b30d91be165a80b3c9"
};
  

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();