import { FBAuth } from "./firebase/authHandler.js";
import { FBStorage } from "./firebase/storageHandler.js";
import { FBStore } from "./firebase/storeHandler.js";


let user = null;
const fbAuth = new FBAuth();
const fbStorage = new FBStorage();
const fbStore = new FBStore();

window.onload = async function () {
    user = new User();
    let res = await user.init();
    if (res) {
        user.initAvatarAndName()
    } else {
        window.location.href = "login.html";
    }

    let posts = new PostsArea("");

    // initCards();
}

class User {
    constructor() {
        this.uid = "";
        this.name = "";
        this.photoURL = "";
    }

    async init() {
        const user = await fbAuth.getCurrentUser()
        this.uid = user.uid;
        this.name = user.displayName;
        this.photoURL = user.photoURL;
        console.log("1", this.photoURL);
        if (this.photoURL === null) {
            let usename = user.displayName.replace(" ", '%20');
            this.photoURL = `https://api.multiavatar.com/${usename}.svg`
        }



        localStorage.setItem("uidView", this.uid);

        const userData = await fbStore.query("users", ["uid", "==", this.uid]);
        if (userData.length > 0) {
            document.getElementById("profile-posts").innerHTML = `<span class="profile-num">${userData[0].posts}</span> Posts`;
            document.getElementById("profile-followers").innerHTML = `<span class="profile-num">${userData[0].followers}</span> Followers`;
            document.getElementById("profile-following").innerHTML = `<span class="profile-num">${userData[0].following}</span> Following`;
            document.getElementById("profile-bio").innerHTML = userData[0].bio;
        }

        return new Promise((resolve, reject) => {
            if (user) {
                resolve(true);
            }
            else {
                console.log(error);
                reject(false);
            }
        });
    }

    initAvatarAndName() {
        const userAvatar = document.getElementById("profile-img");
        if (userAvatar && this.photoURL) {
            userAvatar.src = this.photoURL;
        }

        const userName = document.getElementById("profile-name");
        if (userName && this.name) {
            userName.innerHTML = this.name;
        }

        document.querySelector("title").innerHTML = this.name + " · Gallery";

        this.initBtns();
    };

    initBtns() {
        let status = "unfollow";
        if (this.uid === localStorage.getItem("uidView")) {
            status = "self";
        }
        // else if () {
        //     // check if following
        // }
        this.userFollowStatus(status);
    };

