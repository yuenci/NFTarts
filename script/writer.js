import { FBStore } from "./firebase/storeHandler.js";
import { timestampToDatetime } from "./article.js"

const fbStore = new FBStore();

window.onload = async function () {
    let uid = localStorage.getItem("uid");
    if (!adminList.includes(uid)) {
        window.location.href = "./login.html";
    };


    /* base on faierbase, no need use permission* */
    let data = await fbStore.readCollection("articles");
    console.log(data);

    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
        let key = keys[index];
        let artData = data[key];
        artData.key = key;
        creat_card1(artData);
    }

    // get table-container first child
    let table_container = document.getElementById("table-container");
    let first_child = table_container.children[0];
    first_child.click();
}

function creat_card1(data, time = new Date().toLocaleString(), bgc = "white") {

    let title = data.title;
    time = timestampToDatetime(data.timestamp.seconds);

    let key = data.key;

    let table_container = document.getElementById("table-container");
    let new_card = document.createElement("div")
    new_card.className = "writer-table-cards";
    new_card.style.background = bgc;
    new_card.innerHTML = `
    <div class="writer-table-cards-title-icon">
        <div class="writer-table-cards-title">${title}</div>
        <div><span class="iconfont icon-lajitong"></span></div>
    </div>
    <div class="writer-table-cards-time">${time}</div>
    `
    new_card.addEventListener("click", function () {
        document.querySelector("#title-text-input").value = title;
        document.querySelector("#title-text-type").value = data.type;
        document.querySelector("#title-text-publisher").value = data.poster;
        document.querySelector("#write-area-textarea").value = formatContentInTextArea(data.content);
    })
    if (table_container.children.length == 0) {
        table_container.appendChild(new_card)
    }
    else {
        let target = table_container.children[0]
        table_container.insertBefore(new_card, target)
    }

    //register delect event
    table_container.children[0].children[0].children[1].addEventListener("click", function (event) {
        //let key = this.parentNode.children[0].innerHTML;
        console.log(key);
        if (confirm("Are you sure you want to delete this file?")) {
            table_container.children[0].remove();
            fbStore.delete("articles", key);
        }
        event.stopPropagation();
    }, false)
}


function formatContentInTextArea(data) {
    let newData = "";

    for (let sentence of data) {
        newData += sentence + "\n\n";
    }
    return newData;
}

let post_btn = document.getElementById("writer-post-btn");
post_btn.addEventListener('click', function () {
    let title = document.querySelector("#title-text-input").value;
    let type = document.querySelector("#title-text-type").value;
    let poster = document.querySelector("#title-text-publisher").value;
    let content = document.querySelector("#write-area-textarea").value;

    if (title == "" || type == "" || poster == "" || content == "") {
        alert("Please fill in all the content!");
        return;
    }

    let contentArray = content.split("\n\n");
    let data = {
        title: title,
        type: type,
        poster: poster,
        content: contentArray,
        timestamp: new Date()
    }

    fbStore.write("articles", data);
    data.timestamp["seconds"] = Math.round(data.timestamp.getTime() / 1000);
    creat_card1(data);
});











/*
* old version base on local file system
*/

// window.onload = function () {
//     /* base on local file system, need use permission* */
//     // access default DB, loop for the permission
//     idbKeyval.entries().then(function (entries) {
//         if (entries.length > 0) {
//             for (let index = 0; index < entries.length; index += 2) {
//                 let title = entries[index][0]
//                 let time = entries[index + 1][1]
//                 creat_card(title, time)
//             }
//         }
//     })
//     checkAllPermission();
// }

function checkAllPermission() {
    idbKeyval.keys().then(function (keys) {
        console.log(keys.length);
        if (keys.length > 0) {
            for (let index = 0; index < keys.length; index += 2) {
                try {
                    idbKeyval.get(keys[index]).then(
                        async function (handle) {
                            // console.log(index);
                            // console.log(handle);
                            const options = {
                                mode: 'readwrite'
                            };
                            let res = (await handle.queryPermission(options)) === 'granted'
                            //let res = true;
                            redCard(handle.name, res);
                        }
                    );
                } catch {
                    //pass
                }

            }
        }
    });
}

