import { FBAuth } from "./firebase/authHandler.js";
import { FBStorage } from "./firebase/storageHandler.js";
import { FBStore } from "./firebase/storeHandler.js";
import { logout } from "./login.js";
import { toast } from "./ui_components.js";


let user = null;
const fbAuth = new FBAuth();
const fbStorage = new FBStorage();
const fbStore = new FBStore();

window.onload = async function () {
    if (!localStorage.getItem("uid")) {
        window.location.href = "./login.html";
    }

    user = new User();
    let res;
    // if user init successfully, then init avatar and name
    try {
        res = await user.init();
    } catch (error) {
        console.log(error);
    }

    if (res) {
        user.initAvatarAndName()
    } else {
        console.log(res);
        //window.location.href = "login.html";
    }

    let posts = new PostsArea("");

    // initCards();

    let social_sidebar = document.getElementById("social-icons-side")
    if (social_sidebar) {
        social_sidebar.remove();
    }
}

class User {
    constructor() {
        this.currentUser = {};
        this.viewUser = {};
    }

    async init() {
        this.currentUser = await await fbStore.readDocument("users", localStorage.getItem("uid"));
        //console.log(this.currentUser);

        this.viewUser = await fbStore.readDocument("users", localStorage.getItem("uidView"));
        //console.log(this.viewUser);

        this.uid = this.viewUser.uid;
        this.name = this.viewUser.username;
        this.photoURL = this.viewUser.photoURL;
        if (this.photoURL === null) {
            let usename = user.displayName.replace(" ", '%20');
            this.photoURL = `https://api.multiavatar.com/${usename}.svg`
        }



        //localStorage.setItem("uidView", this.uid);

        const userData = await fbStore.query("users", ["uid", "==", this.uid]);

        if (userData.length > 0) {
            let followerNum = userData[0].followers.length;
            let followingNum = userData[0].following.length;
            document.getElementById("profile-posts").innerHTML = `<span class="profile-num">${0}</span> Posts`;
            document.getElementById("profile-followers").innerHTML = `<span class="profile-num">${followerNum == 1 ? "1 Follower" : followerNum + " Followers"}</span> `;
            document.getElementById("profile-following").innerHTML = `<span class="profile-num">${followingNum}</span> Following`;
            document.getElementById("profile-bio").innerHTML = userData[0].bio;

            let images = await fbStore.query("images", ["uid", "==", this.uid])
            let posts = images.length == 1 ? "1 Post" : images.length + " Posts";
            posts == 1 ? "1 Post" : posts + " Posts";
            document.getElementById("profile-posts").innerHTML = `<span class="profile-num">${posts}</span>`;
        }

        return new Promise((resolve, reject) => {
            if (this.currentUser) {
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
        if (this.currentUser.uid === localStorage.getItem("uidView")) {
            status = "self";
        }
        else if (this.isFollowing()) {
            status = "following";
        }
        else {
            status = "unfollow";
        }
        this.userFollowStatus(status);
    };

    userFollowStatus(status) {
        let btns = ""
        let profileBtns = document.getElementById("profile-btns");
        profileBtns.innerHTML = "";
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
            let uid = localStorage.getItem("uid");
            if (adminList.includes(uid)) {
                btns = `
                    <button id="eidt-profile">Edit Profile</button>
                    <button id="eidt-writer">Writer</button>
                    <button id="ellipsis"><span class="iconfont icon-shenglvehao"></span></button>`
            } else {
                btns = `
                <button id="eidt-profile">Edit Profile</button>
                <button id="ellipsis"><span class="iconfont icon-shenglvehao"></span></button>`
            }
            ;
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
                this.unfollow();
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
                this.follow();
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

    async follow() {
        const following = fbStore.addArrayElement("users", this.currentUser.uid, "following", this.viewUser.uid);
        const followers = fbStore.addArrayElement("users", this.viewUser.uid, "followers", this.currentUser.uid);

        const [p1, p2] = await Promise.all([following, followers])

        if (p1 && p2) {
            this.userFollowStatus("following");
        } else {
            //alert("error");
            let message = "follow user unsuccess";
            toast.show(message, 3000, 'error');
        }
    }

    async unfollow() {
        const following = fbStore.removeArrayElement("users", this.currentUser.uid, "following", this.viewUser.uid);
        const followers = fbStore.removeArrayElement("users", this.viewUser.uid, "followers", this.currentUser.uid);

        const [p1, p2] = await Promise.all([following, followers])

        if (p1 && p2) {
            this.userFollowStatus("unfollow");
        } else {
            //alert("error");
            let message = "unfollow user unsuccess";
            toast.show(message, 3000, 'error');
        }
    }

    isFollowing() {
        console.log(this.currentUser);
        let following = this.currentUser.following;
        if (following.includes(this.viewUser.uid)) {
            return true;
        } else {
            return false;
        }
    }


}

import { Modal } from "./modal.js";

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

        document.querySelector(".upload-modal-upload-btn").addEventListener("click", async () => {

            let caption = document.getElementById("upload-modal-upload-textarea").value;
            let tags = document.getElementById("upload-modal-upload-tags").value.split(" ");
            for (let i = 0; i < tags.length; i++) {
                if (!this.tagValid(tags[i])) {
                    //alert("Invalid tag: " + tags[i]);
                    let message = "Invalid tag: " + tags[i];
                    toast.show(message, 3000, 'warning');
                    return;
                }
            }

            let currentUserData = await fbAuth.getCurrentUser();
            let data = {
                imageUrl: this.imageUrl,
                caption: caption,
                tags: tags,
                uid: localStorage.getItem("uid"),
                likes: [],
                comments: {},
                timestamp: new Date(),
                posterName: currentUserData.displayName,
                posterAvatar: currentUserData.photoURL
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

        passwordBtn.onclick = () => {
            window.open("profile_edit.html", "_blank");
        };

        logoutBtn.addEventListener("click", () => {
            // confirm logout
            logout()
        });
    }
}

class PostsArea {
    constructor(data) {
        this.data = data;
        this.userUid = "";
        this.userData = {};
        this.init();
        this.postInitState = false;
        this.likeInitState = false;
    }

    init() {
        this.userUid = localStorage.getItem("uidView");

        this.initTabEvent();
        // show post cards
        this.showAddCard();

        fbStore.readDocument("users", this.userUid).then((data) => {
            this.userData = data;
            // display post cards
            this.displayCards("post");
        });
    }

    initTabEvent() {
        const postBtn = document.getElementById("profile-tab-posts");
        const likeBtn = document.getElementById("profile-tab-likes");
        postBtn.addEventListener("click", () => {
            this.showCards("post");
            this.showAddCard();
            this.displayCards("post");
        });

        likeBtn.addEventListener("click", () => {
            this.showCards("like");
            this.displayCards("like");
        });
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

    async displayCards(mode) {
        if (this.postInitState && this.likeInitState) return;
        let images = await fbStore.query("images", ["uid", "==", this.userUid]);
        console.log(images);

        if (mode === "post") {
            for (let image of images) {
                image.userData = this.userData;
                let card = new PostImageCard(image, "post");
                card.display();
            }
            this.postInitState = true;
        } else if (mode === "like") {
            //console.log(this.userData.likes);
            let images = await this.getLikesImagesData(this.userData.likes)
            console.log(images);
            for (let image of images) {
                image.userData = this.userData;
                let card = new PostImageCard(image, "like");
                card.display();
            }
            this.likeInitState = true;
        }

    }

    async updateCards() {
        const postCardsCon = document.getElementById("profile-body-posts");
        const uploadBtn = document.getElementById("profile-post-add");
        postCardsCon.innerHTML = "";
        postCardsCon.appendChild(uploadBtn);

        let images = await fbStore.query("images", ["uid", "==", this.userUid]);
        console.log(images);

        for (let image of images) {
            let card = new PostImageCard(image);
            card.display();
        }
    };

    async getLikesImagesData(images) {
        let imagesData = [];
        for (let image of images) {
            let imageDoc = await fbStore.readDocument("images", image);
            //console.log(imageDoc);
            imagesData.push(imageDoc);
        }
        return imagesData;
    }
}

import { ImageCard } from "./gallery.js";

class PostImageCard {
    constructor(data, mode) {
        this.mode = mode;
        this.caption = data.caption;
        this.comments = data.comments;
        this.imageUrl = data.imageUrl;
        this.likes = data.likes;
        this.tags = data.tags;
        this.uid = data.uid;
        this.data = data;
        this.timestamp = data.timestamp.seconds;
        this.initData();
    }

    display() {
        const postCardsCon = document.getElementById("profile-body-posts");
        const likeCardsCon = document.getElementById("profile-body-likes");

        let postCard = document.createElement("div");
        this.addEvent(postCard);
        postCard.classList.add("post-cards");

        postCard.innerHTML = `
            <img src="${this.imageUrl}" alt="" class="post-cards-img">
        `;
        if (this.mode === "post") {
            postCardsCon.appendChild(postCard);
        } else if (this.mode === "like") {
            likeCardsCon.appendChild(postCard);
        }
    }

    addEvent(dom) {
        dom.addEventListener("click", () => {
            // console.log("click");
            //console.log(this.data);
            new ImageCard(this.data).showModal();
        });
    }

    async initData() {
        let userData = this.data.userData;

        let tags = "";
        for (let i = 0; i < this.tags.length; i++) {
            tags += this.tags[i] + " ";
        }


        let commentsNum = Object.keys(this.comments).length;
        let likesNum = this.likes.length;
        //console.log(this.timestamp);
        let dateTime = new Date(this.timestamp * 1000).toLocaleString();

        let likeIcons = "icon-xihuan";
        if (userData.likes.includes(this.data.id)) {
            likeIcons = "icon-love";
        }

        this.card = document.querySelector(".post-cards");
        this.data.tags = tags;
        this.data.likesNum = likesNum;
        this.data.dateTime = dateTime;
        this.data.likeIcons = likeIcons;
        this.data.commentsNum = commentsNum;
    }
}


