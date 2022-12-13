import { firebase } from "../firebase/firebase";

const firebaseFunctions = Object.freeze({
  logOut: firebase.doSignOut,
  getDocs: firebase.getDocuments,
  getCollectionRef: firebase.getCollection,
  getDocRef: firebase.getDocRef,
  getDoc: firebase.getDocument,
  updateDoc: firebase.updateDocument,
});

export default firebaseFunctions;
