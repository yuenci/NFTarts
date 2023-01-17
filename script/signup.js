import { FBAuth } from "./firebase/authHandler.js";


const signupBtn = document.getElementById("signup-btn");
if (signupBtn) signupBtn.addEventListener("click", signup);

function emailValidation(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

async function signup() {
    const usename = document.getElementById("signup-username").value;
    if (usename.length < 3) {
        alert("Username must be at least 3 characters");
        return;
    }


    const email = document.getElementById("signup-email").value;
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
    try {
        let user = await fbAuth.register(email, password)
        let uid = user.uid;
        localStorage.setItem("uid", uid);



        let useNameData = {
            displayName: usename,
        };
        let res = await fbAuth.updateUserInfo(useNameData);
        if (res) {
            // return;
            window.location.href = "profile.html";
        }
    }
    catch (error) {
        alert(error.message);
        console.log(error);
    }
}