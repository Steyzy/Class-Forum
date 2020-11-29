import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
const config = {
  apiKey: "AIzaSyADLIkRHrvfnYRjcsgJg_nvpNJxfK82rD4",
  authDomain: "course-forum-38893.firebaseapp.com",
  databaseURL: "https://course-forum-38893.firebaseio.com",
  projectId: "course-forum-38893",
  storageBucket: "course-forum-38893.appspot.com",
  messagingSenderId: "1086034347505",
  appId: "1:1086034347505:web:056340175d30a1c84b3050",
  measurementId: "G-E4F9LGF4XE"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
