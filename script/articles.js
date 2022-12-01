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



function creatNewsCard(DataObj) {
    let news_card = document.createElement("div");
    news_card.className = "news-card-container";
    news_card.innerHTML = `
        <span class="news-type">${DataObj["Type"]}</span>
        <span class="news-publisher">${DataObj["Poster"]}</span>
        <div class="news-title">${DataObj["Title"]}</div>
        <div class="news-datetime">${DataObj["Date"]}</div>
    `
    insertAfter(news_card, anchor);
    click_redirection1(news_card, DataObj["Address"])
}
function creat_news_card(type, poster, date, title) {
    let result = `
    <div class="news-card-container">
        <span class="news-type">${type}</span>
        <span class="news-publisher">${poster}</span>
        <div class="news-title">${title}</div>
        <div class="news-datetime">${date}</div>
    </div>
    `
    return result
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function click_redirection1(eleObj, url) {
    let scriptTags = document.getElementsByTagName("script")
    let fileUrl = scriptTags[0].baseURI;
    let args = fileUrl.split("/")
    if (args[args.length - 2] == "news") {
        url = "../" + url;
    }
    if (eleObj != null) {
        eleObj.addEventListener("click", function () {
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

