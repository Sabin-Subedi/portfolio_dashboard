import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, doc, getFirestore } from "firebase/firestore";
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
    this.fireStoreDB = getFireStore(this.app);
    this.storageFolderRefs = {
      projects: ref(this.storage, "/projects"),
      skills: ref(this.storage, "/skills"),
      resume: ref(this.storage, "/resume"),
      default: ref(this.storage),
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

  signInUser = ({ email, password }) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***
  // For uploading a file to a firebase storage folder
  uploadFileBlob = ({
    file,
    metadata,
    onUploading,
    onUploadError,
    onUpload,
  }) => {
    if (!file) throw new Error("No file provided");
    !file.uploadFolder && (file.uploadFolder = "default");
    if (Object.keys(this.storageFolderRefs).includes(file.uploadFolder)) {
      const fileName = `${file.key}.${file.name.split(".").pop()}`;
      const imgRef = ref(this.storageFolderRefs[file.uploadFolder], fileName);
      const uploadTask = uploadBytesResumable(imgRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          onUploading && onUploading(progress);
        },
        (error) => {
          onUploadError && onUploadError(error);
        },
        () => {
          firebase.downloadFileUrl(uploadTask.snapshot.ref).then((url) => {
            onUpload && onUpload(url);
          });
        }
      );
      return uploadTask;
    }
    throw new Error("Invalid folder name");
  };

  // For downloading a file from a firebase storage folder
  downloadFileUrl = (uploadRef) => {
    return getDownloadURL(uploadRef);
  };

  // For deleting a file from a firebase storage folder
  deleteFile = (file) => {
    !file.uploadFolder && (file.uploadFolder = "default");

    const fileName = `${file.key}.${file.name.split(".").pop()}`;

    if (file.uploadFolder) {
      const deleteFileRef = ref(
        this.storageFolderRefs[file.uploadFolder],
        fileName
      );
      return deleteObject(deleteFileRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log("File deletion failed");
        });
    }
    throw new Error("Invalid folder or file name");
  };

  // *** Firestore API ***
  // For adding a document to a firebase collection
  addDocument = ({ collectionName, data }) => {
    const collectionRef = collectionName(this.fireStoreDB, collectionName);
    return addDoc(collectionRef, data);
  };
}

export const firebase = new Firebase(firebaseConfig);
