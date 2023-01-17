import { FBStore } from "./firebase/storeHandler.js";
import { FBAuth } from "./firebase/authHandler.js";
const fbStore = new FBStore();
const fbAuth = new FBAuth();


var galleryData = "";
var userData = {};
window.onload = async function () {
    let uid = localStorage.getItem("uid");
    userData = await fbStore.readDocument("users", uid);

    let allImagesData = await fbStore.readCollection("images");
    //console.log(allImagesData);

    for (let key in allImagesData) {
        let picData = allImagesData[key];
        picData.id = key;
        let pic = new Card(picData);
        pic.insertCard();
    }
};

class Status {
    static carsList = [];
}

class Card {
    constructor(data) {
        this.id = data.id;
        this.caption = data.caption;
        this.comments = data.comments;
        this.imageUrl = data.imageUrl;
        this.likes = data.likes;
        this.tags = data.tags;
        this.timestamp = data.timestamp.seconds;
        this.posterAvatar = data.posterAvatar;
        this.posterName = data.posterName;
        this.card = {};
    }

    insertCard() {
        let card = document.createElement("div");
        card.classList.add("waterfall-card");
        card.innerHTML = this.getStucture();
        document.querySelector("body").appendChild(card);

        this.card = card;
        Status.carsList.push(card);

        // Like button event listener
        const likeBtn = card.querySelector(".love-icons");
        const likeNum = card.querySelector("#waterfall-card-footer-likes-num");

        likeBtn.addEventListener("click", () => {
            let currentUid = localStorage.getItem("uid");

            if (likeBtn.getAttribute("class").includes("icon-xihuan")) {
                console.log("liked");
                likeBtn.classList.replace("icon-xihuan", "icon-love");


                firebaseHandler.addLikeDataToImage(this.id, currentUid);
                firebaseHandler.addLikeDataToUser(this.id, currentUid);
                likeNum.innerHTML = parseInt(likeNum.innerHTML) + 1;
            } else {
                console.log("unliked");
                likeBtn.classList.replace("icon-love", "icon-xihuan");


                firebaseHandler.removeLikeDataFromImage(this.id, currentUid);
                firebaseHandler.removeLikeDataFromUser(this.id, currentUid);
                likeNum.innerHTML = parseInt(likeNum.innerHTML) - 1;
            }
        });

        // Comment button event listener



        // share button event listener
        const shareBtn = card.querySelector(".icon-sendfasong");
        shareBtn.addEventListener("click", () => this.shareBtnEvent());
    };

    shareBtnEvent() {
        //const shareBtn = this.card.querySelector(".icon-sendfasong");
        const cardFooter = this.card.querySelector(".waterfall-card-footer");
        new ShareTool(this.id, cardFooter);
    }

    getStucture() {
        let num = this.id;
        let tags = "";
        for (let i = 0; i < this.tags.length; i++) {
            tags += this.tags[i] + " ";
        }

        let commentsNum = Object.keys(this.comments).length;
        let likesNum = this.likes.length;
        let dateTime = new Date(this.timestamp * 1000).toLocaleString();

        let likeIcons = "icon-xihuan";
        if (userData.likes.includes(this.id)) {
            likeIcons = "icon-love";
        }

        let template = `
        <div class="waterfall-card-title">
            <img src="${this.posterAvatar}" class="waterfall-card-avatar">
            <div class="waterfall-card-poster-tags">
                <div class="waterfall-card-poster">${this.posterName}</div>
                <div class="waterfall-card-tags-time">
                    <div class="waterfall-card-tags">${tags}</div>
                    <div class="waterfall-card-time">${dateTime}</div>
                </div>
            </div>
        </div>
        <div class="waterfall-card-image-container">
            <img src="${this.imageUrl}" class="waterfall-card-image">
        </div>
        <div class="waterfall-card-footer">
            <div class="waterfall-card-footer-icons">
                <span class="iconfont ${likeIcons} love-icons" cardID="${num}"></span>
                <span class="iconfont icon-pinglun" cardID="${num}"></span>
                <span class="iconfont icon-sendfasong"></span>
            </div>
            <div class="waterfall-card-footer-likes"><span id="waterfall-card-footer-likes-num">${likesNum}</span> likes</div>
            <div class="waterfall-card-footer-description">${this.caption}</div>
            <span class="waterfall-card-footer-comments" cardID="${num}">View all ${commentsNum} comments</span>
        </div>
        <div class="waterfall-card-comments">
        </div>

        <div class="waterfall-card-comment-writer">
            <div class="iconfont icon-weixiao"></div>
            <input type="text" placeHolder="Add a comment..." class="waterfall-comment-input" cardID="${commentsNum}">
            <div class="waterfall-comment-post">Post</div>
        </div>
    `;

        return template;
    }

}

class ShareTools {
    static container = {};
}

class ShareTool {
    constructor(id, dom) {
        this.dom = dom;
        this.id = id;
        this.init();
    }

    init() {
        // if the share tool is already created
        // 1. if the share tool created by current card, remove it
        // 2. if the share tool created by other card, remove it and create a new one
        let ids = Object.keys(ShareTools.container);
        if (ids.length > 0) {
            if (ids.includes(this.id)) {
                ShareTools.container[this.id].remove();
                delete ShareTools.container[this.id];
                return
            } else {
                ShareTools.container[ids[0]].remove();
                delete ShareTools.container[ids[0]];
            }
        }


        let shareContainer = document.createElement("div");
        shareContainer.id = "shareContainer";
        let x = -60
        let y = 28

        shareContainer.innerHTML =
            `
            <span class="share-icon"><span class="iconfont icon-whatsapp"></span></span>
            <span class="share-icon"><span class="iconfont icon-linkedin-fill"></span></span>
            <span class="share-icon"><span class="iconfont icon-twitter"></span></span>
            <span class="share-icon"><span class="iconfont icon-facebook-fill"></span></span>
        `
        shareContainer.style.position = "absolute"
        shareContainer.style.top = `${x}px`;
        shareContainer.style.left = `${y}px`;
        this.dom.appendChild(shareContainer)
        ShareTools.container[this.id] = shareContainer;

        shareContainer.querySelector(".icon-whatsapp").addEventListener("click", () => {
            window.open("https://web.whatsapp.com/", "_blank")
        })
        shareContainer.querySelector(".icon-linkedin-fill").addEventListener("click", () => {
            window.open("https://www.linkedin.com/", "_blank")
        })

        shareContainer.querySelector(".icon-twitter").addEventListener("click", () => {
            window.open("https://twitter.com/", "_blank")
        })
        shareContainer.querySelector(".icon-facebook-fill").addEventListener("click", () => {
            window.open("https://www.facebook.com/", "_blank")
        })

        // click other place, remove the share tool
        document.addEventListener("click", (e) => {
            if (e.target.className !== "iconfont icon-sendfasong") {
                shareContainer.remove();
                delete ShareTools.container[this.id];
            }
        })
    }
}




class firebaseHandler {
    static addLikeDataToImage(imageId, userId) {
        fbStore.addArrayElement("images", imageId, "likes", userId)
    }

    static removeLikeDataFromImage(imageId, userId) {
        fbStore.removeArrayElement("images", imageId, "likes", userId)
    }

    static addLikeDataToUser(imageId, userId) {
        fbStore.addArrayElement("users", userId, "likes", imageId)
    }

    static removeLikeDataFromUser(imageId, userId) {
        fbStore.removeArrayElement("users", userId, "likes", imageId)
    }
}