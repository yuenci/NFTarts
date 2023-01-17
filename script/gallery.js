import { FBStore } from "./firebase/storeHandler.js";
import { FBAuth } from "./firebase/authHandler.js";
const fbStore = new FBStore();
const fbAuth = new FBAuth();


var galleryData = "";
window.onload = async function () {
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
    }

    insertCard() {
        let card = document.createElement("div");
        card.classList.add("waterfall-card");
        card.innerHTML = this.getStucture();
        document.querySelector("body").appendChild(card);

        Status.carsList.push(card);

        const likebtn = card.querySelector(".love-icons");
        likebtn.addEventListener("click", () => {
            likebtn.classList.toggle("icon-love");
            firebaseHandler.addLikeDataToImage(this.id, localStorage.getItem("uid"));
            firebaseHandler.addLikeDataToUser(this.id, localStorage.getItem("uid"));
        });
    };

    getStucture() {
        let num = Math.floor(Math.random() * 1000);
        let tags = "";
        for (let i = 0; i < this.tags.length; i++) {
            tags += this.tags[i] + " ";
        }

        let commentsNum = Object.keys(this.comments).length;
        let likesNum = this.likes.length;
        let dateTime = new Date(this.timestamp * 1000).toLocaleString();

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
                <span class="iconfont icon-xihuan love-icons" cardID="${num}"></span>
                <span class="iconfont icon-pinglun" cardID="${num}"></span>
                <span class="iconfont icon-sendfasong"></span>
            </div>
            <div class="waterfall-card-footer-likes">${likesNum} likes</div>
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