function redCard(cardname, status) {

    let cards = document.getElementsByClassName("writer-table-cards-title")
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        if (element.innerHTML + ".html" == cardname) {
            if (status === false) {
                element.style.color = "red";
            } else {
                element.style.color = "black";
            }
        }
    }
}

document.getElementById("writer-container").style.height = document.body.clientHeight - 40 + "px";

// title
let title_input = document.getElementById("title-text-input");
title_input.onfocus = function () {
    if (title_input.value == "Title") {
        title_input.value = "";
    }
}
title_input.onblur = function () {
    if (title_input.value == "") {
        title_input.value = "Title";
    }
}

// type
let title_type = document.getElementById("title-text-type");
title_type.onfocus = function () {
    if (title_type.value == "Type") {
        title_type.value = "";
    }
}
title_type.onblur = function () {
    if (title_type.value == "") {
        title_type.value = "Type";
    }
}

// publisher
let title_publisher = document.getElementById("title-text-publisher");
title_publisher.onfocus = function () {
    if (title_publisher.value == "Publisher") {
        title_publisher.value = "";
    }
}
title_publisher.onblur = function () {
    if (title_publisher.value == "") {
        title_publisher.value = "Publisher";
    }
}

// textarea
let area_input = document.getElementById("write-area-textarea");
area_input.onfocus = function () {
    if (area_input.value == "Start to write something...") {
        area_input.value = "";
    }
}
area_input.onblur = function () {
    if (area_input.value == "") {
        area_input.value = "Start to write something...";
    }
}

