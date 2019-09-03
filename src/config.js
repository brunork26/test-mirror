import firebase from 'firebase';  
let config = {  
  apiKey: "AIzaSyBhCB2LSWl3IC_FLcsawazlZKfbF0NxuLw",
  authDomain: "votacaoonline-fc914.firebaseapp.com",
  databaseURL: "https://votacaoonline-fc914.firebaseio.com",
  projectId: "votacaoonline-fc914",
  storageBucket: "votacaoonline-fc914.appspot.com",
  messagingSenderId: "12477896323"
};
export const app = firebase.initializeApp(config);  
export const db = firebase.database();