    userFollowStatus(status) {
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
                    <button id="eidt-writer">Writer</button>
                    <button id="ellipsis"><span class="iconfont icon-shenglvehao"></span></button>
        `;
        } else (
            userFollowStatus("unfollow")
        )
        profileBtns.innerHTML = btns;

        let followingBtn = null, messageBtn = null, ellipsisBtn = null, followBtn = null, eidtProfileBtn = null;



        followingBtn = document.getElementById("following");
        messageBtn = document.getElementById("message");
        ellipsisBtn = document.getElementById("ellipsis");
        followBtn = document.getElementById("follow");
        eidtProfileBtn = document.getElementById("eidt-profile");
        //console.log(eidtProfileBtn);

        let btnsList = [followingBtn, messageBtn, ellipsisBtn, followBtn, eidtProfileBtn]
        //console.log(btnsList);

        this.addBtnsEvent(btnsList);
    }

    addBtnsEvent(btnsList) {
        // console.log(btnsList);
        const [followingBtn, messageBtn, ellipsisBtn, followBtn, eidtProfileBtn] = btnsList;
        //console.log(eidtProfileBtn);

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


        if (followBtn) {
            followBtn.addEventListener("click", () => {
                console.log("follow");
            })
        }

        if (eidtProfileBtn) {
            eidtProfileBtn.addEventListener("click", () => {
                window.open("profile_edit.html", "_blank");
            })
        }

        if (ellipsisBtn) {
            ellipsisBtn.addEventListener("click", () => {
                //eidtProfileBtnEvent();
                let modal = new MenuModal("menu");
                modal.showModal();
            })
        }

        let writer = document.getElementById("eidt-writer");
        if (writer) {
            writer.addEventListener("click", () => {
                window.open("writer.html", "_blank");
            })
        }
    }
}

class Scroll {
    static keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    static supportsPassive = false;
    static wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    static wheelOpt = { passive: false };

    static preventDefault(e) {
        e.preventDefault();
    }

    static preventDefaultForScrollKeys(e) {

        if (Scroll.keys[e.keyCode]) {
            Scroll.preventDefault(e);
            return false;
        }
    }

    constructor() {
        try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get: () => {
                    Scroll.supportsPassive = true;
                },
            }));
        } catch (e) { }

        Scroll.wheelOpt = Scroll.supportsPassive ? { passive: false } : false;
    }

    // call this to Disable
    static disableScroll() {
        window.addEventListener("DOMMouseScroll", Scroll.preventDefault, { passive: false }); // older FF
        window.addEventListener(Scroll.wheelEvent, Scroll.preventDefault, Scroll.wheelOpt); // modern desktop
        window.addEventListener("touchmove", Scroll.preventDefault, Scroll.wheelOpt); // mobile
        window.addEventListener("keydown", Scroll.preventDefaultForScrollKeys, { passive: false });
    }

    // call this to Enable
    static enableScroll() {
        window.removeEventListener("DOMMouseScroll", Scroll.preventDefault, false);
        window.removeEventListener(Scroll.wheelEvent, Scroll.preventDefault, Scroll.wheelOpt);
        window.removeEventListener("touchmove", Scroll.preventDefault, Scroll.wheelOpt);
        window.removeEventListener("keydown", Scroll.preventDefaultForScrollKeys, false);
    }
}


class Modal {
    constructor() {
        this.modal = document.getElementById("modal");
        this.modalContent = "";
    }

    showModal() {
        this.modal.classList.remove("hidden");
        let scrollTop = document.documentElement.scrollTop;
        this.modal.style.top = scrollTop + "px";
        Scroll.disableScroll();
        this.modal.addEventListener("click", (e) => {
            if (e.target.id === "modal") {
                this.hideModal();
            }
        });
    }

    hideModal() {
        this.modal.classList.add("hidden");
        Scroll.enableScroll();
    }
}

class UploadModal extends Modal {
    constructor() {
        super();
        this.addUploadModalContent();
        this.imageUrl = "";
    }

    addUploadModalContent() {
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
        this.modal.innerHTML = content;
        let uploadModalClose = document.getElementById("upload-modal-close");
        uploadModalClose.addEventListener("click", () => {
            this.modal.classList.add("hidden");
            Scroll.enableScroll();
        });

        let uploadModal = document.getElementById("upload-modal");
        // uploadModal.addEventListener("click", (e) => {
        //     stopPropagation(e);
        // });

        let uploadModalBtn = document.getElementById("upload-modal-btn");

        this.addEvent();

        uploadModalBtn.addEventListener("click", () => {
            const fileUpdate = document.getElementById("file-update");
            fileUpdate.click();
        });

        this.showModal();
    }

    addEvent() {
        const fileUpdate = document.getElementById("file-update");
        fileUpdate.onchange = (e) => {
            const file = e.target.files[0];

            const name = file.name;
            const size = file.size;

            fbStorage.uploadFileWithRandomName(file, name).then((url) => {
                this.imageUrl = url;
                this.insertPic(url);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    insertPic(url) {
        const uploadModalBody = document.getElementById("upload-modal-body");
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
                this.addBodyRightContent();
            }
        });
    }

    async addBodyRightContent() {
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
        <div class="upload-main">
            <button class="upload-modal-upload-btn">Send</button>
            <div class="upload-loader">
            <div class="upload-check">
                <span class="check-one"></span>
                <span class="check-two"></span>
            </div>
            </div>
        </div>
        
    `
        //<button id="upload-modal-upload-btn">Share</button>
        uploadModalBodyRight.innerHTML = contentRight;

        document.getElementById("upload-modal-upload-textarea").addEventListener("input", (e) => {
            let text = e.target.value;
            let countDom = document.getElementById("upload-modal-upload-tools-count");
            countDom.innerHTML = `${text.length}/2200`;
        });

        var btn = document.querySelector('.upload-modal-upload-btn'),
            loader = document.querySelector('.upload-loader'),
            check = document.querySelector('.upload-check');

        document.querySelector(".upload-modal-upload-btn").addEventListener("click", () => {



            let caption = document.getElementById("upload-modal-upload-textarea").value;
            let tags = document.getElementById("upload-modal-upload-tags").value.split(" ");
            for (let i = 0; i < tags.length; i++) {
                if (!this.tagValid(tags[i])) {
                    alert("Invalid tag: " + tags[i]);
                    return;
                }
            }

            let data = {
                imageUrl: this.imageUrl,
                caption: caption,
                tags: tags,
                uid: localStorage.getItem("uid"),
                likes: [],
                comments: {},
                timestamp: new Date()
            }
            fbStore.write("images", data).then(() => {
                loader.classList.add('active');

                setTimeout(() => {
                    this.modal.classList.add("hidden");
                    Scroll.enableScroll();
                    new PostsArea().updateCards();
                }, 4000);


            });
        });

        loader.addEventListener('animationend', function () {
            check.classList.add('active');
        });
    }

