import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCEeGgLF0LaqIGpOYrjSbQOwjHjR3rL9SA",
  authDomain: "blog-3f240.firebaseapp.com",
  projectId: "blog-3f240",
  storageBucket: "blog-3f240.appspot.com",
  messagingSenderId: "151533320188",
  appId: "1:151533320188:web:8c7f702bbbc3695564e479",
  measurementId: "G-6F48E6CT6X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
