

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAY8D5MQ-hXtjp68TTbL2IHW6I5Q1qo9ts",
  authDomain: "netflix-clone-25e66.firebaseapp.com",
  projectId: "netflix-clone-25e66",
  storageBucket: "netflix-clone-25e66.firebasestorage.app",
  messagingSenderId: "602193870431",
  appId: "1:602193870431:web:a24f5f9f11e5bac3dce5ea"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword (auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Login failed");
      }
}

const logout = async()=>{
    signOut(auth)
}

export { auth, db, login, signup, logout};