import { firebase } from "../firebase/firebase";

const firebaseFunctions = Object.freeze({
  logOut: firebase.doSignOut,
});

export default firebaseFunctions;
