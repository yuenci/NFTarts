import { FBAuth } from "./firebase/authHandler.js";


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

    const fbAuth = new FBAuth();
    fbAuth.login(email, password).then((user) => {
        window.location.href = "profile.html";
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

function loginGoogle() {
    const fbAuth = new FBAuth();
    //fbAuth.logout();


    fbAuth.googleLogin().then((user) => {
        //alert("User logged in");
        window.location.href = "profile.html";
        //console.log("user logged in", user);
    }).catch((error) => {
        alert(error.message);
        console.log(error);
    }
    );
}