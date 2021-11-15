import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1d-oB3gqcWOdQVeG8byiIoVG4df1KLF8",
  authDomain: "clone-101121.firebaseapp.com",
  projectId: "clone-101121",
  storageBucket: "clone-101121.appspot.com",
  messagingSenderId: "250570733256",
  appId: "1:250570733256:web:7c5faec66ccc10f558d7fd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// To access this file data to outside of file
export { db, auth, provider };
