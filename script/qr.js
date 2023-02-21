window.onload = function () {
    const switcher = document.getElementById("bgc__swicher");
    addBtns(switcher);
    makeQR();
    downloadBtnInit();
}

function makeQR() {
    document.getElementById("user-name").innerHTML = localStorage.getItem("userName");
    const container = document.getElementById("qrcode");
    const qr = new QRCode(container, {
        text: "https://yuenci.github.io/NFTarts/index.html",
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function addBtns(dom) {
    const container = document.getElementById("qr__container");

    let btns = [];
    let colors = ["orange", "purple", "blue", "green", "gray"]
    for (let i = 0; i < 5; i++) {
        let btn = document.createElement("button");
        btn.classList.add("bgc__swicher__btn");
        btn.classList.add("qr__container-" + colors[i]);
        btn.addEventListener("click", function () {
            // set class attribute
            container.setAttribute("class", "");
            container.classList.add("qr__container-" + colors[i]);
        });
        btns.push(btn);
    }
    for (let i = 0; i < btns.length; i++) {
        dom.appendChild(btns[i]);
    }
}

function downloadBtnInit() {
    const btn = document.getElementById("download-btn");
    const username = document.getElementById("user-name").innerHTML;
    btn.addEventListener("click", function () {
        let qrnode = document.getElementById("qr__box__left")
        domtoimage.toBlob(qrnode)
            .then(function (blob) {
                window.saveAs(blob, `${username}-qr.png`);
            });
    });
}