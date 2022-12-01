window.onbeforeunload = function () {
    // if (ifInNewFile()) {
    //     console.log(ifInNewFile());
    //     localStorage.setItem("articleIDList", "-1");
    //     localStorage.setItem("articleKeyWord", "-1");
    // }
};


window.onload = function () {
    let scriptTags = document.getElementsByTagName("script")
    let fileUrl = scriptTags[0].baseURI;
    let args = fileUrl.split("/")
    if (ifIndex()) {
        typerStart();
    }
    if (ifInNewFile()) {
        let keyword = localStorage.getItem("articleKeyWord");
        setHeightKeyWord(keyword);
    }

    //writeIndexToDB();
    add_social_icons();
};


let jsonDataInsert = document.createElement("script")
function ifIndex() {
    let scriptTags = document.getElementsByTagName("script")
    let fileUrl = scriptTags[0].baseURI;
    let args = fileUrl.split("/");

    if (args[args.length - 2].toLowerCase() == "nftarts" || args[args.length - 2] == "index.html") {
        return true;
    }

    return false;
}



if (ifIndex()) {
    jsonDataInsert.src = "script/index.json?callback=getJson"
} else {
    jsonDataInsert.src = "../script/index.json?callback=getJson"
}
jsonDataInsert.type = "text/javascript";
document.body.appendChild(jsonDataInsert);

function getJson(data) {
    //console.log(data);
    localStorage.setItem("indexJson", JSON.stringify(data));
}




let slogan = {
    1: {
        1: "Make It",
        2: "Happen",
        3: "Shock Everyone"
    },
    2: {
        1: "Good Thing",
        2: "Just",
        3: "Got Unique"
    }
}

let sen_1 = document.getElementById("page1-upper-text1")
let sen_2 = document.getElementById("page1-upper-text2")
let sen_3 = document.getElementById("page1-upper-text3")

function inserContent(obj, str) {
    return new Promise(function (resolve) {
        let positionID = 0;
        let lengthNum = str.length;
        var myVar = setInterval(function () {
            if (positionID < lengthNum + 1) {
                obj.innerHTML = str.substring(0, positionID) + "|"
                positionID += 1
            } else {
                obj.innerHTML = str;
                clearInterval(myVar);
                resolve("done");
            }
        }, 80);
    })
}
function deleteContent(obj, str) {
    return new Promise(function (resolve) {

        let lengthNum = str.length;
        var myVar = setInterval(function () {
            if (lengthNum >= 0) {
                obj.innerHTML = str.substring(0, lengthNum) + "|"
                lengthNum -= 1
            } else {
                obj.innerHTML = "&nbsp;"
                clearInterval(myVar);
                resolve("done");
            }
        }, 30);
    })
}


async function typerStart() {
    await inserContent(sen_1, slogan[1][1]);
    await inserContent(sen_2, slogan[1][2]);
    await inserContent(sen_3, slogan[1][3]);
    await deleteContent(sen_1, slogan[1][1]);
    await inserContent(sen_1, slogan[2][1]);
    await deleteContent(sen_2, slogan[1][2]);
    await inserContent(sen_2, slogan[2][2]);
    await deleteContent(sen_3, slogan[1][3]);
    await inserContent(sen_3, slogan[2][3]);
}


function setHeightKeyWord(keyword) {
    var target = document.body.querySelectorAll("article")[0]
    if (target) {
        let tempHTML = target.innerHTML;
        var replaceText = "<font style='background-color:yellow;'>$1</font>";
        var r = new RegExp("(" + keyword + ")", "ig");
        tempHTML = tempHTML.replace(r, replaceText);
        target.innerHTML = tempHTML;
    }
}


