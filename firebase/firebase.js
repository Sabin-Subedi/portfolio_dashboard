import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

let instance;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2ou941N_XhUShuqKl1lA0Dx6aOkCj0cA",
  authDomain: "portfoli-project-manager.firebaseapp.com",
  projectId: "portfoli-project-manager",
  storageBucket: "portfoli-project-manager.appspot.com",
  messagingSenderId: "387361252878",
  appId: "1:387361252878:web:b9ecb9532234ea98ccfe5f",
};

class Firebase {
  constructor(config) {
    if (instance) {
      throw new Error("Firebase instance is already created");
    }
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    instance = this;
  }

  // *** Auth API ***
  oauthStateChange = () =>
    new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve({ user, loggedIn: true });
        }
        resolve({ user: null, loggedIn: false });
      });
    });

  signInUser = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

export const firebase = new Firebase(firebaseConfig);
