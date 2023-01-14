import { FBAuth } from "./firebase/authHandler.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


window.onload = function () {
    const fbAuth = new FBAuth();
    fbAuth.getCurrentUser().then((user) => {
        console.log(user);
        initUserAvatar(user);
    }).catch((error) => {
        console.log(error);
    });
}

function initUserAvatar(user) {
    const userAvatar = document.getElementById("profile-img");
    if (userAvatar && user.photoURL) {
        userAvatar.src = user.photoURL;
    }
}