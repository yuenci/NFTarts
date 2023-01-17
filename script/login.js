import { FBAuth } from "./firebase/authHandler.js";
import { FBStore } from "./firebase/storeHandler.js";

const fbAuth = new FBAuth();
const fbStore = new FBStore();

const loginBtn = document.getElementById("login-btn");
if (loginBtn) loginBtn.addEventListener("click", login);

function emailValidation(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function login() {
    const email = document.getElementById("login-username").value;
    if (!emailValidation(email)) {
        alert("Invalid email");
        return;
    }
    const password = document.getElementById("login-password").value;

    console.log(email, password);


    fbAuth.login(email, password).then((user) => {
        window.location.href = "profile.html";
        localStorage.setItem("uid", user.uid);
        //alert("User logged in");
        //console.log("user logged in", user);
    }).catch((error) => {
        alert(error.message);
        console.log(error);
    }
    );


}

const googleBtn = document.getElementById("login-google");
if (googleBtn) googleBtn.addEventListener("click", loginGoogle);

async function loginGoogle() {
    let user = await fbAuth.googleLogin();
    if (user) {

        localStorage.setItem("uid", user.uid);
    }

    // if user exists in users collection
    fbStore.readDocument("users", user.uid).then((doc) => {
        window.location.href = "profile.html";
    }).catch((error) => {
        addDataTofirebase(user.displayName, user.email, user.uid)
    });
}




function addDataTofirebase(usename, email, uid) {
    let userData = {
        bio: "",
        birth: "",
        email: email,
        gender: 2,
        phone: "",
        uid: uid,
        username: usename,
        website: "",
        likes: [],
    };
    fbStore.write("users", userData, uid).then(() => {
        console.log("Document successfully written!");
        window.location.href = "profile.html";

    }).catch((error) => {
        console.error("Error writing document: ", error);
    });

}