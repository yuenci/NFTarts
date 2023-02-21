import { FBStore } from "./firebase/storeHandler.js";
import { FBAuth } from "./firebase/authHandler.js";
import { Modal } from "./modal.js";
const fbStore = new FBStore();
const fbAuth = new FBAuth();


var galleryData = "";
var userData = {};
window.onload = async function () {
    let uid = localStorage.getItem("uid");
    userData = await fbStore.readDocument("users", uid);

    let allImagesData = await fbStore.readCollection("images");
    // console.log(allImagesData);

    for (let key in allImagesData) {
        let picData = allImagesData[key];
        picData.id = key;
        let pic = new Card(picData);
        pic.insertCard();
    }
};

class Status {
    static carsList = [];
    static shareTools = {};
    static emojyTools = {};
}

class Card {
    constructor(data) {
        this.data = data;
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
        this.data.card = card;

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
                let newlikeNum = parseInt(likeNum.innerHTML) + 1;
                likeNum.innerHTML = newlikeNum == 1 ? "1 like" : newlikeNum + " likes";
            } else {
                console.log("unliked");
                likeBtn.classList.replace("icon-love", "icon-xihuan");

                firebaseHandler.removeLikeDataFromImage(this.id, currentUid);
                firebaseHandler.removeLikeDataFromUser(this.id, currentUid);
                let newlikeNum = parseInt(likeNum.innerHTML) - 1;
                likeNum.innerHTML = newlikeNum == 1 ? "1 like" : newlikeNum + " likes";
            }
        });

        // Comment button event listener



        // share button event listener
        const shareBtn = card.querySelector(".icon-sendfasong");
        shareBtn.addEventListener("click", () => this.shareBtnEvent());

        // emoji button event listener
        const emojiBtn = card.querySelector(".icon-weixiao");
        emojiBtn.addEventListener("click", () => this.emojiBtnEvent());

        // comment input event listener
        const commentInput = card.querySelector(".waterfall-comment-input");
        commentInput.addEventListener("input", () => this.commentInputEvent());

        // comment post button event listener
        const commentPostBtn = card.querySelector(".waterfall-comment-post");
        commentPostBtn.addEventListener("click", () => this.commentPostBtnEvent());

        // comment detail button event listener
        const commentDetailBtn = card.querySelector(".icon-pinglun");
        const commentDetail = card.querySelector(".waterfall-card-footer-comments");
        commentDetailBtn.addEventListener("click", () => this.commentDetailEvent());
        commentDetail.addEventListener("click", () => this.commentDetailEvent());

        this.imageClickEvent();
    };
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

        this.data.tags = tags;
        this.data.likesNum = likesNum
        this.data.dateTime = dateTime;
        this.data.likeIcons = likeIcons;


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
            <div class="waterfall-card-footer-likes"><span id="waterfall-card-footer-likes-num">${likesNum == 1 ? "1 like" : likesNum + " likes"}</span></div>
            <div class="waterfall-card-footer-description">${this.caption}</div>
            <span class="waterfall-card-footer-comments" cardID="${num}">View all 
                <span id="waterfall-card-comments-num">${commentsNum}</span> comments</span>
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

    shareBtnEvent() {
        const cardFooter = this.card.querySelector(".waterfall-card-footer");
        new ShareTool(this.id, cardFooter);
    }

    emojiBtnEvent() {
        const writer = this.card.querySelector(".waterfall-card-comment-writer");
        new EmojyTool(this.id, writer);
    }

    commentInputEvent() {
        let commentInput = this.card.querySelector(".waterfall-comment-input");
        let commentPost = this.card.querySelector(".waterfall-comment-post");
        if (commentInput.value.length > 0) {
            commentPost.style.color = "#007bff ";
        } else {
            commentPost.style.color = "rgb(179, 223, 252)";
        }
        commentInput.focus();
    }

    async commentPostBtnEvent() {
        let commentInput = this.card.querySelector(".waterfall-comment-input");
        if (commentInput.value.length === 0) {
            alert("Please enter your comment");
            return;
        }
        let currentUser = await fbAuth.getCurrentUser();
        console.log(currentUser);
        let timestamp = new Date().getTime();


        let commentData = {
            userName: currentUser.displayName,
            userUid: currentUser.uid,
            comment: commentInput.value,
            dateTime: new Date()
        }

        // make a copy of the comments
        let newComments = this.comments;

        newComments[timestamp] = commentData;

        console.log(newComments);

        let res = await fbStore.update("images", { comments: newComments }, this.id)
        if (res) {
            let commentsNum = Object.keys(newComments).length;
            let commentsNumDom = this.card.querySelector("#waterfall-card-comments-num");
            commentsNumDom.innerText = commentsNum;
        }
        commentInput.value = "";
        commentInput.focus();


        let timeFormat = new Date(timestamp).getHours() + ":" + new Date(timestamp).getMinutes();

        let template = `
            <span class="waterfall-card-comment-username">${currentUser.displayName}</span>
            <span class="waterfall-card-comment-content">${commentData.comment}</span>
            <div class="waterfall-card-comment-time">${timeFormat}</div>
        `

        let comments = this.card.querySelector(".waterfall-card-comments");
        let new_comment = document.createElement("div");
        new_comment.className = "waterfall-card-comment";
        new_comment.innerHTML = template;
        comments.appendChild(new_comment);
    }

    commentDetailEvent() {
        new ImageCard(this.data).showModal();
    }

    imageClickEvent() {
        const image = this.card.querySelector(".waterfall-card-image-container");
        image.addEventListener("click", () => {
            new ImageCard(this.data).showModal();
        })
    }
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
        let ids = Object.keys(Status.shareTools);
        if (ids.length > 0) {
            if (ids.includes(this.id)) {
                Status.shareTools[this.id].remove();
                delete Status.shareTools[this.id];
                return
            } else {
                Status.shareTools[ids[0]].remove();
                delete Status.shareTools[ids[0]];
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
        Status.shareTools[this.id] = shareContainer;

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
                delete Status.shareTools[this.id];
            }
        })
    }
}

