if (document.getElementById("nav") != null) {
    document.getElementById("nav").innerHTML = `
<div id="nav-container">
    <div class="nav-ele" id="logo">NFTarts</div>
    <div class="nav-ele" id="search">
        <span class="iconfont icon-sousuo"></span>
    </div>
    <div class="nav-ele" id="menu">
        <span class="iconfont icon-caidan"></span>
    </div>
    <div id="nav-room"></div>
</div>
`;
}

if (document.getElementById("footer") != null) {
    document.getElementById("footer").innerHTML = `
<div id="footer-container">
    <div id="footer-container1">
        <div id="hello-container">
            <div id="hello">Say Hello</div>
        </div>
        <div id="social-icons">
            <span class="iconfont icon-whatsapp"></span>
            <span class="iconfont icon-linkedin-fill"></span>
            <span class="iconfont icon-twitter"></span>
            <span class="iconfont icon-instagram-fill"></span>
            <span class="iconfont icon-facebook-fill"></span>
        </div>
    </div>
    <div id="footer-container2">
        <div id="apuItems">
            <div class="apuItem" id="apuItem1">APU</div>
            <div class="apuItem">APU FDD</div>
            <div class="apuItem">APU Club</div>
            <div class="apuItem">APU Event</div>
        </div>

        <div id="webItems">
            <div class="webItem">News</div>
            <div class="webItem">About Us</div>
            <div class="webItem">Contact Us</div>
            <div class="webItem">Follow Us</div>
        </div>
        <div id="join">
            <div id="join-text">Come to join us! We are always looking for exploring the beauty of NFT with you.
            </div>
            <button class="btn-black w-120" id="join-btn">Join Us</button>
        </div>
    </div>
    <div id="footer-line"></div>
    <div id="footer-bottom">
        <div id="copyright">© 2022</div>
        <div id="policy">PRIVACY & COOKIES POLICY</div>
        <div id="apu-logo">
            <div id="apu-log-a">A</div>
            <div id="apu-log-space1"></div>
            <div id="apu-log-p">P</div>
            <div id="apu-log-space2"></div>
            <div id="apu-log-u">U</div>
            <div id="apu-log-line"></div>
            <div id="apu-log-text1">ASIA PACIFIC UNIVERSITY</div>
            <div id="apu-log-text2">OF TECHNOLOGY & INNOVATION</div>
        </div>
    </div>
</div>
`;
}



