import { FBAuth } from "./firebase/authHandler.js";
import { FBStorage } from "./firebase/storageHandler.js";


window.onload = function () {
    const fbAuth = new FBAuth();
    fbAuth.getCurrentUser().then((user) => {
        console.log(user);
        initUserAvatar(user);
        //userFollowStatus("following");
        // userFollowStatus("unfollow");
        userFollowStatus("self");
        addBtnsEvent();
        initCards();
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
            eidtProfileBtnEvent();
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

function eidtProfileBtnEvent() {
    console.log("ellipsis");
    showModal("menu");
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

const modal = document.getElementById("modal");
// if (modal) {
//     modal.addEventListener("click", (e) => {
//         e.stopPropagation();
//         modal.classList.add("hidden");
//         enableScroll();
//     });
// }

function showModal(type) {
    modal.classList.remove("hidden");

    let scrollTop = document.documentElement.scrollTop;
    modal.style.top = scrollTop + "px";

    disableScroll();

    if (type === "upload") {
        addUploadModalContent();
    }
    else if (type === "menu") { }
}

function addUploadModalContent() {
    let content = `
    <div id="upload-modal">
        <div id="upload-modal-header">
            <span class="iconfont icon-you hidden" id="upload-modal-left"></span>
            <span id="upload-modal-title">Create new post</span>
            <span class="iconfont icon-guanbi" id="upload-modal-close"></span>
        </div>
        <div id="upload-modal-body" class="upload-modal-body-column">
            <img src="../images/pictures.svg" alt="" id="upload-modal-img">
            <button id="upload-modal-btn">Upload</button>
        </div>
    </div>
    `;

    modal.innerHTML = content;
    let uploadModalClose = document.getElementById("upload-modal-close");
    uploadModalClose.addEventListener("click", () => {
        modal.classList.add("hidden");
        enableScroll();
    });

    let uploadModal = document.getElementById("upload-modal");
    // uploadModal.addEventListener("click", (e) => {
    //     stopPropagation(e);
    // });

    let uploadModalBtn = document.getElementById("upload-modal-btn");
    uploadModalBtn.addEventListener("click", () => {
        fileUpdate.click();
    });
}


function initCards() {
    displayCards();

    const uploadBtn1 = document.getElementById("profile-post-add");
    uploadBtn1.classList.remove("hidden");

    uploadBtn1.addEventListener("click", () => {
        showModal("upload");
    });
}



function displayCards() {

    let cardUrlList = [
        "https://picsum.photos/200", "https://picsum.photos/300", "https://picsum.photos/400", "https://picsum.photos/500",
    ]


    const postCardsCon = document.getElementById("profile-body-posts");
    const likeCardsCon = document.getElementById("profile-body-likes");
    let postCards = postCardsCon.innerHTML;
    let likeCards = likeCardsCon.innerHTML;
    for (let index = 0; index < cardUrlList.length; index++) {
        const cardUrl = cardUrlList[index];
        postCards += `
        <div class="post-cards">
            <img src="${cardUrl}" alt="" class="post-cards-img">
        </div>
        `;
        likeCards += `
        <div class="post-cards">
            <img src="${cardUrl}" alt="" class="post-cards-img">
        </div>
        `;
    }
    postCardsCon.innerHTML = postCards;
    likeCardsCon.innerHTML = likeCards;
}




// left: 37, up: 38, right: 39, down: 40
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function () {
            supportsPassive = true;
        },
    })
    );
} catch (e) { }

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

const fileUpdate = document.getElementById("file-update");
fileUpdate.addEventListener("click", (e) => { })


fileUpdate.addEventListener("change", (e) => {
    const file = e.target.files[0];

    const name = file.name;
    const size = file.size;

    //console.log(name, size);
    new FBStorage().uploadFileWithRandomName(file, name).then((url) => {
        console.log(url);
        insertPic(url);
    }).catch((err) => {
        console.log(err);
    });
});

function insertPic(url) {
    const uploadModalBody = document.getElementById("upload-modal-body");

    // let img = document.createElement("img");
    // img.id = "upload-modal-picture";
    // img.src = url;
    // uploadModalBody.innerHTML = "";
    let newContent = `
        <div>
            <img src="${url}" alt="" id="upload-modal-picture">
        </div>
        <div id="upload-modal-body-right"></div>
    `;
    uploadModalBody.innerHTML = newContent;
    uploadModalBody.classList.remove("upload-modal-body-column");
    uploadModalBody.classList.add("upload-modal-body");

    let leftBtn = document.getElementById("upload-modal-left");
    leftBtn.classList.remove("hidden");

    anime({
        targets: "#upload-modal",
        width: 900,
        easing: 'easeInQuart',
        duration: 300,
        complete: () => {
            addBodyRightContent();
        }
    });
}

async function addBodyRightContent() {
    let uploadModalBodyRight = document.getElementById("upload-modal-body-right");
    let user = await new FBAuth().getCurrentUser();
    let avatarUrl = user.photoURL;
    let userName = user.displayName;

    let contentRight = `
        <div id="upload-modal-body-right-top">
            <img src="${avatarUrl}" alt="" id="upload-modal-body-right-top-avatar">
            <span id="upload-modal-body-right-top-text">${userName}</span>
        </div>
        
        <textarea name="" id="upload-modal-upload-textarea" placeholder="Write a caption..." ></textarea>
        <div id="upload-modal-upload-tools">
            <span id="upload-modal-upload-tools-emoji" class="iconfont icon-weixiao"></span>
            <span id="upload-modal-upload-tools-count">0/2200</span>
        </div>
        <input id="upload-modal-upload-tags" type="text" placeholder="Add tags">
        <button id="upload-modal-upload-btn">Share</button>
    `
    uploadModalBodyRight.innerHTML = contentRight;

    document.getElementById("upload-modal-upload-textarea").addEventListener("input", (e) => {
        let text = e.target.value;
        let countDom = document.getElementById("upload-modal-upload-tools-count");
        countDom.innerHTML = `${text.length}/2200`;
    });

    document.getElementById("upload-modal-upload-btn").addEventListener("click", () => {
        let text = document.getElementById("upload-modal-upload-textarea").value;
        console.log(text);
    });
}

