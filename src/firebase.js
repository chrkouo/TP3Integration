// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Le9Yoz01lTqugUOThRlZ2tg41xxfHJs",
  authDomain: "questtracker2.firebaseapp.com",
  projectId: "questtracker2",
  storageBucket: "questtracker2.appspot.com",
  messagingSenderId: "239408671844",
  appId: "1:239408671844:web:d2728daf9def1bdf3e0371",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(
      collection(db, "adventurerDB"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "adventurerDB"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        quests: [],
        xp: 0,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signInWithGitHub = async () => {
  try {
    const res = await signInWithPopup(auth, githubAuthProvider);
    const user = res.user;
    const q = query(
      collection(db, "adventurerDB"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "adventurerDB"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "gitHub",
        email: user.email,
        quests: [],
        xp: 0,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "adventurerDB"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      quests: [],
      xp: 0,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithGitHub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
