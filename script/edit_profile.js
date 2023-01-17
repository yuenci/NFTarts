import { FBAuth } from "./firebase/authHandler.js";
import { FBStorage } from "./firebase/storageHandler.js";
import { FBStore } from "./firebase/storeHandler.js";


let user = null;
const fbAuth = new FBAuth();
const fbStorage = new FBStorage();
const fbStore = new FBStore();

// get user info and display
window.addEventListener("load", async function () {
    // from auth
    user = await fbAuth.getCurrentUser();
    document.querySelector("#profile__edit__avata__img").src = user.photoURL;
    document.querySelector("#profile__edit__avatar__name").innerHTML = user.displayName;
    this.document.querySelector("#profile-edit-username").value = user.displayName;
    document.querySelector("#profile-edit-email").value = user.email;

    // from firestore
    let res = await fbStore.readDocument("users", user.uid);
    document.querySelector("#profile-edit-website").value = res.website;
    document.querySelector("#profile__edit__bio__textarea").value = res.bio;
    document.querySelector("#profile-edit-phone").value = res.phone;
    document.querySelector("#profile__edit__gender__select").selectedIndex
    document.querySelector("#profile__edit__birth__input").value = res.birth;
});

// bio text count
let bioTextArea = document.querySelector("#profile__edit__bio__textarea");
let bioTextCount = document.querySelector("#profile__edit__bio__count");
bioTextArea.addEventListener("input", function () {
    bioTextCount.innerHTML = bioTextArea.value.length + " / 150";
    if (bioTextArea.value.length > 150) {
        bioTextArea.value = bioTextArea.value.substring(0, 150);
        bioTextCount.innerHTML = "150 / 150";
    }
});


// upload profile image
let avatarInput = document.querySelector("#avatar-update");
let updateBtn = document.querySelector("#profile__edit__avatar__change");
updateBtn.addEventListener("click", function () {
    avatarInput.click();
});
avatarInput.addEventListener("change", async function () {
    let file = avatarInput.files[0];
    let fileName = file.name;

    let avatarUrl = await fbStorage.uploadFileWithRandomName(file, fileName);
    // update user avatar to auth
    let res = await fbAuth.updateUserInfo({ photoURL: avatarUrl });
    // update user avatar to UI
    let avatar = document.querySelector("#profile__edit__avata__img");
    avatar.src = avatarUrl;
});


// input validation
let usernameInput = document.querySelector("#profile-edit-username");
usernameInput.addEventListener("blur", function () {
    !usenameValidation() ? usernameInput.classList.add("invalid") : usernameInput.classList.remove("invalid");
});

let websiteInput = document.querySelector("#profile-edit-website");
websiteInput.addEventListener("blur", function () {
    !websiteURLValidation() ? this.classList.add("invalid") : this.classList.remove("invalid");
});


// validation functions
function usenameValidation() {
    let username = usernameInput.value;
    if (username.length < 3) return false;
    return true;
}
function websiteURLValidation() {
    let webset = websiteInput.value;
    if (webset.length == 0) return true;
    let regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(webset);
}


// submit profile info
let submitBtn = document.querySelector("#profile__edit__btns__submit");
submitBtn.addEventListener("click", async function () {
    let username = document.querySelector("#profile-edit-username").value;
    let webset = document.querySelector("#profile-edit-website").value;
    let bio = document.querySelector("#profile__edit__bio__textarea").value;
    let email = document.querySelector("#profile-edit-email").value;
    let phone = document.querySelector("#profile-edit-phone").value;
    let gender = document.querySelector("#profile__edit__gender__select").selectedIndex;
    let birth = document.querySelector("#profile__edit__birth__input").value;

    // check validation
    if (!usenameValidation() || !websiteURLValidation()) {
        alert("Please check your input");
        return;
    }

    let data = {
        username: username,
        website: webset,
        bio: bio,
        email: email,
        phone: phone,
        gender: gender,
        birth: birth,
        uid: user.uid,
    }
    console.log(data);

    let res = await fbAuth.updateUserInfo({ displayName: username });
    let res2 = await fbStore.write("users", data, user.uid);

    console.log("auth:" + res, "store: " + res2);

    if (res && res2) {
        alert("Update success");
    } else {
        console.log("auth:" + res, "store: " + res2);
    }
});

// delete account
let deleteBtn = document.querySelector("#profile__edit__btns__delete");
deleteBtn.addEventListener("click", async function () {
    console.log("delete");

    // confirm delete
    let confirm = window.confirm("Are you sure to delete your account?");
    if (!confirm) return;

    let res = await fbAuth.deleteAccount();
    let res2 = await fbStore.delete("users", user.uid);
    if (res && res2) {
        window.location.href = "../index.html";
    } else {
        console.log(res);
    }
});
