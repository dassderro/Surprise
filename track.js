import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChsWGslIrx0T8VGYU1hBYGdPndVWkS60s",
  authDomain: "elle-2337e.firebaseapp.com",
  projectId: "elle-2337e",
  storageBucket: "elle-2337e.firebasestorage.app",
  messagingSenderId: "653052971649",
  appId: "1:653052971649:web:12a4b428ee85e8cb971b80",
  measurementId: "G-9GFXE8DXE6"
};

const app = initializeApp(firebaseConfig);
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