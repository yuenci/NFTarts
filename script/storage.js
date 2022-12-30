// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const storage = getStorage(app);

export function uploadImage(name, file) {
    const storageRef = ref(storage, name);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}