if (document.getElementById("nav") != null) {
    document.getElementById("nav").innerHTML = `
<div id="nav-container">
    <div class="nav-ele" id="logo">NFTarts</div>
    <div id="nav-search-menu">
        <div class="nav-ele" id="search">
            <span class="iconfont icon-sousuo"></span>
        </div>
        <div class="nav-ele" id="menu">
            <span class="iconfont icon-caidan"></span>
        </div>
    </div>
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
            <div class="webItem">Gallery</div>
            <div class="webItem">About Us</div>
            <div class="webItem">Contact Us</div>
        </div>
        <div id="join">
            <div id="join-text">Come to join us! We are always looking for exploring the beauty of NFT with you.
            </div>
            <button class="btn-black w-120" id="join-btn">Join Us</button>
        </div>
    </div>
    <div id="footer-line"></div>
    <div id="footer-bottom">
        <div id="copyright">© 2022 FDD Team2</div>
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

// button event
function click_redirection(eleObj, url) {
    if (eleObj === null) return;

    if (url.substring(0, 8) == "https://" || url.substring(0, 7) == "http://") {
        eleObj.addEventListener("click", function () {
            window.location.href = url;
        })
        return;
    }

    let scriptTags = document.getElementsByTagName("script")
    let fileUrl = scriptTags[0].baseURI;
    let args = fileUrl.split("/")
    if (args[args.length - 2] == "news") {
        url = "../" + url;
    }

    if (args[args.length - 2] == "html") {
        url = "../" + url;
    }

    if (eleObj != null) {
        eleObj.addEventListener("click", function () {
            //console.log(url);
            window.location.href = url;
        })
    }
}



let logoObj = document.getElementById("logo")
click_redirection(logoObj, "index.html")

let sccript = document.getElementsByTagName("script")

if (document.getElementById("search")) {
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("menu").addEventListener("click", menu);
}
//search()
function search() {
    document.documentElement.style.overflowY = 'hidden';
    let shadow = document.createElement("div");
    let wh = Math.max(
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    let ht = document.documentElement.clientHeight;
    shadow.id = "shadow";
    shadow.style.background = "#262c30";
    shadow.innerHTML = `
       <div id="nav-container">
            <div class="nav-ele" id="search-page-logo" style="color:white;">NFTarts</div>
            <div id="search-page-close-menu">
                <div class="nav-ele" id="search-page-search-menu">
                    <span class="iconfont icon-caidan" id="page-menu-icon" style="color:white;"></span>
                </div>
                <div class="nav-ele" id="search-page-guanbi-icon">
                    <span class="iconfont icon-guanbi" style="color:white; font-size: 25px" id="close-icon"></span>
                </div>
            </div>
        </div>
        <div id="input-cotainer">
            <input type="text" id="search-input" value="Search">
            <span class="iconfont icon-sousuo" id="search-page-search-icon"></span>
        </div>
    `;
    shadow.style.position = "fixed";
    shadow.style.top = "0px";
    shadow.style.left = "0px";
    shadow.style.height = 0 + "px";
    shadow.style.width = wh + "px";
    shadow.style.overflowY = 'hidden';
    document.body.appendChild(shadow);

    anime({
        targets: "#shadow",
        height: ht,
        easing: 'easeInQuart',
        duration: 300
    })

    init_serch_page();

    let social_sidebar = document.getElementById("social-icons-side")
    if (social_sidebar) {
        social_sidebar.remove();
    }
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
    serch_input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "Enter") {
            document.getElementById("search-page-search-icon").click();
        }
    });

    let close_icon = document.getElementById("close-icon");
    close_icon.addEventListener("click", close_search);
    function close_search() {
        new Promise(function (resolve) {
            anime({
                targets: "#shadow",
                height: 0,
                easing: 'easeInQuart',
                duration: 300
            });
            setTimeout(function () {
                resolve("done")
            }, 300);
        }).then(function () {
            document.getElementById("shadow").remove()
            document.documentElement.style.overflowY = 'scroll';
            add_social_icons();
        })
    }

    let menu_icon = document.getElementById("page-menu-icon");
    menu_icon.addEventListener("click", show_menu);
    function show_menu() {
        document.getElementById("shadow").remove();
        menu();
    }

    let logo_btn = document.getElementById("search-page-logo");
    logo_btn.addEventListener("click", function () {
        let scriptTags = document.getElementsByTagName("script")
        let fileUrl = scriptTags[0].baseURI;
        let args = fileUrl.split("/")
        let url = "index.html";
        if (args[args.length - 2] == "news") {
            url = "../" + url;
        }
        window.location.href = url;
    });

    let search_btn = document.getElementById("search-page-search-icon");
    search_btn.addEventListener("click",
        function () {
            let searchContent = document.getElementById("search-input").value;
            console.log(searchContent);
            //console.time("search");
            let index = JSON.parse(localStorage.getItem("indexJson"));
            if (index[searchContent]) {
                let targetObj = index[searchContent];
                let articleIDList = Object.keys(targetObj)
                localStorage.setItem("articleIDList", articleIDList);
                localStorage.setItem("articleKeyWord", searchContent);

            } else {
                localStorage.setItem("articleIDList", "");
                localStorage.setItem("articleKeyWord", "");
            }
            let scriptTags = document.getElementsByTagName("script")
            let fileUrl = scriptTags[0].baseURI;
            let args = fileUrl.split("/")
            let url = "news.html";
            if (args[args.length - 2] == "news") {
                url = "../" + url;
            }
            window.location.href = url;
        });
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
    let ht = document.documentElement.clientHeight;
    shadow.id = "shadow";
    shadow.style.background = "#262c30";
    shadow.innerHTML = `
        <div id="nav-container">
            <div class="nav-ele" id="logo" style="color:white;">NFTarts</div>
            <div id="menu-page-close-search">
                <div class="nav-ele" id="menu-page-search-icon">
                    <span class="iconfont icon-sousuo" id="page-search-icon" style="color:white;margin-left:8px"></span>
                </div>
                <div class="nav-ele" id="menu-page-guanbi-icon">
                    <span class="iconfont icon-guanbi" style="color:white; font-size: 25px" id="close-icon"></span>
                </div>
            </div>
        </div>
        <div id="menu-container">
            <div id="menu-line1" class="menu-line"></div>
            <div id="menu-explore">EXPLORE NFT WORLD</div>
            <div id="menu-news" class="menu-main-text">NEWS</div>
            <div id="menu-gallery" class="menu-main-text">Gallery</div>
            <div id="menu-contact" class="menu-main-text">CONTACT US</div>
            <div id="menu-join" class="menu-main-text">JOIN</div>
            <div id="menu-login" class="menu-main-text">LOG IN</div>
            <div id="menu-line2" class="menu-line"></div>
            <div id="menu-footer">
                <div id="menu-faq" class="menu-footer-items">FAQ</div>
                <div id="menu-media" class="menu-footer-items">MEDIA</div>
                <div id="menu-about" class="menu-footer-items">ABOUT</div>
            </div>
        </div>
    `;
    shadow.style.position = "fixed";
    shadow.style.top = "0px";
    shadow.style.left = "0px";
    shadow.style.height = 0 + "px";
    shadow.style.width = wh + "px";
    shadow.style.overflowY = 'hidden';
    document.body.appendChild(shadow);

    menuStyle();

    anime({
        targets: "#shadow",
        height: ht,
        easing: 'easeInQuart',
        duration: 300
    })


    init_menu_page();

    let social_sidebar = document.getElementById("social-icons-side")
    if (social_sidebar) {
        social_sidebar.remove();
    }
}

function menuStyle() {
    let height = document.documentElement.clientHeight;

    let menu_container = document.getElementById("menu-container");
    let menu_explore = document.getElementById("menu-explore");
    let menu_line2 = document.getElementById("menu-line2");
    let menu_footer = document.getElementById("menu-footer");

    if (height < 550) {
        let texts = [document.getElementById("menu-news"), document.getElementById("menu-gallery"),
        document.getElementById("menu-contact"), document.getElementById("menu-join"),
        document.getElementById("menu-login"),]
        for (let index = 0; index < texts.length; index++) {
            const element = texts[index];
            element.style.fontSize = "30px"
        }
        menu_container.style.top = "20px";
        menu_explore.style.margin = "20px auto 20px auto";
        menu_line2.style.marginTop = "20px";
        menu_footer.style.margin = "20px auto 20px auto";
    } else if (height < 650) {
        menu_container.style.top = "20px";
        menu_explore.style.margin = "20px auto 20px auto";
        menu_line2.style.marginTop = "20px";
        menu_footer.style.margin = "20px auto 20px auto";
    } else if (height < 780) {
        menu_explore.style.margin = "20px auto 20px auto";
        menu_line2.style.marginTop = "20px";
    }
}

function init_menu_page() {
    let close_icon = document.getElementById("close-icon");
    close_icon.addEventListener("click", close_search);
    function close_search() {
        document.getElementById("shadow").remove()
        document.documentElement.style.overflowY = 'scroll';
        add_social_icons();
    }

    let search_icon = document.getElementById("page-search-icon");
    search_icon.addEventListener("click", show_search);
    function show_search() {
        document.getElementById("shadow").remove();
        search();
    }

    let login_btn = document.getElementById("menu-login");
    click_redirection(login_btn, "login.html")

    let menu_itemNames = ["menu-news", "menu-gallery", "menu-contact", "menu-join",
        "menu-login", "menu-faq", "menu-about"]
    let menu_item_url = ["html/news.html", "html/gallery.html", "html/contactUs.html", "html/joinUs.html",
        "html/login.html", "html/FAQ.html", "html/aboutUs.html"]
    for (let index = 0; index < menu_itemNames.length; index++) {
        const element = menu_itemNames[index];
        let obj = document.getElementById(element)
        click_redirection(obj, menu_item_url[index])
    }

    let media_btn = document.getElementById("menu-media");
    media_btn.onclick = function () {
        if (confirm("Need NFT media resources? Contact us!")) {
            if (ifInNewFile()) {
                window.location.href = "../contactUs.html";
            } else {
                window.location.href = "./contactUs.html";
            }
        }
    }

}

window.onresize = function () {
    let wh = document.documentElement.scrollWidth
    let shadow = document.getElementById("shadow");
    if (shadow != null) {
        shadow.style.width = wh + "px";
    }
    let social_sidebar = document.getElementById("social-icons-side");
    if (document.documentElement.clientWidth < 1000) {
        if (social_sidebar) {
            social_sidebar.remove();
        }
    } else {
        if (!social_sidebar) {
            add_social_icons();
        }
    }
}



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

let backToNew = document.getElementById("newsText");
click_redirection(backToNew, "html/news.html")


//  right side social icons part
function add_social_icons() {
    let sideFixedIcon = document.createElement("div");
    sideFixedIcon.innerHTML = `
    <div id="social-icons-side">
        <span class="iconfont icon-facebook-fill icon-side" id="side-icon-facebook"></span>
        <span class="iconfont icon-instagram-fill icon-side" id="side-icon-instagram"></span>
        <span class="iconfont icon-twitter icon-side" id="side-icon-twitter"></span>
        <span class="iconfont icon-linkedin-fill icon-side" id="side-icon-linkedin"></span>
        <span class="iconfont icon-whatsapp icon-side" id="side-icon-whatsapp"></span>
    </div>
`
    if (document.documentElement.clientWidth > 1000) {
        let title = document.title;
        if (title != "News Writer" && title != "NFT Arts Show") {
            document.body.appendChild(sideFixedIcon)
        }
    }
    sidebarEvent();
};





if (document.getElementById("side-icon-facebook") != null) {
    sidebarEvent();
}

function sidebarEvent() {
    let facebook_side_icon = document.getElementById("side-icon-facebook")
    if (facebook_side_icon === null) return;
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




let join_btn = document.getElementById("join-btn");
click_redirection(join_btn, "html/joinUs.html")
let policy_btn = document.getElementById("policy");
click_redirection(policy_btn, "html/policy.html")
let apu_logo_btn = document.getElementById("apu-logo");
click_redirection(apu_logo_btn, "https://www.apu.edu.my/")

let webItems_btns = document.getElementsByClassName("webItem");
let webItems_urls = ["html/news.html", "html/gallery.html", "html/aboutUs.html", "html/contactUs.html"]
for (let index = 0; index < webItems_btns.length; index++) {
    let element = webItems_btns[index];
    let url = webItems_urls[index];
    click_redirection(element, url)
}

let apuItems_btns = document.getElementsByClassName("apuItem");
let apuItems_urls = ["https://www.apu.edu.my/",
    "https://www.apu.edu.my/our-courses/undergraduate-studies/school-computing-technology/bsc-hons-software-engineering",
    "https://www.studentaffairs.apu.edu.my/clubs-societies/societies-sigs/",
    "https://www.apu.edu.my/life-apu/student-life-apu"]
for (let index = 0; index < apuItems_btns.length; index++) {
    let element = apuItems_btns[index];
    let url = apuItems_urls[index];
    click_redirection(element, url)
}
if (document.getElementById("social-icons") != null) {
    let social_icons = document.getElementById("social-icons").children;
    let social_icons_webs = ["https://www.facebook.com/",
        "https://www.instagram.com/",
        "https://twitter.com/home",
        "https://www.linkedin.com/",
        "https://web.whatsapp.com/"];
    for (let index = 0; index < social_icons.length; index++) {
        let element = social_icons[index];
        let url = social_icons_webs[4 - index];
        click_redirection(element, url)
    }
}


let page1_contact_btn = document.getElementById("page1-upper-right-text3");
click_redirection(page1_contact_btn, "html/contactUs.html")

let page4_contact_btn = document.getElementById("page4-card1-btn");
click_redirection(page4_contact_btn, "contactUs.html")


let page4_join_btn = document.getElementById("page4-card2-btn");
click_redirection(page4_join_btn, "joinUs.html")

let page8_news_bar = document.getElementById("page8-bar");
click_redirection(page8_news_bar, "news.html")

let page1_card1_text = document.getElementById("page1-lower-card1-activityName");
click_redirection(page1_card1_text, "news/NFT Arts Sharing Event at Asia Pacific University on May 1.html")

let page1_card2_text = document.getElementById("page1-lower-card2-activityName");
click_redirection(page1_card2_text, "news/Kuala Lumpur to go digital with a major NFT festival in June.html")

let page2_btn = document.getElementById("page2-textBox-btn1");
click_redirection(page2_btn, "news/About NFTarts.html");

let page3_title = document.getElementById("page3-title")
click_redirection(page3_title, "news/Are NFTs The Future For The Art World_.html")
let page3_btn = document.getElementById("page3-btn");
click_redirection(page3_btn, "news/The NFT Events You Won’t Want to Miss at Bitcoin 2022.html");

let page4_card3 = document.getElementById("page4-card3-text");
click_redirection(page4_card3, "news/The Best NFT Memes of 2022_ February.html");


let page4_card4 = document.getElementById("page4-card4-text");
click_redirection(page4_card4, "news/Every Generative Avatar Project You Need to Know.html");

let page5_title = document.getElementById("page5-title")
click_redirection(page5_title, "news/Are NFTs The Future For The Art World_.html")
let page5_btn = document.getElementById("page5-btn");
click_redirection(page5_btn, "news/NFTs Are Shaking Up the Art World—But They Could Change So Much More.html");

let page6_card1_text = document.getElementById("page6-card1-text")
click_redirection(page6_card1_text, "news/Open Sea.html")

let page6_card2_text = document.getElementById("page6-card2-text")
click_redirection(page6_card2_text, "news/All relevent information to help you navigate your way in NFTs and Crypto.html")

let page6_card3_text = document.getElementById("page6-card3-text")
click_redirection(page6_card3_text, "news/How to Create NFT Sell Crypto Art.html")

let page6_card4_text = document.getElementById("page6-card4-text")
click_redirection(page6_card4_text, "https://www.youtube.com/watch?v=0pWTRsztTtY")

let page6_card5_text = document.getElementById("page6-card5-text")
click_redirection(page6_card5_text, "news/To make the NFTs have any value, they need Ethereum to give the collectible value.html")

let page7_title = document.getElementById("page7-title")
click_redirection(page7_title, "news/Are NFTs The Future For The Art World_.html")
let page7_btn = document.getElementById("page7-btn");
click_redirection(page7_btn, "news/Are NFTs The Future For The Art World_.html")

let page8_card1_text = document.getElementById("page8-card1-text")
click_redirection(page8_card1_text, "https://open.spotify.com/episode/6qyyCaka365swtq3C6HJLJ?si=6gq9fGz1TW2d7v0wJkpYPQ")

let page8_card2_text = document.getElementById("page8-card2-text")
click_redirection(page8_card2_text, "news/NFTs in M’sia this week Fahmi Reza draws another monkey, dickhead NFTs trigger MCMC.html")

let page8_card3_text = document.getElementById("page8-card3-text")
click_redirection(page8_card3_text, "http://shorturl.at/mnzS2")

let page8_card4_text = document.getElementById("page8-card4-text")
click_redirection(page8_card4_text, "news/NFT art how the future of NFTs will empower artists.html")

let page8_card5_text = document.getElementById("page8-card5-text")
click_redirection(page8_card5_text, "http://shorturl.at/qtAS0")

let page8_card6_text = document.getElementById("page8-card6-text")
click_redirection(page8_card6_text, "news/Elon Musk NFT First to Enter Ukrainian Hall of Fame and You Can't Buy It.html")


function ifInNewFile() {
    let scriptTags = document.getElementsByTagName("script")
    let fileUrl = scriptTags[0].baseURI;
    let args = fileUrl.split("/")
    if (args[args.length - 2] == "news") {
        return true;
    } else {
        return false;
    }
}

function addAnime() {
    let scriptTags = document.getElementsByTagName("script")
    let fileUrl = scriptTags[0].baseURI;
    let args = fileUrl.split("/");
    //console.log(args);
    let jstag = document.createElement("script");

    if (args[args.length - 2].toLowerCase() == "nftarts" || args[args.length - 2] == "index.html") {
        return;
    }

    jstag.src = "../script/anime.min.js";
    document.body.appendChild(jstag);
}
addAnime();

// let error_page_back_btn = document.getElementById("Error-page-btn")
// click_redirection(error_page_back_btn, "index.html")


let copyright = document.getElementById("copyright")
click_redirection(copyright, "html/404.html")





