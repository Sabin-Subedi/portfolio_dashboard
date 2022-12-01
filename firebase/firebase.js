import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

let instance;

class Firebase {
  constructor() {
    if (instance) {
      throw new Error("Firebase instance is already created");
    }
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    instance = this;
  }

  // *** Auth API ***
  signInWithEmailAndPassword = async (email, password) => {
    const response = { success: false, error: null, data: null };
    try {
      const { user } = await this.signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}
