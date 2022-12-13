import { firebase } from "../firebase/firebase";

const firebaseFunctions = Object.freeze({
  logOut: firebase.doSignOut,
  getDocs: firebase.getDocuments,
  getCollectionRef: firebase.getCollection,
  getDocRef: firebase.getDocRef,
  getDoc: firebase.getDocument,
});

export default firebaseFunctions;
