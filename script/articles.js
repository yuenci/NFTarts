import { FBStore } from "./firebase/storeHandler.js";

let articleObj = {
    1: {
        "Type": "On-campus Activity",
        "Poster": "Jonathan Turner",
        "Date": "April 2, 2022",
        "Title": "NFT Arts Sharing Event at Asia Pacific University on May 1",
        "Address": "news/NFT Arts Sharing Event at Asia Pacific University on May 1.html"
    },
    2: {
        "Type": "About",
        "Poster": "Jonathan Turner",
        "Date": "March 14, 2022",
        "Title": "About NFTarts",
        "Address": "news/About NFTarts.html"
    },
    3: {
        "Type": "News",
        "Poster": "Jex Exmundo",
        "Date": "April 06, 2022",
        "Title": "The NFT Events You Won’t Want to Miss at Bitcoin 2022",
        "Address": "news/The NFT Events You Won’t Want to Miss at Bitcoin 2022.html"
    },
    4: {
        "Type": "Culture",
        "Poster": "Langston Thomas",
        "Date": "March 04, 2022",
        "Title": "The Best NFT Memes of 2022: February",
        "Address": "news/The Best NFT Memes of 2022_ February.html"
    },
    5: {
        "Type": "Guides",
        "Poster": "Langston Thomas",
        "Date": "May 12, 2022",
        "Title": "Every Generative Avatar Project You Need to Know",
        "Address": "news/Every Generative Avatar Project You Need to Know.html"
    },
    6: {
        "Type": "News",
        "Poster": "Rouwen Lin",
        "Date": "31 Mar 2022",
        "Title": "Kuala Lumpur to go digital with a major NFT festival in June",
        "Address": "news/Kuala Lumpur to go digital with a major NFT festival in June.html"
    },
    7: {
        "Type": "News",
        "Poster": "Andrew R.Chow",
        "Date": "22 March 2021",
        "Title": "NFTs Are Shaking Up the Art World—But They Could Change So Much More",
        "Address": "news/NFTs Are Shaking Up the Art World—But They Could Change So Much More.html"
    },
    8: {
        "Type": "Platform",
        "Poster": "Wikipedia",
        "Date": "13 May 2021",
        "Title": "Open Sea",
        "Address": "news/Open Sea.html"
    },
    9: {
        "Type": "Podcast",
        "Poster": "NFT Talk Show",
        "Date": "13 May 2021",
        "Title": "All relevent information to help you navigate your way in NFTs and Crypto",
        "Address": "news/All relevent information to help you navigate your way in NFTs and Crypto.html"
    },
    10: {
        "Type": "Journal",
        "Poster": "Egorithms",
        "Date": "13 May 2021",
        "Title": "How to Create NFT: Sell Crypto Art?",
        "Address": "news/How to Create NFT Sell Crypto Art.html"
    },
    11: {
        "Type": "Crypto Currency",
        "Poster": "Ethereum",
        "Date": "13 May 2021",
        "Title": "To make the NFTs have any value, they need Ethereum to give the collectible value",
        "Address": "news/To make the NFTs have any value, they need Ethereum to give the collectible value.html"
    },
    12: {
        "Type": "Crypto Currency",
        "Poster": "Ethereum",
        "Date": "28 February 2022",
        "Title": "Are NFTs The Future For The Art World?",
        "Address": "news/Are NFTs The Future For The Art World_.html"
    },
    13: {
        "Type": "Article",
        "Poster": "Claudia Khaw",
        "Date": "29 April 2022",
        "Title": "NFTs in M’sia this week: Fahmi Reza draws another monkey, dickhead NFTs trigger MCMC",
        "Address": "news/NFTs in M’sia this week Fahmi Reza draws another monkey, dickhead NFTs trigger MCMC.html"
    },
    14: {
        "Type": "Article",
        "Poster": "Creative Blog",
        "Date": "07 April 2022",
        "Title": "NFT art: how the future of NFTs will empower artists",
        "Address": "news/NFT art how the future of NFTs will empower artists.html"
    },
    15: {
        "Type": "Article",
        "Poster": "Crypto 2022",
        "Date": "30 April 2022",
        "Title": "Elon Musk NFT First to Enter Ukrainian Hall of Fame and You Can't Buy It",
        "Address": "news/Elon Musk NFT First to Enter Ukrainian Hall of Fame and You Can't Buy It.html"
    },
    16: {
        "Type": "Activity",
        "Poster": "Rebecca Burns",
        "Date": "23 April 2022",
        "Title": "PepsiCo launch new NFTs",
        "Address": "news/PepsiCo launch new NFTs.html"
    }
};



