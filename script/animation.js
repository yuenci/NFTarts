//“Make it happen. Shock everyone.”

window.onload = function () {
    let firtLine = document.getElementById("page1-upper-text1");
    let secondLine = document.getElementById("page1-upper-text2");
    let thirdLine = document.getElementById("page1-upper-text3");

    secondLine.style.color = "white";
    thirdLine.style.color = "white";

    setTimeout(function () {
        firtLine.innerHTML = "|"
    }, 200);
    setTimeout(function () {
        firtLine.innerHTML = " "
    }, 400);
    setTimeout(function () {
        firtLine.innerHTML = "|"
    }, 600);
    setTimeout(function () {
        firtLine.innerHTML = " "
    }, 800);

    let firstLineWordList = ["M", "Ma", "Mak|",
        "Make", "Make |", "Make i", "Make it|"];
    let firstLineNum = 0
    let timer1 = setInterval(function () {

        if (firstLineNum == 7) {
            clearInterval(timer1)
        } else {
            firtLine.innerHTML = firstLineWordList[firstLineNum];
            firstLineNum += 1;
        }
    }, 150);

    let secondLineWordList = ["H", "Ha", "Hap|",
        "Happ", "Happn|"];
    let secondLineNum = 0
    let timer2 = setInterval(function () {
        secondLine.style.color = "black";
        if (secondLineNum == 5) {
            clearInterval(timer2)
        } else {
            secondLine.innerHTML = secondLineWordList[secondLineNum];
            secondLineNum += 1;
        }
    }, 150);
}

