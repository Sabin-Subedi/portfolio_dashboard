import { firebase } from "../firebase/firebase";

const firebaseFunctions = Object.freeze({
  logOut: firebase.doSignOut,
  getDocs: firebase.getDocument,
  getCollectionRef: firebase.getCollection,
  getDocRef: firebase.getDocRef,
});

export default firebaseFunctions;
