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
    //localStorage.setItem("userName", "innisv")
    setTestData()
    //console.log(getDateTime());
    //timeDelta();
    //console.log(commentsData);
}

var commentsData;
let commentsJsonDataInsert = document.createElement("script")
if (ifInNewFile()) {
    commentsJsonDataInsert.src = "../script/comment.json?callback=getAllDataJson"
} else {
    commentsJsonDataInsert.src = "../script/comment.json?callback=getAllDataJson"
}
commentsJsonDataInsert.type = "text/javascript";
document.body.appendChild(commentsJsonDataInsert);


function getAllDataJson(data) {
    commentsData = data;
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
                "dateTime": "2022/5/20 9:22:41"
            },
            2: {
                "userName": "yannisv",
                "comment": "2this is good pic2",
                "dateTime": "2022/5/21 10:22:41"
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
    for (let index = 1; index < 33; index++) {
        idbKeyval.set(index, commentsData[`${index}`], imagesData);
    }
}


window.onbeforeunload = function () {
    localStorage.setItem("userName", "-1");
};


var images;
let ImageJsonDataInsert = ""
if (ifInNewFile()) {
    ImageJsonDataInsert = "../script/images.json"
} else {
    ImageJsonDataInsert = "../script/images.json"
}
// ImageJsonDataInsert.type = "text/javascript";
// document.body.appendChild(ImageJsonDataInsert);


// function getJson(data) {
//     images = data;
// }

fetch(ImageJsonDataInsert)
    .then(response => response.json())
    .then(data => {
        images = data
    });


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

            let cardid = inputEle.getAttribute("cardid");
            addCommentToDB(Number(cardid), value);
            showNewCommentsNum(Number(cardid));

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

            if (comments.children.length === 0) {
                comments.appendChild(new_comment);
            } else {
                let firstCommment = comments.children[0];
                comments.insertBefore(new_comment, firstCommment)
            }

            let cardid = inputEle.getAttribute("cardid");
            addCommentToDB(Number(cardid), value);
            showNewCommentsNum(Number(cardid));

            // empty input
            inputEle.value = "";
            inputEle.focus();
            obj.style.color = "#b3dffc"
        })
    }

}

function addCommentToDB(cardid, comment) {
    let userName = localStorage.getItem("userName")
    let dataTime = getDateTime();
    // console.log(dataTime);

    idbKeyval.get(cardid, imagesData).then(
        function (val) {
            if (val) {
                let comments = val["comments"];
                let commentsNum = Object.keys(comments).length;
                comments[commentsNum + 1] = {
                    "userName": userName,
                    "comment": comment,
                    "dateTime": dataTime
                }
                val["comments"] = comments;
                idbKeyval.set(cardid, val, imagesData)
            } else {
                let template = {
                    "likes": [],
                    "comments": {
                        1: {
                            "userName": userName,
                            "comment": comment,
                            "dateTime": dataTime
                        }
                    }
                }
                idbKeyval.set(cardid, template, imagesData)
            }
        }
    );
}

