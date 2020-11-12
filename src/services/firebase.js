import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
const config = {
  apiKey: "AIzaSyADLIkRHrvfnYRjcsgJg_nvpNJxfK82rD4",
  authDomain: "course-forum-38893.firebaseapp.com",
  databaseURL: "https://course-forum-38893.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
