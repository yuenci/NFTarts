window.onload = function () {

    addACard(1);
    addACard(2);
    let btn = document.createElement("button");
    btn.id = "testid";
    btn.innerHTML = "Click";
    btn.style.position = "fixed";
    btn.style.top = "200px"
    btn.style.zIndex = "999";
    // document.body.appendChild(btn)
    // btn.addEventListener("click", function () {
    //     //console.log("hi");
    //     let like_btns = document.getElementsByClassName("icon-xihuan");
    //     console.log(like_btns);
    // })
    localStorage.setItem("userName", "innisv")
    //setTestData()
    //console.log(getDateTime());
    //timeDelta();

}
let imagesData = idbKeyval.createStore("imagesData-store", "imagesData")
function setTestData() {
    let imagesData = idbKeyval.createStore("imagesData-store", "imagesData")
    value_value = {
        "likes": ["innisv", "yannisv", "pheyminv", "javk", "lalsadas"],
        "comments": {
            1: {
                "userName": "innisv",
                "comment": "2this is good pic1",
                "dateTime": "2022/5/22 9:22:41"
            },
            2: {
                "userName": "yannisv",
                "comment": "2this is good pic2",
                "dateTime": "2022/5/22 10:22:41"
            },
            3: {
                "userName": "pheyminv",
                "comment": "2this is good pic3",
                "dateTime": "2022/5/22 11:22:41"
            },
            4: {
                "userName": "javk",
                "comment": "2this is good pic4",
                "dateTime": "2022/5/22 12:22:41"
            }
        }
    }
    idbKeyval.set(1, value_value, imagesData);
}


window.onbeforeunload = function () {
    localStorage.setItem("userName", "-1");
};



let images = {
    1: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/1-innis-may 20 2022.jpg",
        "description": "This is a description"
    },
    2: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/2-yannis-may 20 2022.jpg",
        "description": "This is a description"
    },
    3: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/3-pheymin-may 20 2022.jpg",
        "description": "This is a description"
    },
    4: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/4-innis-may 20 2022.jpg",
        "description": "This is a description"
    },
    5: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/5-yannis-may 20 2022.jpg",
        "description": "This is a description"
    },
    6: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/6-pheymin-may 20 2022.jpg",
        "description": "This is a description"
    },
    7: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/7-innis-may 20 2022.jpg",
        "description": "This is a description"
    },
    8: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/8-yannis-may 20 2022.jpg",
        "description": "This is a description"
    },
    9: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/9-pheymin-may 20 2022.jpg",
        "description": "This is a description"
    },
    10: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/10-innis-may 20 2022.png",
        "description": "This is a description"
    },
    11: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/11-yannis-may 20 2022.png",
        "description": "This is a description"
    },
    12: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/12-pheymin-may 20 2022.jpg",
        "description": "This is a description"
    }
}


// let comment_inputs = document.getElementsByClassName("waterfall-comment-input");
// inputEvent(comment_inputs[0]);

function inputEvent(obj) {
    obj.onfocus = function () {
        if (obj.value == "Add a comment...") {
            obj.value = "";
        }
    }
    obj.onblur = function () {
        if (obj.value == "") {
            obj.value = "Add a comment...";
        }
    }

    obj.oninput = function () {
        if (!isNull(obj.value)) {
            this.parentNode.children[2].style.color = "#0095f6"
        } else {
            this.parentNode.children[2].style.color = "#b3dffc"
        }
    }
}

