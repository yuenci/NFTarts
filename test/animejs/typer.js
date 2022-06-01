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

window.onload = function () {
    typerStart();
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

