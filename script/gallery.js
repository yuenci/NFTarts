import { FBStore } from "./firebase/storeHandler.js";
import { FBAuth } from "./firebase/authHandler.js";
const fbStore = new FBStore();
const fbAuth = new FBAuth();


var galleryData = "";
window.onload = function () {
    fbStore.readCollection("images").then((data) => {
        galleryData = data;
        console.log(galleryData);
    });

    let keys = Object.keys(galleryData);
    let pic1Data = galleryData[keys[0]];
};

class Card {
    constructor(data) {
        this.caption = data.caption;
        this.comment = data.comment;
        this.imageUrl = data.imageUrl;
        this.likes = data.likes;
        this.tags = data.tags;
        this.timestamp = data.timestamp.seconds;
        this.owner = data.uid;
    }

    getStucture() {
        let postAvatarUrl = "https://api.multiavatar.com/Binx Bond";



        let template = `
        <div class="waterfall-card-title">
            <img src="${postAvatarUrl}" class="waterfall-card-avatar">
            <div class="waterfall-card-poster-tags">
                <div class="waterfall-card-poster">${posterName}</div>
                <div class="waterfall-card-tags-time">
                    <div class="waterfall-card-tags">${tags}</div>
                    <div class="waterfall-card-time">${postTime}</div>
                </div>
            </div>
        </div>
        <div class="waterfall-card-image-container">
            <img src=".${imageUrl}" class="waterfall-card-image">
        </div>
        <div class="waterfall-card-footer">
            <div class="waterfall-card-footer-icons">
                <span class="iconfont icon-xihuan love-icons" cardID="${num}"></span>
                <span class="iconfont icon-pinglun" cardID="${num}"></span>
                <span class="iconfont icon-sendfasong"></span>
            </div>
            <div class="waterfall-card-footer-likes">${likesNum} likes</div>
            <div class="waterfall-card-footer-description">${description}</div>
            <span class="waterfall-card-footer-comments" cardID="${num}">View all ${commentsNum} comments</span>
        </div>
        <div class="waterfall-card-comments">
        </div>

        <div class="waterfall-card-comment-writer">
            <div class="iconfont icon-weixiao"></div>
            <input type="text" value="Add a comment..." class="waterfall-comment-input" cardID="${num}">
            <div class="waterfall-comment-post">Post</div>
        </div>
    `;

        return template;
    }

}