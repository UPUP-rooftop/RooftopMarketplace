// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARHZ6FTYS1ty4LRKb5droK66IOsZoIUqM",
  authDomain: "up-andup.firebaseapp.com",
  projectId: "up-andup",
  storageBucket: "up-andup.appspot.com",
  messagingSenderId: "563766615118",
  appId: "1:563766615118:web:c53a9e45390fa86152771f",
  databaseURL: "https://up-andup-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const database = getDatabase(app);




export { auth, database };