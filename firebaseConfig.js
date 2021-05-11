import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
//import 'firebase/database';
import 'firebase/firestore';
//import 'firebase/messaging';
//import 'firebase/functions';

var firebaseConfig = {
    apiKey: "AIzaSyC04eFlRCoEH9h6GIiERLdtz6N6cHL8tpI",
    authDomain: "pharmaclin-mobile-c449b.firebaseapp.com",
    projectId: "pharmaclin-mobile-c449b",
    storageBucket: "pharmaclin-mobile-c449b.appspot.com",
    messagingSenderId: "1051509209242",
    appId: "1:1051509209242:web:175b49a74445575de4c723",
    measurementId: "G-ZV8Q5V0MJ0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;