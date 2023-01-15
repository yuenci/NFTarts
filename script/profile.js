import { FBAuth } from "./firebase/authHandler.js";


window.onload = function () {
    const fbAuth = new FBAuth();
    fbAuth.getCurrentUser().then((user) => {
        console.log(user);
        initUserAvatar(user);
        //userFollowStatus("following");
        // userFollowStatus("unfollow");
        userFollowStatus("self");
        addBtnsEvent();
    }).catch((error) => {
        console.log(error);
    });
}

function initUserAvatar(user) {
    const userAvatar = document.getElementById("profile-img");
    if (userAvatar && user.photoURL) {
        userAvatar.src = user.photoURL;
    }

    const userName = document.getElementById("profile-name");
    if (userName && user.displayName) {
        userName.innerHTML = user.displayName;
    }
}

var followingBtn, messageBtn, ellipsisBtn, followBtn, eidtProfileBtn;

function userFollowStatus(status) {
    let btns = ""
    let profileBtns = document.getElementById("profile-btns");
    if (status === "following") {
        btns = `
        <button id="following">Following</button>
                        <button id="message">Message</button>
                        <button id="ellipsis"><span class="iconfont icon-shenglvehao"></span></button>
        `;
    } else if (status === "unfollow") {
        btns = `
        <button id="follow">Follow</button>
                        <button id="ellipsis"><span class="iconfont icon-shenglvehao"></span></button>
        `;
    } else if (status === "self") {
        btns = `
       <button id="eidt-profile">Edit Profile</button>
                        <button id="ellipsis"><span class="iconfont icon-shenglvehao"></span></button>
        `;
    } else (
        userFollowStatus("unfollow")
    )
    profileBtns.innerHTML = btns;

    let btnsList = [followingBtn, messageBtn, ellipsisBtn, followBtn, eidtProfileBtn];
    for (let index = 0; index < btnsList.length; index++) {
        let element = btnsList[index];
        element = null;
    }


    followingBtn = document.getElementById("following");
    messageBtn = document.getElementById("message");
    ellipsisBtn = document.getElementById("ellipsis");
    followBtn = document.getElementById("follow");
    eidtProfileBtn = document.getElementById("eidt-profile");
}


function addBtnsEvent() {
    if (followingBtn) {
        followingBtn.addEventListener("click", () => {
            console.log("following");
        })
    }

    if (messageBtn) {
        messageBtn.addEventListener("click", () => {
            console.log("message");
        })
    }

    if (ellipsisBtn) {
        ellipsisBtn.addEventListener("click", () => {
            console.log("ellipsis");
        })
    }

    if (followBtn) {
        followBtn.addEventListener("click", () => {
            console.log("follow");
        })
    }

    if (eidtProfileBtn) {
        eidtProfileBtn.addEventListener("click", () => {
            console.log("eidt-profile");
        })
    }
}

const postBtn = document.getElementById("profile-tab-posts");
const likeBtn = document.getElementById("profile-tab-likes");
postBtn.addEventListener("click", () => {
    showCards("post");
});

likeBtn.addEventListener("click", () => {
    showCards("like");
});

function showCards(mode) {
    const postCardsCon = document.getElementById("profile-body-posts");
    const likeCardsCon = document.getElementById("profile-body-likes");
    if (mode === "post") {
        postBtn.classList.add("post-btn-active");
        likeBtn.classList.remove("like-btn-active");
        postCardsCon.classList.remove("hidden");
        likeCardsCon.classList.add("hidden");
    }
    else if (mode === "like") {
        postBtn.classList.remove("post-btn-active");
        likeBtn.classList.add("like-btn-active");
        postCardsCon.classList.add("hidden");
        likeCardsCon.classList.remove("hidden");
    }
}


