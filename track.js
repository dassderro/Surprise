import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp({
  // paste your firebaseConfig here
});
const db = getFirestore(app);

const log = (event) =>
  addDoc(collection(db, "responses"), {
    event,
    time: serverTimestamp(),
    device: navigator.userAgent
  }).catch(console.error);

log("opened");
document.getElementById("nextBtn").addEventListener("click", () => log("clicked_keep_going"));
document.getElementById("no").addEventListener("click", () => log("tried_no"));
document.getElementById("no").addEventListener("touchstart", () => log("tried_no"));
document.getElementById("yes").addEventListener("click", () => log("YES"));