async function showNewCommentsNum(cardid) {
    let commentsNum = await getCommentsNum(cardid);
    //console.log(commentsNum);
    let commentObj = document.getElementsByClassName("waterfall-card-footer-comments")[cardid - 1];
    commentObj.innerHTML = `View all ${commentsNum} comments`
}
function showComments(picid) {
    //let username = localStorage.getItem("userName").toLowerCase()
    let imagesData = idbKeyval.createStore("imagesData-store", "imagesData")

    idbKeyval.get(Number(picid), imagesData).then(
        function (data) {
            try {
                let comments = data["comments"];
                if (comments) {
                    let comNum = Object.keys(comments).length;
                    for (let index = comNum; index > 0; index--) {
                        let element = comments[index];
                        let username = element["userName"];
                        let time = timeDelta(element["dateTime"]);
                        insertComment(username, element["comment"], time);
                    }
                }
            }
            catch {
                return false;
            }
        }
    );

}
function insertComment(username, value, timeFormat) {
    let template = `
                <div class="backLayer-comment-avatar">${username.substring(0, 1).toUpperCase()}</div>
                <div class="backLayer-comment-name-time-content">
                    <span class="backLayer-comment-username">${username.toUpperCase()}</span>
                    <div class="backLayer-comment-content">${value}</div>
                    <div class="backLayer-comment-time">${timeFormat}</div>
                </div>
        `
    let comments = document.getElementById("backLayer-comments-container")
    let new_comment = document.createElement("div");
    new_comment.className = "backLayer-comment";
    new_comment.innerHTML = template;
    comments.appendChild(new_comment);
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

function removeImageSuffix(imageName) {
    // remove .jpg .png .gif use regex
    let imageData = imageName.replace(".jpg", "")
    imageData = imageName.replace(".gif", "")
    imageData = imageData.replace(".png", "")
    imageData = imageData.replace(/\.\S*$/, "");
    return imageData
}


function getImageData(num) {
    let description = images[num]["description"];
    let imageUrl = images[num]["imageUrl"];
    let tags = images[num]["tags"];
    //console.log(imageUrl);

    imageData = removeImageSuffix(imageUrl)
    imageData = imageData.split("-")

    //console.log(imageData);

    let posterName = imageData[1].toUpperCase();
    let postTime = imageData[2].toUpperCase();
    let postAvatarUrl = ""
    if (posterName === "INNIS") {
        postAvatarUrl = "../images/innis.jpg"
    } else if (posterName === "YANNIS") {
        postAvatarUrl = "../images/yannis.jpg"
    } else if (posterName === "PHEYMIN") {
        postAvatarUrl = "../images/pheymin.jpg"
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

    let like_btns = document.getElementsByClassName("love-icons");
    let like_btn = like_btns[index];
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


function createEmojyBarToBackLayer(x, y) {
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
    document.getElementById("waterfall-card-comment-writer").appendChild(emojyContainer)

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

        if (this.getAttribute("type") == "backLayer") {
            createEmojyBarToBackLayer(-50, -80)
        }
        else {
            let top = this.offsetTop;
            let left = this.getBoundingClientRect().left;
            createEmojyBar(top - 60, left - 93);
            //console.log("emojy!");
        }

        emojyTarget = this;
    });
}

async function likeClickEvent(obj) {
    // console.log(obj);
    let type = obj.getAttribute("type");
    obj.addEventListener("click", async function () {
        let cardid = obj.getAttribute("cardid");
        if (this.className == "iconfont icon-xihuan love-icons") {
            //add1
            if (confirmForm("Like this image? Get an account first!")) {
                this.className = "iconfont  icon-love love-icons"
                console.log("add-522");

                OperateLikeNum("add", Number(cardid));

                if (type) {
                    showNewLikesNum(Number(cardid), "backLayer");
                } else {
                    showNewLikesNum(Number(cardid));
                }

            }
        } else {
            //minus
            this.className = "iconfont icon-xihuan love-icons"
            await OperateLikeNum("minus", Number(cardid))
            if (type) {
                showNewLikesNum(Number(cardid), "backLayer");
            } else {
                showNewLikesNum(Number(cardid));
            }
        }
    })

    let cardid = obj.getAttribute("cardid")
    let res = await ifInLikeList(cardid)

    if (res) {
        obj.className = "iconfont  icon-love love-icons";
    }
}

function OperateLikeNum(type, cardid) {
    // type = add / minus;
    idbKeyval.get(cardid, imagesData).then(function (val) {
        let userName = localStorage.getItem("userName");
        if (val) {
            if (type === "add") {
                //console.log(val);
                let likelist = val["likes"];
                likelist.push(userName);
                val["likes"] = likelist;
                idbKeyval.set(cardid, val, imagesData);
            } else if (type === "minus") {
                //console.log("minus");
                if (val["likes"].length === 1) {
                    val["likes"] = [];
                } else {
                    let index = val["likes"].indexOf(userName);
                    val["likes"].splice(index, 1);
                }
                //console.log(val);
                idbKeyval.set(cardid, val, imagesData);
            }
        } else {
            if (type === "add") {
                //console.log("add empty");
                let template = {
                    "likes": [userName],
                    "comments": {}
                }
                idbKeyval.set(cardid, template, imagesData)
            }
        }
    });

    return new Promise(function (resolve) {
        resolve("done");
    })

}

async function showNewLikesNum(cardid, type = "card") {
    if (type === "backLayer") {
        let num = await getLikesNum(cardid);
        let eles = document.getElementsByClassName("waterfall-card-footer-likes");
        let el = eles[eles.length - 1];
        el.innerHTML = `${num} likes`
    } else {
        let num = await getLikesNum(cardid);
        let element = document.getElementsByClassName("waterfall-card-footer-likes")[cardid - 1];
        element.innerHTML = `${num} likes`
    }
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


function createShareBarIntoBackLayer(x, y) {
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



    document.getElementById("backlayer-footer").appendChild(shareContainer)

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


        if (this.getAttribute("type") == "backLayer") {
            createShareBarIntoBackLayer(-50, 40);
        }
        else {
            let top = this.parentNode.parentNode.offsetTop;
            let left = this.getBoundingClientRect().left;
            createShareBar(top - 60, left - 90)
        }
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
        <img src=".${imageUrl}" alt="" id="backLayer-main-image">
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
               <div><span class="iconfont icon-guanbi" id="backLayer-icon-guanbi" cardID="${num}"></span></div>
            </div>
            <div id="backLayer-comments-container">
            </div>
            </div>
             <div id="backlayer-footer">
                <div class="waterfall-card-footer">
                    <div class="waterfall-card-footer-icons">
                        <span class="iconfont icon-xihuan love-icons" type="backLayer" cardID="${num}"></span>
                        <span class="iconfont icon-pinglun" type="backLayer" cardID="${num}"></span>
                        <span class="iconfont icon-sendfasong" type="backLayer"></span>
                    </div>
                    <div class="waterfall-card-footer-likes">${likesNum} likes</div>
                    <div id="backlayer-poster-time">${postTime}</div>
                </div>

                <div class="waterfall-card-comment-writer" id="waterfall-card-comment-writer">
                    <div class="iconfont icon-weixiao" type="backLayer"></div>
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
    let like_btns = document.getElementsByClassName("love-icons");
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

        let cardid = close_btn.getAttribute("cardid");
        showNewLikesNum(Number(cardid));
        if (ifInLikeList) {
            console.log("yes");
            document.getElementsByClassName("love-icons")[cardid - 1].className = "iconfont  icon-love love-icons"
        } else {
            console.log("no");
            document.getElementsByClassName("love-icons")[cardid - 1].className = "iconfont icon-xihuan love-icons"
        }
    });

    let titleHight = document.getElementById("backLayer-card-title").getBoundingClientRect().height;
    let footerHight = document.getElementById("backlayer-footer").getBoundingClientRect().height;
    let rigsideHight = document.getElementById("backLayer-left-container").getBoundingClientRect().height;
    let commentContainer = document.getElementById("backLayer-comments-container");
    commentContainer.style.height = `${rigsideHight - footerHight - titleHight}px`

    showComments(num);
}

function getDateTime() {
    let myDate = new Date();
    let YYYY_MM_DD = [myDate.getFullYear(),
    myDate.getMonth() + 1,
    myDate.getDate()].join("/");
    let HH_MM_SS = [myDate.getHours(),
    myDate.getMinutes(),
    myDate.getSeconds()].join(":");

    //console.log(YYYY_MM_DD + " " + HH_MM_SS);
    return YYYY_MM_DD + " " + HH_MM_SS;
}

function timeDelta(time) {
    let oldTime = new Date(time);
    let current = new Date();
    let delta = (current - oldTime) / (1000 * 3600);
    deltam = Math.round(delta * 60)
    deltaH = Math.round(delta)
    deltaD = Math.round(delta / 24)
    if (delta < 1) {
        return `${deltam}m`
    }
    else if (delta < 24) {
        return `${deltaH}h`
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
                if (likelist.indexOf(userName) !== -1) {
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