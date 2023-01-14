import { FBAuth } from "./firebase/authHandler.js";


const signupBtn = document.getElementById("signup-btn");
if (signupBtn) signupBtn.addEventListener("click", signup);

function emailValidation(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function signup() {
    const email = document.getElementById("signup-username").value;
    if (!emailValidation(email)) {
        alert("Invalid email");
        return;
    }
    const password = document.getElementById("signup-password").value;
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }
    const fbAuth = new FBAuth();
    fbAuth.register(email, password).then((user) => {
        // alert("User created");
        window.location.href = "profile.html";
        //console.log("user created", user);
    }).catch((error) => {
        alert(error.message);
        console.log(error);
    }
    );
}