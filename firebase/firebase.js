import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
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
    this.storage = getStorage(this.app);
    this.storageFolderRefs = {
      projects: ref(this.storage, "/projects"),
      skills: ref(this.storage, "/skills"),
      resume: ref(this.storage, "/resume"),
    };
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

  getCurrentUser = () => this.auth.currentUser;

  uploadFileBlob = (file, fileName, folder, metadata) => {
    if (!file) throw new Error("No file provided");
    if (
      folder === null ||
      Object.keys(this.storageFolderRefs).includes(folder)
    ) {
      const imgRef = ref(this.storageFolderRefs[folder], fileName);
      return uploadBytesResumable(imgRef, file, metadata);
    }
    throw new Error("Invalid folder name");
  };

  downloadFileUrl = (uploadRef) => {
    return getDownloadURL(uploadRef);
  };

  signInUser = ({ email, password }) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

export const firebase = new Firebase(firebaseConfig);
