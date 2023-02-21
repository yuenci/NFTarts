import { FBAuth } from "./firebase/authHandler.js";
import { FBStore } from "./firebase/storeHandler.js";
import { toast } from "./ui_components.js";




const signupBtn = document.getElementById("signup-btn");
if (signupBtn) signupBtn.addEventListener("click", signup);

function emailValidation(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

async function signup() {
    const usename = document.getElementById("signup-username").value;
    if (usename.length < 3) {
        //alert("Username must be at least 3 characters");
        toast.show('Username must be at least 3 characters', 3000, 'warning');
        return;
    }


    const email = document.getElementById("signup-email").value;
    if (!emailValidation(email)) {
        //alert("Invalid email");
        toast.show('Invalid email', 3000, 'warning');
        return;
    }
    const password = document.getElementById("signup-password").value;
    if (password.length < 6) {
        //alert("Password must be at least 6 characters");
        toast.show('Password must be at least 6 characters', 3000, 'warning');
        return;
    }


    const fbAuth = new FBAuth();
    try {
        // register user
        let user = await fbAuth.register(email, password)

        //save user data to local storage
        let uid = user.uid;
        localStorage.setItem("uid", uid);

        // update user name and photo
        let useNameData = {
            displayName: usename,
            photoURL: "https://api.multiavatar.com/" + usename + ".svg"
        };
        let res = await fbAuth.updateUserInfo(useNameData);

        // update user data in firestore
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
        res = await new FBStore().write("users", userData, uid)

        if (res) {
            // return;
            window.location.href = "profile.html";
        }
    }
    catch (error) {
        // alert(error.message);
        toast.show(error.message, 3000, 'warning');
        console.log(error);
    }
}