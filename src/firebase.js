import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAS7C3FQDtFR6HsfQ3OzDZm29XvgLWvJqo",
  authDomain: "projeto-final-web-444b1.firebaseapp.com",
  databaseURL: "https://projeto-final-web-444b1.firebaseio.com",
  projectId: "projeto-final-web-444b1",
  storageBucket: "projeto-final-web-444b1.appspot.com",
  messagingSenderId: "706027569938",
  appId: "1:706027569938:web:1e7de5e3a83b2492f7a9cb",
  measurementId: "G-MV78FPW0GV"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
