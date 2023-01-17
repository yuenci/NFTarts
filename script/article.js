import { FBStore } from "./firebase/storeHandler.js";

window.onload = async function () {
    let articleKey = localStorage.getItem("articleKey");
    const fbStore = new FBStore();
    let data = await fbStore.readDocument("articles", articleKey)
    console.log(data);

    document.querySelector("title").innerHTML = data.title;

    let article = document.querySelector("article");

    let mains = data.content;
    console.log(mains);
    for (let main of mains) {
        let mainTag = document.createElement("main");
        mainTag.innerHTML = main;
        article.appendChild(mainTag);
    }

    let time = timestampToDatetime(data.timestamp.seconds);
    let timeDev = document.createElement("time");
    timeDev.innerHTML = time;
    article.appendChild(timeDev);
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


    return month + " " + day + "," + year
}