document.getElementById("search").addEventListener("click", search);
document.getElementById("menu").addEventListener("click", menu);
//search()
function search() {
    document.documentElement.style.overflowY = 'hidden';
    let shadow = document.createElement("div");
    let wh = Math.max(
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    let ht = document.body.clientHeight;
    shadow.id = "shadow";
    shadow.style.background = "#262c30";
    shadow.innerHTML = `
       <div id="nav-container">
            <div class="nav-ele" id="logo" style="color:white;">NFTarts</div>
            <div class="nav-ele" id="search-page-guanbi-icon">
                <span class="iconfont icon-guanbi" style="color:white; font-size: 25px" id="close-icon"></span>
            </div>
            <div class="nav-ele" id="search-page-search-menu">
                <span class="iconfont icon-caidan" id="page-menu-icon" style="color:white;"></span>
            </div>
            <div id="nav-room"></div>
        </div>
        <div id="input-cotainer">
            <input type="text" id="search-input" value="Search">
            <span class="iconfont icon-sousuo" id="search-page-search-icon"></span>
        </div>
    `;
    shadow.style.position = "fixed";
    shadow.style.top = "0px";
    shadow.style.left = "0px";
    shadow.style.height = ht + "px";
    shadow.style.width = wh + "px";
    shadow.style.overflowY = 'hidden';
    document.body.appendChild(shadow);
    init_serch_page();
}

function init_serch_page() {
    let serch_input = document.getElementById("search-input");
    serch_input.onfocus = function () {
        if (serch_input.value == "Search") {
            serch_input.value = "";
            serch_input.style.color = "white";
        }

    }
    serch_input.onblur = function () {
        if (serch_input.value == "") {
            serch_input.value = "Search";
            serch_input.style.color = "#fbef53";
        }
    }

    let close_icon = document.getElementById("close-icon");
    close_icon.addEventListener("click", close_search);
    function close_search() {
        document.getElementById("shadow").remove()
        document.documentElement.style.overflowY = 'scroll';
    }

    let menu_icon = document.getElementById("page-menu-icon");
    menu_icon.addEventListener("click", show_menu);
    function show_menu() {
        document.getElementById("shadow").remove();
        menu();
    }
}
//menu()
function menu() {
    document.documentElement.style.overflowY = 'hidden';
    let shadow = document.createElement("div");
    let wh = Math.max(
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    let ht = document.body.clientHeight;
    shadow.id = "shadow";
    shadow.style.background = "#262c30";
    shadow.innerHTML = `
        <div id="nav-container">
            <div class="nav-ele" id="logo" style="color:white;">NFTarts</div>
            <div class="nav-ele" id="search-page-guanbi-icon">
                <span class="iconfont icon-guanbi" style="color:white; font-size: 25px" id="close-icon"></span>
            </div>
            <div class="nav-ele" id="search-page-search-menu">
                <span class="iconfont icon-sousuo" id="page-search-icon" style="color:white;margin-left:8px"></span>
            </div>
            <div id="nav-room"></div>
        </div>
        <div id="menu-container">
            <div id="menu-line1" class="menu-line"></div>
            <div id="menu-explore">EXPLORE NFT WORLD</div>
            <div id="menu-aboutUs" class="menu-main-text">ABOUT US</div>
            <div id="menu-news" class="menu-main-text">NEWS</div>
            <div id="menu-contact" class="menu-main-text">CONTACT US</div>
            <div id="menu-join" class="menu-main-text">JOIN</div>
            <div id="menu-news" class="menu-main-text">LOG IN</div>
            <div id="menu-line2" class="menu-line"></div>
            <div id="menu-footer">
                <div id="menu-faq" class="menu-footer-items">FAQ</div>
                <div id="menu-media" class="menu-footer-items">MEDIA</div>
                <div id="menu-follow" class="menu-footer-items">FOLLOW</div>
            </div>
        </div>
    `;
    shadow.style.position = "fixed";
    shadow.style.top = "0px";
    shadow.style.left = "0px";
    shadow.style.height = ht + "px";
    shadow.style.width = wh + "px";
    shadow.style.overflowY = 'hidden';
    document.body.appendChild(shadow);

    init_menu_page();

}

function init_menu_page() {
    let close_icon = document.getElementById("close-icon");
    close_icon.addEventListener("click", close_search);
    function close_search() {
        document.getElementById("shadow").remove()
        document.documentElement.style.overflowY = 'scroll';
    }

    let search_icon = document.getElementById("page-search-icon");
    search_icon.addEventListener("click", show_search);
    function show_search() {
        document.getElementById("shadow").remove();
        search();
    }
}
// window.onresize = function () {
//     console.log(document.documentElement.clientWidth);
// }

window.onresize = function () {
    let wh = document.documentElement.scrollWidth
    let shadow = document.getElementById("shadow");
    if (shadow != null) {
        shadow.style.width = wh + "px";
    }
}


// window.οnresize = function () {
//     console.log("yes");
//     let wh = Math.max(
//         document.body.scrollHeight, document.documentElement.scrollWidth,
//         document.body.offsetHeight, document.documentElement.offsetWidth,
//         document.body.clientHeight, document.documentElement.clientWidth
//     );
//     let ht = document.body.clientHeight;
//     let shadow = document.getElementById("shadow");
//     shadow.style.height = ht + "px";
//     shadow.style.width = wh + "px";
// }



let apuItems = document.getElementsByClassName("apuItem");
for (i = 0; i < apuItems.length; i++) {
    apuItems[i].addEventListener("mouseover", lightDotLeft);
    apuItems[i].addEventListener("mouseout", () => document.getElementById("dot").remove());
}
let webItem = document.getElementsByClassName("webItem");
for (i = 0; i < webItem.length; i++) {
    webItem[i].addEventListener("mouseover", lightDotLeft);
    webItem[i].addEventListener("mouseout", () => document.getElementById("dot").remove());
}

function lightDotLeft() {
    let x = this.offsetTop;
    let y = this.offsetLeft;
    let dot = document.createElement("div")
    dot.innerHTML = "";
    dot.id = "dot"
    dot.style.cssText = "height:5px;width:5px";
    dot.style.backgroundColor = "#fbef53";
    document.body.appendChild(dot);
    dot.style.position = "absolute";
    dot.style.top = `${x + 10}px`;
    dot.style.left = `${y - 20}px`;
}
if (document.getElementById("social-icons") != null) {
    let socialIcons = document.getElementById("social-icons").childNodes;
    for (i = 0; i < socialIcons.length; i++) {
        socialIcons[i].addEventListener("mouseover", lightDotBottom);
        socialIcons[i].addEventListener("mouseout", () => document.getElementById("dot").remove());
    }
}


function lightDotBottom() {
    let x = this.offsetTop;
    let y = this.offsetLeft;
    let dot = document.createElement("div")
    dot.innerHTML = "";
    dot.id = "dot"
    dot.style.cssText = "height:5px;width:5px";
    dot.style.backgroundColor = "#fbef53";
    document.body.appendChild(dot);
    dot.style.position = "absolute";
    dot.style.top = `${x + 35}px`;
    dot.style.left = `${y + 12}px`;
    console.log("bottom");
}


let article = document.getElementsByTagName("article");
if (article.length > 0) {
    let articleTitle = document.createElement("div")
    articleTitle.innerHTML = document.title;
    document.body.insertBefore(articleTitle, article[0]);
    articleTitle.id = "articleTitle";
}

let articleTitle = document.getElementById("articleTitle");
if (articleTitle != null) {
    let backToNewsList = document.createElement("div")
    backToNewsList.innerHTML = `
        <div id="backToNews">
            <span class="iconfont icon-zuosanjiaoxing" id="back-to-news-icon"></span>
            <span id="newsText">News</span>
        </div>
    `;
    backToNewsList.id = "backToNewsList";
    document.body.insertBefore(backToNewsList, articleTitle);
}
if (document.getElementById("side-icon-facebook") != null) {
    let facebook_side_icon = document.getElementById("side-icon-facebook")
    let instagram_side_icon = document.getElementById("side-icon-instagram")
    let twitter_side_icon = document.getElementById("side-icon-twitter")
    let linkedin_side_icon = document.getElementById("side-icon-linkedin")
    let whatsapp_side_icon = document.getElementById("side-icon-whatsapp")
    facebook_side_icon.addEventListener("click", function () {
        console.log(facebook_side_icon);
        window.open(`https://www.facebook.com/sharer.php?title=${document.title}&u=http://nftart.com/news/${document.title}`, '_blank');
    });
    twitter_side_icon.addEventListener("click", function () {
        console.log(facebook_side_icon);
        window.open(`https://twitter.com/share?text=${document.title}&url=http://nftart.com/news/${document.title}`, '_blank');
    });
    instagram_side_icon.addEventListener("click", function () {
        console.log(facebook_side_icon);
        window.open(`https://www.instagram.com/`, '_blank');
    });
    linkedin_side_icon.addEventListener("click", function () {
        console.log(facebook_side_icon);
        window.open(`http://www.linkedin.com/shareArticle?url==http://nftart.com/news/${document.title}`, '_blank');
    });
    whatsapp_side_icon.addEventListener("click", function () {
        console.log(facebook_side_icon);
        window.open(`https://web.whatsapp.com/`, '_blank');
    });
}


