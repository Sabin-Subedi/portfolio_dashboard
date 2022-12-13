import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getFirestore,
  addDoc,
  doc,
  collection,
  Timestamp,
  query,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "./config";
let instance;

class Firebase {
  constructor(config) {
    if (instance) {
      throw new Error("Firebase instance is already created");
    }
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.storage = getStorage(this.app);
    this.fireStoreDB = getFirestore(this.app);
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

  doSignOut = () => signOut(this.auth);

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

    const fileName = `${file?.key}.${file?.name.split(".")?.pop()}`;

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
    if (!collectionName) throw new Error("No collection name provided");
    data.createdAt = Timestamp.now();
    data.lastUpdatedAt = Timestamp.now();
    const collectionRef = collection(this.fireStoreDB, collectionName);
    return addDoc(collectionRef, data);
  };

  getDocuments = ({ collectionRef, query = [] }) => {
    let q;
    if (query.length > 0 && collectionRef) {
      q = query(collectionRef, ...query);
    }
    return new Promise((resolve, reject) => {
      getDocs(q ? q : collectionRef)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            if (!doc) {
              reject("Couldn't Fetch the data");
            }

            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getDocument = ({ documentRef }) => {
    return new Promise((resolve, reject) => {
      getDoc(documentRef)
        .then((doc) => {
          if (!doc) {
            reject("Couldn't Fetch the data");
          }
          resolve({
            id: doc.id,
            ...doc.data(),
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getCollection = (collectionName) => {
    return collection(this.fireStoreDB, collectionName);
  };

  getDocRef = (collectionName, docName, ...props) => {
    return doc(this.fireStoreDB, collectionName, docName, ...props);
  };
}

export const firebase = new Firebase(firebaseConfig);
