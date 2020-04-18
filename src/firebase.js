import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyA6OTzzAkHiAVRgSnyEhSMMI3dMRdtXxFg",
    authDomain: "react-slack-app-a4bf9.firebaseapp.com",
    databaseURL: "https://react-slack-app-a4bf9.firebaseio.com",
    projectId: "react-slack-app-a4bf9",
    storageBucket: "react-slack-app-a4bf9.appspot.com",
    messagingSenderId: "652103095852",
    appId: "1:652103095852:web:526967f39f959f987ee389",
    measurementId: "G-R0G3NR24M5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  export default firebase;