    tagValid(tag) {
        // use regex to check if tag is valid
        let regex = new RegExp("^#[a-zA-Z0-9]+$");
        return regex.test(tag);
    }

}

class MenuModal extends Modal {
    constructor() {
        super();
        this.menuModalContent();
    }

    menuModalContent() {
        let content = `
        <div id="menu-modal-content">
            <div id="menu-modal-content-password" class="menu-modal-content-item">Change Password</div>
            <div id="menu-modal-content-nameTag" class="menu-modal-content-item">Nametag</div>
            <div id="menu-modal-content-notifications" class="menu-modal-content-item">Notifications</div>
            <div id="menu-modal-content-problem" class="menu-modal-content-item">Report a Problem</div>
            <div id="menu-modal-content-logout" class="menu-modal-content-item">Log out</div>
        </div>
        `;
        this.modal.innerHTML = content;
        this.showModal();
        this.addEvent();
    };

    addEvent() {
        const passwordBtn = document.getElementById("menu-modal-content-password");
        const nameTagBtn = document.getElementById("menu-modal-content-nameTag");
        const notificationsBtn = document.getElementById("menu-modal-content-notifications");
        const problemBtn = document.getElementById("menu-modal-content-problem");
        const logoutBtn = document.getElementById("menu-modal-content-logout");



        logoutBtn.addEventListener("click", () => {
            // confirm logout
            if (confirm("Are you sure to log out?")) {
                fbAuth.logout();
            }
        });
    }
}

class PostsArea {
    constructor(data) {
        this.data = data;
        this.init();
        this.userUid = "";
    }

    init() {
        const postBtn = document.getElementById("profile-tab-posts");
        const likeBtn = document.getElementById("profile-tab-likes");
        postBtn.addEventListener("click", () => {
            this.showCards("post");
        });

        likeBtn.addEventListener("click", () => {
            this.showCards("like");
        });

        // show post cards
        this.showAddCard();

        // display post cards
        this.displayCards();
    }

    showCards(mode) {
        const postCardsCon = document.getElementById("profile-body-posts");
        const likeCardsCon = document.getElementById("profile-body-likes");
        const postBtn = document.getElementById("profile-tab-posts");
        const likeBtn = document.getElementById("profile-tab-likes");

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

    showAddCard() {
        const uploadBtn = document.getElementById("profile-post-add");
        uploadBtn.classList.remove("hidden");

        uploadBtn.addEventListener("click", () => {
            console.log("upload");
            new UploadModal();
        });
    }

    async displayCards() {
        this.userUid = localStorage.getItem("uid");

        let images = await fbStore.query("images", ["uid", "==", this.userUid]);
        //console.log(images);

        for (let image of images) {
            let card = new PostImageCard(image);
            card.display();
        }
    }

    async updateCards() {
        const postCardsCon = document.getElementById("profile-body-posts");
        const uploadBtn = document.getElementById("profile-post-add");
        postCardsCon.innerHTML = "";
        postCardsCon.appendChild(uploadBtn);

        let images = await fbStore.query("images", ["uid", "==", this.userUid]);

        for (let image of images) {
            let card = new PostImageCard(image);
            card.display();
        }
    };
}

class PostImageCard {
    constructor(data) {
        this.caption = data.caption;
        this.comments = data.comments;
        this.imageUrl = data.imageUrl;
        this.likes = data.likes;
        this.tags = data.tags;
        this.uid = data.uid;
    }

    display() {
        const postCardsCon = document.getElementById("profile-body-posts");

        let postCard = document.createElement("div");
        postCard.classList.add("post-cards");
        postCard.innerHTML = `
            <img src="${this.imageUrl}" alt="" class="post-cards-img">
        `;
        postCardsCon.appendChild(postCard);
    }
}


