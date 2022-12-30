import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAfr-AXKIqrQovmlEvH31V1LeOuT4c7QNc",
    authDomain: "nftarts-32191.firebaseapp.com",
    projectId: "nftarts-32191",
    storageBucket: "nftarts-32191.appspot.com",
    messagingSenderId: "865252345043",
    appId: "1:865252345043:web:227e3ff1b632df85328026",
    measurementId: "G-BPLH0BTZ4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function writeToDB(card, downloadURL) {
    let currentAdmin = localStorage.getItem("admin")
    if (!currentAdmin) currentAdmin = "Innis"

    try {
        const docRef = await addDoc(collection(db, "images"), {
            admin: currentAdmin,
            description: card.desc,
            imageUrl: downloadURL,
            tags: card.tags
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}