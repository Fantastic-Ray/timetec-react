import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCaiqUn1UMOwuHVT01Mw8s-OSQl9QNHgpc",
  authDomain: "timetec-data.firebaseapp.com",
  databaseURL: "https://timetec-data.firebaseio.com",
  storageBucket: "timetec-data.appspot.com",
  messagingSenderId: "671839024565"
};

export const fire = firebase.initializeApp(config);