function isNull(str) {
    if (str == "") {
        return true;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}


function postBtnEvent(obj) {
    if (obj === null) {
        return false;
    }
    let type = obj.getAttribute("type")
    if (type === null) {
        obj.addEventListener("click", function () {
            if (!confirmForm("Want give a comment? please log in first.")) {
                return false;
            };
            let comments = obj.parentNode.previousElementSibling;
            let inputEle = obj.previousElementSibling

            let value = inputEle.value;
            let username, timeFormat;
            if (!isNull(value)) {
                let date = new Date();
                username = localStorage.getItem("userName").toUpperCase()
                timeFormat = `${date.getHours()}:${date.getMinutes()}`;
            }
            let template = `
            <span class="waterfall-card-comment-username">${username}</span>
            <span class="waterfall-card-comment-content">${value}</span>
            <div class="waterfall-card-comment-time">${timeFormat}</div>
        `
            let new_comment = document.createElement("div");
            new_comment.className = "waterfall-card-comment";
            new_comment.innerHTML = template;
            comments.appendChild(new_comment);

            // empty input
            inputEle.value = "";
            inputEle.focus();
            obj.style.color = "#b3dffc"
        });
    } else if (type === "backLayer") {
        obj.addEventListener("click", function () {
            if (!confirmForm("Want give a comment? please log in first.")) {
                return false;
            };
            let rightSide = obj.parentNode.parentNode.parentNode;
            let comments = rightSide.children[0].children[1]

            let inputEle = obj.previousElementSibling

            let value = inputEle.value;
            let username, timeFormat;
            if (!isNull(value)) {
                let date = new Date();
                username = localStorage.getItem("userName").toUpperCase()
                timeFormat = `${date.getHours()}:${date.getMinutes()}`;
            }
            let template = `
                <div class="backLayer-comment-avatar">${username.substring(0, 1)}</div>
                <div class="backLayer-comment-name-time-content">
                    <span class="backLayer-comment-username">${username}</span>
                    <div class="backLayer-comment-content">${value}</div>
                    <div class="backLayer-comment-time">${timeFormat}</div>
                </div>
        `
            let new_comment = document.createElement("div");
            new_comment.className = "backLayer-comment";
            new_comment.innerHTML = template;
            comments.appendChild(new_comment);

            // empty input
            inputEle.value = "";
            inputEle.focus();
            obj.style.color = "#b3dffc"
        })
    }

}
function showComments(picid) {
    let username = localStorage.getItem("userName").toUpperCase()
    let imagesData = idbKeyval.createStore("imagesData-store", "imagesData")

    idbKeyval.get(picid, imagesData).then(
        function (data) {
            let comments = data["comments"];
            let comNum = Object.keys(comments);
            for (let index = 0; index < comNum; index++) {
                const element = array[index + 1];
                insert(username, element.comment, element.dateTime);
            }
        }
    );

    function insert(username, value, timeFormat) {
        let template = `
                <div class="backLayer-comment-avatar">${username.substring(0, 1)}</div>
                <div class="backLayer-comment-name-time-content">
                    <span class="backLayer-comment-username">${username}</span>
                    <div class="backLayer-comment-content">${value}</div>
                    <div class="backLayer-comment-time">${timeFormat}</div>
                </div>
        `
        let new_comment = document.createElement("div");
        new_comment.className = "backLayer-comment";
        new_comment.innerHTML = template;
        comments.appendChild(new_comment);
    }
}

//./images/NFT/1-innis-may 20 2022.jpg
//addACard("tagsssss", "./images/NFT/12-pheymin-may 20 2022.jpg", "999", "sdasdsadsadsads", "99999");
async function addACard(num) {
    if (!images[num]) {
        return false
    }
    let likesNum = await getLikesNum(num);
    let commentsNum = await getCommentsNum(num);
    let postAvatarUrl, posterName, tags, postTime, imageUrl, description;
    [postAvatarUrl, posterName, tags, postTime, imageUrl, description] = getImageData(num)

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
            <img src="${imageUrl}" class="waterfall-card-image">
        </div>
        <div class="waterfall-card-footer">
            <div class="waterfall-card-footer-icons">
                <span class="iconfont icon-xihuan" cardID="${num}"></span>
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
    `
    let new_card = document.createElement("div")
    new_card.className = "waterfall-card";
    new_card.innerHTML = template;
    document.body.appendChild(new_card);

    addEvent(num);
}
function getLikesNum(picID) {
    return new Promise(function (resolve) {
        let imagesData = idbKeyval.createStore("imagesData-store", "imagesData")
        idbKeyval.get(picID, imagesData).then(
            function (val) {

                if (val) {
                    //console.log(val.likes.length);
                    resolve(val.likes.length)
                } else {
                    //console.log(val.likes.length);
                    resolve(0);
                }
            })
    })
}
function getCommentsNum(picID) {
    return new Promise(function (resolve) {
        let imagesData = idbKeyval.createStore("imagesData-store", "imagesData")
        idbKeyval.get(picID, imagesData).then(
            function (val) {
                if (val) {
                    let articleIDList = Object.keys(val.comments)
                    //console.log(articleIDList.length);
                    resolve(articleIDList.length)
                } else {
                    resolve(0);
                }
            })
    })
}

function getImageData(num) {
    let description = images[num]["description"];
    let imageUrl = images[num]["imageUrl"];
    let tags = images[num]["tags"];


    let imageData = imageUrl.replace(".jpg", "")
    imageData = imageData.replace(".png", "").split("-")
    let posterName = imageData[1].toUpperCase();
    let postTime = imageData[2].toUpperCase();
    let postAvatarUrl = ""
    if (posterName === "INNIS") {
        postAvatarUrl = "./images/innis.jpg"
    } else if (posterName === "YANNIS") {
        postAvatarUrl = "./images/yannis.jpg"
    } else if (posterName === "PHEYMIN") {
        postAvatarUrl = "./images/pheymin.jpg"
    }
    return [postAvatarUrl, posterName, tags, postTime, imageUrl, description];
}


function addEvent(index, type = "card") {
    index = index - 1;
    let comment_inputs = document.getElementsByClassName("waterfall-comment-input");
    let input = comment_inputs[index];
    inputEvent(input);

    let post_btns = document.getElementsByClassName("waterfall-comment-post");
    let post_btn = post_btns[index];
    postBtnEvent(post_btn);

    let emojy_btns = document.getElementsByClassName("icon-weixiao");
    let emojy_btn = emojy_btns[index];
    emojy(emojy_btn);

    let like_btns = document.getElementsByClassName("icon-xihuan");
    let like_btn = like_btns[index];
    // console.log(index);
    // console.log(like_btns);
    // console.log(like_btn);
    likeClickEvent(like_btn);

    let shart_btns = document.getElementsByClassName("icon-sendfasong")
    let shart_btn = shart_btns[index]
    shareBtnClickEvent(shart_btn);

    let zoom_btns = document.getElementsByClassName("icon-pinglun");
    let zoom_btn = zoom_btns[index]
    zoomBtnClickEvent(zoom_btn);

    if (type == "card") {
        let view_comments = document.getElementsByClassName("waterfall-card-footer-comments");
        let view_comment = view_comments[index];
        view_comment.addEventListener("click", () =>
            view_comment.parentNode.children[0].children[1].click());
    }
}

let imageID = 2;



document.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        //console.log('down');
        if (ifEnterClientTotally(imageID)) {
            if (localStorage.getItem("userName") !== "-1") {
                addACard(imageID + 1);
                imageID += 1;
            } else {
                confirmForm("Want view more? please log in first.");
            }
        }
    } else {
        //console.log('up');
    }
})

function confirmForm(str) {
    if (localStorage.getItem("userName") !== "-1") {
        return true;
    } else {
        var r = confirm(str)
        if (r == true) {
            window.location.href = "login.html";
        }
        return false;
    }

}


function ifEnterClientTotally(num) {
    num = num - 1;
    let cliH = document.documentElement.clientHeight;

    let cards = document.getElementsByClassName("waterfall-card");
    if (!cards[num]) {
        return false;
    }
    let bot = cards[num].getBoundingClientRect().bottom;
    if (bot - 100 < cliH) {
        return true;
    } else {
        return false;
    }
}


function createEmojyBar(x, y) {
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
    document.body.appendChild(emojyContainer)

    let emojys = document.getElementsByClassName("emojy-icon");
    for (let index = 0; index < emojys.length; index++) {
        const element = emojys[index];
        element.addEventListener("click", emojyIconClickEvent)
    }

}
function emojyIconClickEvent() {
    let targetInput = emojyTarget.nextElementSibling;
    if (targetInput.value == "Add a comment...") {
        targetInput.value = this.innerHTML;
    } else {
        targetInput.value += this.innerHTML;
    }

    let emojyCon = document.getElementById("emojyContainer")
    emojyCon.remove();
    emojyTarget = "";
    targetInput.focus();
}

var emojyTarget = "";

function emojy(obj) {
    obj.addEventListener("click", function () {
        let emojyCon = document.getElementById("emojyContainer")
        if (emojyCon != null && emojyTarget == this) {
            emojyCon.remove();
            emojyTarget = "";
            return false;
        }
        if (emojyCon != null && emojyTarget != this) {
            emojyCon.remove();
            emojyTarget = "";
        }
        let top = this.offsetTop;
        let left = this.getBoundingClientRect().left;
        createEmojyBar(top - 60, left - 93);
        //console.log("emojy!");
        emojyTarget = this;
    });
}

async function likeClickEvent(obj) {
    // console.log(obj);
    obj.addEventListener("click", function () {
        if (this.className == "iconfont icon-xihuan") {
            if (confirmForm("Like this image? Get an account first!")) {
                console.log();
                this.className = "iconfont  icon-love"
            }
        } else {
            //minus1
            this.className = "iconfont icon-xihuan"
        }
    })

    // let cardid = obj.getAttribute("cardid")
    // let res = await ifInLikeList(cardid)

    // if (res) {
    //     obj.className = "iconfont  icon-love";
    // }
}



function createShareBar(x, y) {
    let shareContainer = document.createElement("div");
    shareContainer.id = "shareContainer";
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
    document.body.appendChild(shareContainer)

    let emojys = document.getElementsByClassName("share-icon");
    for (let index = 0; index < emojys.length; index++) {
        const element = emojys[index];
        let shareUrl = shareIconType(element);
        element.addEventListener("click", function () {
            window.open(`${shareUrl}`, '_blank');
        })

    }
}
var shareTarget = "";

function shareBtnClickEvent(obj) {
    obj.addEventListener("click", function () {
        let shareCon = document.getElementById("shareContainer")
        if (shareCon != null && shareTarget == this) {
            shareCon.remove();
            return false;
        }
        if (shareCon != null && shareTarget != this) {
            shareCon.remove();
        }
        let top = this.parentNode.parentNode.offsetTop;
        let left = this.getBoundingClientRect().left;
        createShareBar(top - 60, left - 90)
        shareTarget = this;
    });
}

function shareIconType(obj) {

    let webName = obj.children[0].className;
    if (webName.includes("whatsapp")) {
        return "https://web.whatsapp.com/";
    } else if (webName.includes("linkedin")) {
        return "http://www.linkedin.com/";
    } else if (webName.includes("twitter")) {
        return "https://twitter.com/";
    } else if (webName.includes("facebook")) {
        return "https://www.facebook.com/";
    }
}

function zoomBtnClickEvent(obj) {
    obj.addEventListener("click", function () {
        if (this.getAttribute("type") === "backLayer") {
            let footer = this.parentNode.parentNode.parentNode
            let writer = footer.children[1].children[1];
            writer.focus();
            return false
        }
        let cardID = this.getAttribute("cardid")
        creatMasklayer(cardID)
    })
}

async function creatMasklayer(cardID) {

    let postAvatarUrl, posterName, tags, postTime, imageUrl, description;
    [postAvatarUrl, posterName, tags, postTime, imageUrl, description] = getImageData(cardID);
    let num = cardID

    let backLayer = document.createElement("div");
    backLayer.style.position = "absolute";
    backLayer.id = "backLayer";

    let cliH = document.documentElement.clientHeight;
    let cliW = document.documentElement.clientWidth;
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    backLayer.style.height = `${cliH}px`;
    backLayer.style.width = `${cliW + 17}px`;
    backLayer.style.backgroundColor = "rgba(0,0,0,.65)"
    backLayer.style.top = `${window.scrollY}px`;
    //backLayer.style.top = "0px";

    let likesNum = await getLikesNum(Number(cardID));


    backLayer.innerHTML = `
    <div id="backLayer-container">
        <img src="${imageUrl}" alt="" id="backLayer-main-image">
        <div id="backLayer-left-container">
            <div>
            <div id="backLayer-card-title">
                <div id="backLayer-Avatar-name-tags">
                    <img src="${postAvatarUrl}" class="waterfall-card-avatar">
                    <div class="waterfall-card-poster-tags">
                        <div class="waterfall-card-poster">${posterName}</div>
                        <div class="waterfall-card-tags">${tags}</div>
                    </div>
                 </div>
               <div><span class="iconfont icon-guanbi" id="backLayer-icon-guanbi"></span></div>
            </div>
            <div id="backLayer-comments-container">
            </div>
            </div>
             <div id="backlayer-footer">
                <div class="waterfall-card-footer">
                    <div class="waterfall-card-footer-icons">
                        <span class="iconfont icon-xihuan" cardID="${num}"></span>
                        <span class="iconfont icon-pinglun" type="backLayer" cardID="${num}"></span>
                        <span class="iconfont icon-sendfasong"></span>
                    </div>
                    <div class="waterfall-card-footer-likes">${likesNum} likes</div>
                    <div id="backlayer-poster-time">${postTime}</div>
                </div>

                <div class="waterfall-card-comment-writer">
                    <div class="iconfont icon-weixiao"></div>
                    <input type="text" value="Add a comment..." class="waterfall-comment-input" cardID="${num}">
                    <div class="waterfall-comment-post" type="backLayer">Post</div>
                </div>
            </div>
        </div>
    </div>
    `

    document.body.appendChild(backLayer);
    document.documentElement.style.overflowY = 'hidden';
    document.documentElement.style.overflowX = 'hidden';


    //assign event
    let like_btns = document.getElementsByClassName("icon-xihuan");
    let index = like_btns.length;
    addEvent(index, "backlayer");

    let close_btn = document.getElementById("backLayer-icon-guanbi");
    close_btn.addEventListener("click", function () {
        backLayer.remove();
        document.documentElement.style.overflowY = 'auto';
        document.documentElement.style.overflowX = 'auto';

        let emojyCon = document.getElementById("emojyContainer");
        let shareCon = document.getElementById("shareContainer");
        if (emojyCon != null) {
            emojyCon.remove();
        }
        if (shareCon != null) {
            shareCon.remove();
        }
    });

    //showComments(num);

    let titleHight = document.getElementById("backLayer-card-title").getBoundingClientRect().height;
    let footerHight = document.getElementById("backlayer-footer").getBoundingClientRect().height;
    let rigsideHight = document.getElementById("backLayer-left-container").getBoundingClientRect().height;
    let commentContainer = document.getElementById("backLayer-comments-container");
    commentContainer.style.height = `${rigsideHight - footerHight - titleHight}px`
}

function getDateTime() {
    let myDate = new Date();
    let YYYY_MM_DD = [myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate()].join("/");
    let HH_MM_SS = [myDate.getHours(),
    myDate.getMinutes(),
    myDate.getSeconds()].join(":");

    //console.log(YYYY_MM_DD + " " + HH_MM_SS);
    return YYYY_MM_DD + " " + HH_MM_SS;
}

function timeDelta() {
    let oldTime = new Date("2022/5/21 12:22:41");
    let current = new Date();
    let delta = (current - oldTime) / (1000 * 3600);
    deltaH = Math.round(delta)
    deltaD = Math.round(delta / 24)
    if (delta < 24) {
        return `${delta}h`
    } else {
        return `${deltaD}d`
    }
}

function ifInLikeList(num) {
    return new Promise(function (resolve) {
        let userName = localStorage.getItem("userName");
        idbKeyval.get(Number(num), imagesData).then(function (val) {
            if (val) {
                //console.log(val);
                let likelist = val["likes"];
                // console.log(likelist);
                // console.log(userName);
                if (likelist.includes(userName)) {
                    resolve(true)
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        })
    })
}