window.onload = function () {


    //addACard(1);
    addACard(6);
    let btn = document.createElement("button");
    btn.id = "testid";
    btn.innerHTML = "Click";
    btn.style.position = "fixed";
    btn.style.top = "200px"
    document.body.appendChild(btn);
    // btn.addEventListener("click", test_btn_even)
}


let images = {
    1: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/1-innis-may 20 2022.jpg",
        "description": "this is a description"
    },
    2: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/2-yannis-may 20 2022.jpg",
        "description": "this is a description"
    },
    3: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/3-pheymin-may 20 2022.jpg",
        "description": "this is a description"
    },
    4: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/4-innis-may 20 2022.jpg",
        "description": "this is a description"
    },
    5: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/5-yannis-may 20 2022.jpg",
        "description": "this is a description"
    },
    6: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/6-phyemin-may 20 2022.jpg",
        "description": "this is a description"
    },
    7: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/7-innis-may 20 2022.jpg",
        "description": "this is a description"
    },
    8: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/8-yannis-may 20 2022.jpg",
        "description": "this is a description"
    },
    9: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/9-pheymin-may 20 2022.jpg",
        "description": "this is a description"
    },
    10: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/10-innis-may 20 2022.png",
        "description": "this is a description"
    },
    11: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/11-yannis-may 20 2022.png",
        "description": "this is a description"
    },
    12: {
        "tags": "#tag1 #tag2 #tag3",
        "imageUrl": "./images/NFT/12-pheymin-may 20 2022.jpg",
        "description": "this is a description"
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
    obj.addEventListener("click", function () {
        let comments = obj.parentNode.previousElementSibling;
        let inputEle = obj.previousElementSibling
        let value = inputEle.value;
        let username, timeFormat;
        if (!isNull(value)) {
            let date = new Date();
            username = "Innis"
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
}
//./images/NFT/1-innis-may 20 2022.jpg
//addACard("tagsssss", "./images/NFT/12-pheymin-may 20 2022.jpg", "999", "sdasdsadsadsads", "99999");
function addACard(num) {
    if (!images[num]) {
        return false
    }
    let likesNum = 9999;
    let commentsNum = 99;


    let description = images[num]["tags"];
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
    console.log(posterName);
    console.log(postAvatarUrl);
    console.log(imageUrl);

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
                <span class="iconfont icon-xihuan"></span>
                <span class="iconfont icon-pinglun"></span>
                <span class="iconfont icon-sendfasong"></span>
            </div>
            <div class="waterfall-card-footer-likes">${likesNum} likes</div>
            <div class="waterfall-card-footer-description">${description}</div>
            <div class="waterfall-card-footer-comments">View all ${commentsNum} comments</div>
        </div>
        <div class="waterfall-card-comments">
        </div>

        <div class="waterfall-card-comment-writer">
            <div class="iconfont icon-weixiao"></div>
            <input type="text" value="Add a comment..." class="waterfall-comment-input">
            <div class="waterfall-comment-post">Post</div>
        </div>
    `
    let new_card = document.createElement("div")
    new_card.className = "waterfall-card";
    new_card.innerHTML = template;
    document.body.appendChild(new_card);

    addEvent(num);
}

function addEvent(index) {
    index = index - 1;
    let comment_inputs = document.getElementsByClassName("waterfall-comment-input");
    let input = comment_inputs[index];
    inputEvent(input);

    let post_btns = document.getElementsByClassName("waterfall-comment-post");
    let post_btn = post_btns[index];
    postBtnEvent(post_btn);
}

let imageID = 2;



// window.addEventListener("wheel", function (e) {
//     let evt = e || window.event;
//     evt.preventDefault();
//     if (evt.deltaY > 0) {
//         console.log("down");
//         if (ifEnterClientTotally(imageID)) {
//             addACard(imageID + 1);
//             imageID += 1;
//         }
//     } else {
//         console.log("up");
//     }
// }, {
//     passive: false
// });
document.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        //console.log('down');
        if (ifEnterClientTotally(imageID)) {
            addACard(imageID + 1);
            imageID += 1;
        }
    } else {
        //console.log('up');
    }
})


function ifEnterClientTotally(num) {
    num = num - 1;
    let cliH = document.documentElement.clientHeight;

    let cards = document.getElementsByClassName("waterfall-card");
    if (!cards[num]) {
        return false;
    }
    let bot = cards[num].getBoundingClientRect().bottom;
    if (bot < cliH) {
        return true;
    } else {
        return false;
    }
}