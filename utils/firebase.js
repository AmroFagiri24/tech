import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBX2gw6NZ72E4PTXKnrrQHDb49JdULw0AA",
  authDomain: "emporos-nexus.firebaseapp.com",
  projectId: "emporos-nexus",
  storageBucket: "emporos-nexus.firebasestorage.app",
  messagingSenderId: "831638739463",
  appId: "1:831638739463:web:1649fed07c15a80efca8a2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default db;