/////////////////////////
let news_container = document.getElementById("News-page-news-list-container");
let anchor = document.getElementById("news-cards-inser-anchor");

window.onload = function () {
    let articleIDList = localStorage.getItem("articleIDList");
    if (!articleIDList) {
        localStorage.setItem("articleKeyWord", "-1");
    }

    if (news_container != null) {
        loadNewsCards();
    }
}

function loadNewsCards() {
    let articleIDList = localStorage.getItem("articleIDList");
    if (articleIDList === "-1") {
        // get article from index
        loadNewsFromLocalIndex();

        // get article from DB
        loadNewsFromDB();

        // get article from Firebase
        loadNewsFromFirebase();

    } else {
        // get article from localStorage
        let articleIDs = articleIDList.split(",");
        //console.log(typeof articleIDs);
        for (let i = 0; i < articleIDs.length; i++) {
            creatNewsCard(articleObj[articleIDs[i]]);
        }
    }
}


function loadNewsFromLocalIndex() {
    let articleNum = Object.keys(articleObj).length;
    for (let index = 1; index < articleNum; index++) {
        creatNewsCard(articleObj[index]);
    }
}


function loadNewsFromDB() {
    let articles = idbKeyval.createStore("articles-store", "articles")
    idbKeyval.keys(articles).then(
        function (keys) {
            let length = keys.length;
            for (let index = 0; index < length; index++) {
                //
                idbKeyval.get(index, articles).then(
                    function (val) {
                        creatNewsCard(val);
                    }
                );

            }

        }
    );
}

function loadNewsFromFirebase() {
    const fbStore = new FBStore();
    fbStore.readCollection("articles").then(
        function (data) {
            let keys = Object.keys(data);
            for (let index = 0; index < keys.length; index++) {
                let DataObj = data[keys[index]];
                let cardData = {
                    "Type": DataObj["type"],
                    "Poster": DataObj["poster"],
                    "Date": timestampToDatetime(DataObj["timestamp"]["seconds"]),
                    "Title": DataObj["title"],
                    "Address": "html/article.html"
                }
                creatNewsCard(cardData, keys[index]);
            }
        }
    )
}

function timestampToDatetime(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    // let month as text not number
    switch (month) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
    }


    return day + " " + month + " " + year
}



function creatNewsCard(DataObj, articleKey) {
    let news_card = document.createElement("div");
    news_card.className = "news-card-container";
    news_card.innerHTML = `
        <span class="news-type">${DataObj["Type"]}</span>
        <span class="news-publisher">${DataObj["Poster"]}</span>
        <div class="news-title">${DataObj["Title"]}</div>
        <div class="news-datetime">${DataObj["Date"]}</div>
    `
    insertAfter(news_card, anchor);
    if (arguments.length == 1) {
        click_redirection1(news_card, DataObj["Address"])
    } else {
        click_redirection1(news_card, DataObj["Address"], articleKey)
    }

}


function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function click_redirection1(eleObj, url, articleKey) {
    url = "../" + url;

    if (eleObj == null) return;

    if (arguments.length == 1) {
        eleObj.addEventListener("click", function () {
            window.open(url, '_blank');
        })
    } else {
        eleObj.addEventListener("click", function () {
            localStorage.setItem("articleKey", articleKey);
            window.open(url, '_blank');
        })
    }
}

window.onbeforeunload = function () {
    if (document.title === "News") {
        localStorage.setItem("articleIDList", "-1");
        localStorage.setItem("articleKeyWord", "-1");
    }
};

