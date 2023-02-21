import { FBAuth } from "./firebase/authHandler.js";
import { FBStore } from "./firebase/storeHandler.js";
import { toast } from "./ui_components.js";

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
        //alert("Invalid email");
        toast.show('Invalid email', 3000, 'warning');
        return;
    }
    const password = document.getElementById("login-password").value;

    console.log(email, password);


    fbAuth.login(email, password).then((user) => {
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("uidView", user.uid);
        window.location.href = "profile.html";
    }).catch((error) => {
        //alert(error.message);
        toast.show(error.message, 3000, 'error');
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
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("uidView", user.uid);
    }

    // addDataTofirebase(user).then((res) => {
    //     if (res) {
    //         window.location.href = "profile.html";
    //     } else {
    //         alert("Error when login with google");
    //     }
    // });

    // if user exists in users collection
    fbStore.readDocument("users", user.uid).then((doc) => {
        window.location.href = "profile.html";
    }).catch((error) => {
        // if user does not exist in users collection
        addDataTofirebase(user).then((res) => {
            if (res) {
                window.location.href = "profile.html";
            } else {
                //alert("Error when login with google");
                toast.show('Error when login with google', 3000, 'error');
            }
        });
    });
}




function addDataTofirebase(user) {
    console.log(user);
    let userData = {
        bio: "",
        birth: "",
        email: user.email,
        gender: 2,
        phone: user.phoneNumber,
        uid: user.uid,
        username: user.displayName,
        website: "",
        likes: [],
        photoURL: user.photoURL,
        following: [],
        followers: [],
    };
    return new Promise((resolve, reject) => {
        fbStore.write("users", userData, user.uid).then(() => {
            console.log("Document successfully written!");
            resolve(true);
        }).catch((error) => {
            console.error("Error writing document: ", error);
            reject(false);
        });
    });
}


export function logout() {
    // if (confirm("Are you sure to log out?")) {
    // fbAuth.logout();
    // localStorage.setItem("loginStatus", "false");
    // localStorage.setItem("uid", "");
    // localStorage.setItem("uidView", "");
    // setTimeout(() => {
    //     window.location.href = "../index.html";
    // }, 1000);
    // }

    let message = "Are you sure to log out?";
    confirmBox(message, function () {
        fbAuth.logout();
        localStorage.setItem("loginStatus", "false");
        localStorage.setItem("uid", "");
        localStorage.setItem("uidView", "");
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 500);
    }, function () {
        console.log('You clicked No!');
    })
}