// check if input info are empty
function ifEmpty() {
    let title_input_value = document.getElementById("title-text-input").value;
    let title_type_value = document.getElementById("title-text-type").value;
    let title_publisher_value = document.getElementById("title-text-publisher").value;
    let area_input_value = document.getElementById("write-area-textarea").value;

    if (title_input_value && title_type_value && title_publisher_value && area_input_value) {
        if (title_input_value != "Title" && title_type_value != "Type") {
            if (title_publisher_value != "Publisher" && area_input_value != "Start to write something...") {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }

    } else {
        return false
    }
}


// post btn click event
/*
let post_btn = document.getElementById("writer-post-btn");
post_btn.addEventListener('click', () => storeDBTODB());
post_btn.addEventListener('click', async function getNewFileHandle() {
    // store to local
    if (ifEmpty()) {
        const options = {
            suggestedName: `${title_input.value}.html`,
            //startIn: directoryHandle;
            types: [
                {
                    description: 'Html Files',
                    accept: {
                        'text/plain': ['.html'],
                    },
                },
            ],
        };
        let title_value = title_input.value;
        let time = new Date().toLocaleString()
        const handle = await window.showSaveFilePicker(options);
        const writable = await handle.createWritable();
        await writable.write(article_structure(area_input.value));
        await writable.close(title_input.value, handle);

        // save handle to db
        creat_card(title_value, time)
        idbKeyval.set(title_value, handle);
        idbKeyval.set(title_value + "-time", time);
    } else {
        alert("Please check if empty value exist")
    }


});
*/

function storeDBTODB() {
    if (ifEmpty()) {
        let articles = idbKeyval.createStore("articles-store", "articles")

        let time_List = new Date().toDateString().split(" ");
        let timeFormat = time_List[1] + " " + time_List[2] + "," + time_List[3];

        let data = {
            "Type": title_type.value,
            "Poster": title_publisher.value,
            "Date": timeFormat,
            "Title": title_value = title_input.value,
            "Address": `news/${title_value}.html`
        }

        idbKeyval.keys(articles).then(
            function (keys) {
                let length = keys.length;
                idbKeyval.set(length, data, articles);
            }
        );
    }
}

function article_structure(content) {
    let title_value = title_input.value;
    let time_List = new Date().toDateString().split(" ");
    let timeFormat = time_List[1] + " " + time_List[2] + "," + time_List[3];
    content = content.split("\n")
    paragraphList = [];

    for (let index = 0; index < content.length; index++) {
        if (content[index] != "") {
            content[index] = "<main>" + content[index] + "</main>"
            paragraphList.push(content[index])
        }
    }

    paragraphStr = paragraphList.join("\n")
    result = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name='type' content='${title_type.value}' >
            <meta name='publisher' content='${title_publisher.value}' >
            <title>${title_value}</title>
            <link rel="stylesheet" href="../style/template.css">
            <link rel="stylesheet" href="../style/style.css">
            <link rel="stylesheet" href="../style/iconfont.css">
            <link rel="stylesheet" href="../style/frame.css">
        </head>
            <body>
                <nav id="nav"></nav>
                <article>
                    ${paragraphStr}
                    <time>${timeFormat}</time>
                </article>
                <footer id="footer"></footer>
                <script src="../script/template.js"><\/script>
                <script src="../script/idb-keyval-min.js"></script>
            </body>
        </html>
         `
    return result;
}


// open btn
let write_open_btn = document.getElementById("writer-open-btn");
write_open_btn.addEventListener("click", async () => {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    let name = fileHandle.name.replace(".html", "");
    console.log(name);
    idbKeyval.set(name, fileHandle)
    let time = new Date().toLocaleString()
    idbKeyval.set(name + "-time", time)
    const contents = await file.text();
    [title, type, publisher, mainsStr] = parseDom(contents)
    title_input.value = title;
    title_type.value = type;
    title_publisher.value = publisher;
    area_input.value = mainsStr;
})

// table cards
function creat_card(title, time = new Date().toLocaleString(), bgc = "white") {
    let table_container = document.getElementById("table-container");
    let new_card = document.createElement("div")
    new_card.className = "writer-table-cards";
    new_card.style.background = bgc;
    new_card.innerHTML = `
    <div class="writer-table-cards-title-icon">
        <div class="writer-table-cards-title">${title}</div>
        <div><span class="iconfont icon-lajitong"></span></div>
    </div>
    <div class="writer-table-cards-time">${time}</div>
    `
    new_card.addEventListener("click", card_click)
    if (table_container.children.length == 0) {
        table_container.appendChild(new_card)
    }
    else {
        let target = table_container.children[0]
        table_container.insertBefore(new_card, target)
    }

    //register delect event
    table_container.children[0].children[0].children[1].addEventListener("click", function (event) {
        let key = this.parentNode.children[0].innerHTML;
        console.log(key);
        if (confirm("Are you sure you want to delete this file?")) {
            idbKeyval.del(key);
            idbKeyval.del(key + "-time");
            table_container.children[0].remove();
        }
        event.stopPropagation();
    }, false)
}

// for (let index = 0; index < 2; index++) {
//     creat_card("Title");
// }


// click card event
function card_click() {
    let key = this.children[0].children[0].innerHTML
    idbKeyval.get(key).then(async (val) => {
        if (await verifyPermission(val, true) === true) {
            fileHandle = val;
            const file = await fileHandle.getFile();
            // console.log(fileHandle);
            const contents = await file.text();
            let title, type, publisher, mainsStr;
            [title, type, publisher, mainsStr] = parseDom(contents)
            title_input.value = title;
            title_type.value = type;
            title_publisher.value = publisher;
            area_input.value = mainsStr;

            //area_input.value = contents;

            //store content
            storeArtle(title, type, publisher, mainsStr);
        }

    });
    checkAllPermission();
}

function parseDom(arg) {
    let objE = document.createElement("div");
    objE.innerHTML = arg;

    console.log(objE.children);
    let title_Index = -1;
    let type_Index = -1;
    let publish_Index = -1;
    let article_Index = -1;

    let children_List = objE.children;
    for (let index = 0; index < children_List.length; index++) {
        //console.log(children_List[index].localName);
        if (children_List[index].localName == "title") {
            title_Index = index;
            type_Index = index - 1;
            publish_Index = index - 2;
        }
        if (children_List[index].localName == "article") {
            article_Index = index;
        }

    }

    let title = objE.children[title_Index].innerText;
    let type = objE.children[type_Index].content;
    let publisher = objE.children[publish_Index].content;
    let main = [];
    let article = objE.children[article_Index]
    for (let index = 0; index < article.children.length - 1; index++) {
        main.push("    " + article.children[index].innerText)
    }
    let mainsStr = main.join("\n");
    return [title, type, publisher, mainsStr];
};

async function verifyPermission(fileHandle, readWrite) {
    const options = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
    }
    // Request permission. If the user grants permission, return true.
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
    }
    // The user didn't grant permission, so return false.
    return false;
}



let new_btn = document.getElementById("writer-new-btn");
new_btn.addEventListener("click", function () {
    title_input.value = "";
    title_type.value = "";
    title_publisher.value = "";
    area_input.value = "";
    //location.reload()
})

function storeArtle(title, type, publisher, mainsStr) {
    let obj = {
        type: type,
        publisher: publisher,
        mainsStr: mainsStr
    }

    let articles = idbKeyval.createStore("articles-store", "articles")
    idbKeyval.set(title, obj, articles)
}

let index_btn = document.getElementById("writer-index-btn");
index_btn.addEventListener("click", async function () {
    let articles = idbKeyval.createStore("articles-store", "articles")
    let keywords = {};
    idbKeyval.entries(articles).then(function (entries) {
        for (let index = 0; index < entries.length; index++) {
            let title = entries[index][0];
            let articleID = checkArticleID(title);
            //console.log(articleID);
            let content = entries[index][1]["type"] + " "
                + entries[index][1]["publisher"] + " "
                + entries[index][1]["mainsStr"]
            content = clearStr(content);
            contentKeys = content.split(" ");
            //console.log(contentKeys);

            for (let i = 0; i < contentKeys.length; i++) {
                const word = contentKeys[i].toLowerCase();
                if (word === "" || word === " ") {
                    continue;
                }
                // word exist
                if (keywords[word]) {
                    // if articleID exist in this word
                    if (keywords[word][articleID]) {
                        keywords[word][articleID] += 1;
                    } else {
                        // if articleID not exist in this word
                        keywords[word][articleID] = 1;
                    }
                } else {
                    // word not exist
                    keywords[word] = {}
                    keywords[word][articleID] = 1;
                }
            }
        }
    }).then(function () {
        idbKeyval.set("index.json", keywords, articles)
        // async function getNewFileHandle() {
        //     const options = {
        //         suggestedName: `index.json`,
        //         types: [
        //             {
        //                 description: 'Text Files',
        //                 accept: {
        //                     'text/plain': ['.json'],
        //                 },
        //             },
        //         ],
        //     };
        //     const handle = await window.showSaveFilePicker(options);
        //     const writable = await handle.createWritable();
        //     await writable.write(articles);
        //     await writable.close();
        // }
        alert("Built index successfully")
    });
})

function clearStr(str) {
    content = str.replaceAll("\n", " ")
    content = content.replaceAll(".", " ");
    content = content.replaceAll("-", " ");
    content = content.replaceAll(",", " ");
    content = content.replaceAll("“", " ");
    content = content.replaceAll("”", " ");
    content = content.replaceAll("…", " ");
    content = content.replaceAll("(", " ");
    content = content.replaceAll(")", " ");
    // content = content.replaceAll(" ", " ");
    // content = content.replaceAll(" ", " ");
    // content = content.replaceAll(" ", " ");
    return content
}

function checkArticleID(articleName) {
    let articleNum = Object.keys(articleObj).length;

    for (let index = 1; index <= articleNum; index++) {
        let articleTitle = articleObj[index]["Title"];
        if (articleTitle === articleName) {
            //console.log(index);
            return index
        }
    }
}


