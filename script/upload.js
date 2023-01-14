import { uploadImage } from "./FB_storage.js";



let uploadArea = document.getElementById("upload-area");
let UploadCardList = [];

// set file selector to accept only images
let fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", () => {
    let file = fileInput.files[0];  // 获取选择的文件
    let imageUrl = URL.createObjectURL(file);  // 获取文件的 URL
    let name = file.name;  // 获取文件名
    let size = file.size / 1024 / 1024; // 获取文件大小,单位 byte
    size = size.toFixed(2); // 保留两位小数
    // console.log(imageUrl);
    // console.log(name);

    let card = new UploadCard(file, imageUrl, name, size);
    UploadCardList.push(card);
    console.log(UploadCardList.length);
});


// open file selector on div click
uploadArea.addEventListener("click", () => {
    if (currentCard !== null) {
        if (ifCardAvailable(currentCard)) {
            alert("Please add tags and description to the current card before uploading another card");
            return;
        }
    }
    fileInput.click();
}
);

function ifCardAvailable(card) {
    if (card.tags === null || card.desc === "") return false;
    return true;
}

// set tags input box
let currentCard = null;
let tagsInput = document.getElementById("tags-input");
// set tagsInput to disenable
tagsInput.disabled = true;

tagsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let inputVal = tagsInput.value;

        if (tagsInput.placeholder.includes("tags")) {
            addTags(inputVal);
        } else if (tagsInput.placeholder.includes("description")) {
            addDesc(inputVal);
        } else {
            console.log("error");
        }
    }
});

function addTags(inputVal) {
    let tags = inputVal.split(" ");
    let newTags = [];
    for (let tag of tags) {
        // if tag is not start with #, then add # to the start of the tag
        if (tag === "") continue;
        if (!/^#/.test(tag)) {
            tag = "#" + tag;
        }
        newTags.push(tag);
    }
    tagsInput.value = "";
    //console.log(newTags);

    if (currentCard) currentCard.updateTags(newTags);
}

function addDesc(inputVal) {
    if (inputVal) currentCard.updateDesc(inputVal);
}

tagsInput.addEventListener("blur", () => {
    tagsInput.disabled == true;
});

let tagsInputContainer = document.getElementById("tags-input-container");
tagsInputContainer.addEventListener("click", () => {
    if (tagsInput.disabled === true) {
        alert("Please select a card first.");
        return;
    }
});



// upload card
class UploadCard {
    constructor(file, imageUrl, fileName, size) {
        this.file = file;
        this.imageUrl = imageUrl;
        this.fileName = fileName;
        this.size = size + "MB";
        this.name = fileName.split(".")[0];
        this.type = fileName.split(".")[1];
        this.tags = [];
        this.desc = "";
        this.cardDom = null;
        this.createCard();
    }

    // create card
    createCard() {
        let card = document.createElement("div");
        card.classList.add("upload_card");
        // card.style.backgroundImage = `url(${this.imageUrl})`;
        card.innerHTML = `
            <img src="${this.imageUrl}" alt="" class="card_image">
            <div class="card-right">
                <div class="card-right-upper">
                    <span class="card-file-name">${this.fileName}</span>
                    <span class="delete-icon">×</span>
                </div>
                <div class="card-right-middle">
                    <div class="card_size">${this.size}</div>
                    <div class="card_icons">
                        <div class="card_tags"><i class="fa-solid fa-hashtag"></i></div>
                        <div class="card_desc"><i class="fa-regular fa-file-lines"></i></div>
                    </div>
                </div>
                
                <div class="card_progress">
                    <div class="card_progress_bar">
                        <div class="progress"></div>
                    </div>
                    <div class="card_progress_text">0%</div>
                </div>
            </div>
        `;

        this.cardDom = card;

        // set file name editable
        this.addFileNameEvent();

        // delete card
        this.addDeleteEvent();

        // add tags
        this.addTagsEvent();

        // add description
        this.addDescEvent();

        // add card to upload area
        document.getElementById("upload-list").appendChild(card);


    }


    addFileNameEvent() {
        const card = this.cardDom;
        let fileName = card.querySelector(".card-file-name");
        fileName.addEventListener("click", () => {
            // set as contenteditable
            fileName.setAttribute("contenteditable", "true");
        });

        fileName.addEventListener("blur", () => {
            fileName.setAttribute("contenteditable", "false");
            // if /\.\S*$/ is not matched, then add file type to the end of the file name
            if (!/\.\S*$/.test(fileName.innerText)) {
                fileName.innerText += "." + this.type;
            }
            this.fileName = fileName.innerText;
            this.name = this.fileName.split(".")[0];

            console.log("👉", this.fileName);
        });
    }

    addDeleteEvent() {
        const card = this.cardDom;
        let deleteIcon = card.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", () => {
            card.remove();
            // remove card from UploadCardList
            let index = UploadCardList.indexOf(this);
            UploadCardList.splice(index, 1);
        });

    }


    addTagsEvent() {
        const card = this.cardDom;
        currentCard = this;
        let cardImage = card.querySelector(".fa-hashtag");

        cardImage.addEventListener("click", () => {
            tagsInput.disabled = false;
            //focus on input box
            tagsInput.focus();
            // set placeholder
            tagsInput.setAttribute("placeholder", "Type the tags and press Enter to confirm.");
        });
    }

    addDescEvent() {
        const card = this.cardDom;
        currentCard = this;
        let cardDesc = card.querySelector(".fa-file-lines");
        cardDesc.addEventListener("click", () => {
            tagsInput.disabled = false;
            //focus on input box
            tagsInput.focus();
            // set placeholder
            tagsInput.setAttribute("placeholder", "Type the description and press Enter to confirm.");
        });
    }

    simulateProgress() {
        const card = this.cardDom;
        // 获得进度条的值
        const card_progress_text = card.querySelector(".card_progress_text");
        const progress = card.querySelector(".progress");


        let currentValue = 0;
        const interval = setInterval(() => {
            // 增加当前值
            currentValue += 10;
            // 更新进度条的当前值
            card_progress_text.innerHTML = currentValue + "%";
            // 更新进度元素的宽度
            progress.style.width = `${currentValue}%`;
            // 如果已经完成进度，清除 interval
            if (currentValue >= 100) {
                clearInterval(interval);
            }
        }, 100);
    }

    updateTags(tags) {
        this.tags = tags;
        if (tags.length === 0) {
            console.log("length is 0");
            this.cardDom.querySelector(".card_tags").classList.remove("card_icon_active");
        } else {
            console.log("length is not 0");
            this.cardDom.querySelector(".card_tags").classList.add("card_icon_active");
        }
    }

    updateDesc(desc) {
        this.desc = desc;
        if (desc.length === 0) {
            this.cardDom.querySelector(".card_desc").classList.remove("card_icon_active");
        } else {
            this.cardDom.querySelector(".card_desc").classList.add("card_icon_active");
        }
    }
}


// upload card
let uploadBtn = document.getElementById("upload-btn");
uploadBtn.addEventListener("click", () => {
    for (let card of UploadCardList) {
        if (card.imageUrl && card.fileName && card.tags && card.desc) {
            uploadImage(card)
        } else {
            alert("Error: Please fill in all the information.");
            return;
        }
    }
});

let testBtn = document.getElementById("test");
if (testBtn) {
    document.getElementById("test").addEventListener("click", () => {
        // for (let card of UploadCardList) {

        // }
        console.log(UploadCardList[0].tags);
        console.log(UploadCardList[0].desc);
    });
}
