import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";


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

export function uploadImage(card) {
    let name = card.fileName
    let file = card.file
    const storageRef = ref(storage, name);
    // uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    // });
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            card.simulateProgress()
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        // (error) => {
        //     // A full list of error codes is available at
        //     // https://firebase.google.com/docs/storage/web/handle-errors
        //     switch (error.code) {
        //         case 'storage/unauthorized':
        //             // User doesn't have permission to access the object
        //             break;
        //         case 'storage/canceled':
        //             // User canceled the upload
        //             break;

        //         // ...

        //         case 'storage/unknown':
        //             // Unknown error occurred, inspect error.serverResponse
        //             break;
        //     }
        // },

        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}