class EmojyTool {
    constructor(id, dom) {
        this.dom = dom;
        this.id = id;
        this.init();
    }

    init() {
        // if the share tool is already created
        // 1. if the share tool created by current card, remove it
        // 2. if the share tool created by other card, remove it and create a new one
        let ids = Object.keys(Status.emojyTools);
        if (ids.length > 0) {
            if (ids.includes(this.id)) {
                Status.emojyTools[this.id].remove();
                delete Status.emojyTools[this.id];
                return
            } else {
                Status.emojyTools[ids[0]].remove();
                delete Status.emojyTools[ids[0]];
            }
        }
        let x = -45
        let y = -82

        let emojyContainer = document.createElement("div");
        emojyContainer.id = "emojyContainer";
        emojyContainer.innerHTML =
            `
            <span class="emojy-icon">👍</span>
            <span class="emojy-icon">❤️</span>
            <span class="emojy-icon">😁</span>
            <span class="emojy-icon">😲</span>
            <span class="emojy-icon">🙏</span>
        `
        emojyContainer.style.position = "absolute"
        emojyContainer.style.top = `${x}px`;
        emojyContainer.style.left = `${y}px`;
        this.dom.appendChild(emojyContainer)
        Status.emojyTools[this.id] = emojyContainer;

        // click other place, remove the share tool
        document.addEventListener("click", (e) => {
            if (e.target.className !== "iconfont icon-weixiao") {
                emojyContainer.remove();
                delete Status.emojyTools[this.id];
            }
        });

        let emojiBtns = emojyContainer.querySelectorAll(".emojy-icon");
        emojiBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                let commentInput = this.dom.querySelector(".waterfall-comment-input");
                commentInput.value += btn.innerText;
                this.inputStatusDetect();
            })
        })
    }

    inputStatusDetect() {
        let commentInput = this.dom.querySelector(".waterfall-comment-input");
        let commentPost = this.dom.querySelector(".waterfall-comment-post");
        //console.log(commentInput.value.length);
        if (commentInput.value.length > 0) {
            commentPost.style.color = "#007bff ";
        } else {
            commentPost.style.color = "rgb(179, 223, 252)";
        }
        commentInput.focus();
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

class ImageCard extends Modal {
    constructor(data) {
        super();
        this.init(data);
        console.log(data);
    }

    init(data) {
        //console.log(data);
        document.querySelector("#modal").appendChild(this.getStucture(data));
        this.addComment(data.comments);
    }

    getStucture(data) {
        let backLayer = document.createElement("div");
        let num = data.id;

        backLayer.innerHTML = `
    <div id="backLayer-container">
        <img src="${data.imageUrl}" alt="" id="backLayer-main-image">
        <div id="backLayer-left-container">
            <div id="backLayer-card-title">
                <div id="backLayer-Avatar-name-tags">
                    <img src="${data.posterAvatar}" class="waterfall-card-avatar">
                    <div class="waterfall-card-poster-tags">
                        <div class="waterfall-card-poster">${data.posterName}</div>
                        <div class="waterfall-card-tags">${data.tags}</div>
                    </div>
                 </div>
               <div><span class="iconfont icon-guanbi" id="backLayer-icon-guanbi" cardID="${num}"></span></div>
            </div>
            <div id="backLayer-comments-container">
            </div>
             <div id="backlayer-footer">
                <div class="waterfall-card-footer">
                    <div class="waterfall-card-footer-icons">
                        <span class="iconfont ${data.likeIcons} love-icons" type="backLayer" cardID="${num}"></span>
                        <span class="iconfont icon-pinglun" type="backLayer" cardID="${num}"></span>
                        <span class="iconfont icon-sendfasong" type="backLayer"></span>
                    </div>
                    <div class="waterfall-card-footer-likes">${data.likesNum == 1 ? data.likesNum + " like" : data.likesNum + " likes"}</div>
                    <div id="backlayer-poster-time">${data.dateTime}</div>
                </div>

                <div class="waterfall-card-comment-writer" id="waterfall-card-comment-writer">
                    <div class="iconfont icon-weixiao" type="backLayer"></div>
                    <input type="text" placeHolder="Add a comment..." class="waterfall-comment-input" cardID="${num}">
                    <div class="waterfall-comment-post" type="backLayer">Post</div>
                </div>
            </div>
        </div>
    </div>
    `
        let cliH = document.documentElement.clientHeight;
        let cliW = document.documentElement.clientWidth;
        backLayer.style.height = `${cliH}px`;
        backLayer.style.width = `${cliW * 0.5}px`;
        this.addEvent(backLayer, data)
        return backLayer;
    }

    addEvent(backLayer, data) {
        //close button event
        backLayer.querySelector("#backLayer-icon-guanbi").addEventListener("click", () => {
            this.hideModal();
        })
        // like button event
        backLayer.querySelector(".love-icons").addEventListener("click", () => {
            let likeBtn, likeNum;
            if (data.card) {
                likeBtn = data.card.querySelector(".love-icons");
                likeNum = data.card.querySelector("#waterfall-card-footer-likes-num");
            }

            let currentUid = localStorage.getItem("uid");

            if (likeBtn) {
                if (likeBtn.getAttribute("class").includes("icon-xihuan")) {
                    console.log("liked");
                    likeBtn.classList.replace("icon-xihuan", "icon-love");


                    firebaseHandler.addLikeDataToImage(data.id, currentUid);
                    firebaseHandler.addLikeDataToUser(data.id, currentUid);
                    likeNum.innerHTML = parseInt(likeNum.innerHTML) + 1;
                } else {
                    console.log("unliked");
                    likeBtn.classList.replace("icon-love", "icon-xihuan");
                    firebaseHandler.removeLikeDataFromImage(data.id, currentUid);
                    firebaseHandler.removeLikeDataFromUser(data.id, currentUid);
                    likeNum.innerHTML = parseInt(likeNum.innerHTML) - 1;
                }

                backLayer.querySelector(".waterfall-card-footer-likes").innerHTML = data.card.querySelector(".waterfall-card-footer-likes").innerHTML;
                let classList = data.card.querySelector(".love-icons").getAttribute("class");
                backLayer.querySelector(".love-icons").setAttribute("class", classList);
            } else {
                likeBtn = backLayer.querySelector(".love-icons");
                likeNum = backLayer.querySelector(".waterfall-card-footer-likes");
                if (backLayer.querySelector(".love-icons").getAttribute("class").includes("icon-xihuan")) {
                    console.log("liked");
                    likeBtn.classList.replace("icon-xihuan", "icon-love");
                    firebaseHandler.addLikeDataToImage(data.id, currentUid);
                    firebaseHandler.addLikeDataToUser(data.id, currentUid);
                    let newLikeNum = parseInt(likeNum.innerHTML) + 1;
                    likeNum.innerHTML = newLikeNum == 1 ? newLikeNum + " like" : newLikeNum + " likes";
                } else {
                    console.log("unliked");
                    likeBtn.classList.replace("icon-love", "icon-xihuan");
                    firebaseHandler.removeLikeDataFromImage(data.id, currentUid);
                    firebaseHandler.removeLikeDataFromUser(data.id, currentUid);
                    let newLikeNum = parseInt(likeNum.innerHTML) - 1;
                    likeNum.innerHTML = newLikeNum == 1 ? newLikeNum + " like" : newLikeNum + " likes";
                }

            }


        })

        //share button event
        backLayer.querySelector(".icon-sendfasong").addEventListener("click", () => {
            new ShareTool(data.id, backLayer.querySelector(".waterfall-card-footer-icons"));
        })

        //emojy button event
        backLayer.querySelector(".icon-weixiao").addEventListener("click", () => {
            new EmojyTool(data.id, backLayer.querySelector(".waterfall-card-comment-writer"));
        })

        // input event
        backLayer.querySelector(".waterfall-comment-input").addEventListener("input", () => {
            let commentInput = backLayer.querySelector(".waterfall-comment-input");
            let commentPost = backLayer.querySelector(".waterfall-comment-post");

            if (commentInput.value.length > 0) {
                commentPost.style.color = "#007bff ";
            } else {
                commentPost.style.color = "rgb(179, 223, 252)";
            }
            commentInput.focus();
        })

        // post button event
        backLayer.querySelector(".waterfall-comment-post").addEventListener("click", async () => {
            let commentInput = backLayer.querySelector(".waterfall-comment-input");
            if (commentInput.value.length === 0) {
                alert("Please enter your comment");
                return;
            }
            let currentUser = await fbAuth.getCurrentUser();

            let timestamp = new Date().getTime();


            let commentData = {
                userName: currentUser.displayName,
                userUid: currentUser.uid,
                comment: commentInput.value,
                dateTime: new Date()
            }

            // make a copy of the comments
            let newComments = data.comments;

            newComments[timestamp] = commentData;

            //console.log(newComments);


            let res = await fbStore.update("images", { comments: newComments }, data.id)
            if (res) {
                let commentsNum = Object.keys(newComments).length;
                if (data.card) {
                    let commentsNumDom = data.card.querySelector("#waterfall-card-comments-num");
                    commentsNumDom.innerText = commentsNum;
                }
            }
            commentInput.value = "";
            commentInput.focus();

            new CommentCard(commentData);
        })
    }

    addComment(data) {



        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            data[keys[i]].key = keys[i];
            new CommentCard(data[keys[i]]);
        }
    }
}


class CommentCard {
    constructor(data) {
        this.data = data;
        this.init()
        // console.log("comment card", data);
    }

    init() {
        let username = this.data.userName;
        let value = this.data.comment;
        let timeFormat = new Date(Number(this.data.key)).toLocaleString();
        if (timeFormat === "Invalid Date") {
            timeFormat = this.data.dateTime.toLocaleString();
        }


        let template = `
                <div class="backLayer-comment-avatar">${username.substring(0, 1).toUpperCase()}</div>
                <div class="backLayer-comment-name-time-content">
                    <span class="backLayer-comment-username">${username.toUpperCase()}</span>
                    <div class="backLayer-comment-content">${value}</div>
                    <div class="backLayer-comment-time">${timeFormat}</div>
                </div>
        `
        let new_comment = document.createElement("div");
        new_comment.className = "backLayer-comment";
        new_comment.innerHTML = template;

        let container = document.querySelector("#backLayer-comments-container")
        let first = container.firstChild;
        container.insertBefore(new_comment, first);
        ///document.querySelector("#backLayer-comments-container").appendChild(new_comment);
    }
}


export { ImageCard };