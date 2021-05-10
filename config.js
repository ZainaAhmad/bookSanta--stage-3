import firebase from 'firebase'
require('firebase/auth')
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyD_x_dA-7JLMd88LhV4oOcTFIINkwb2Jyc",
    authDomain: "booksanta-74477.firebaseapp.com",
    projectId: "booksanta-74477",
    storageBucket: "booksanta-74477.appspot.com",
    messagingSenderId: "496826926455",
    appId: "1:496826926455:web:3f5091a8fe5977a1ea4d72",
    measurementId: "G-0RQSGS24Y2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()