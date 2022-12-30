import { uploadImage } from "./storage.js";


let uploadArea = document.getElementById("upload-area");

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

    let card = new UploadCard(imageUrl, name, size);
    UploadCardList.push(card);
});


// open file selector on div click
uploadArea.addEventListener("click", () => {
    fileInput.click();
}
);

// set tags input box
let currentCard = null;
let tagsInput = document.getElementById("tags-input");
// set tagsInput to disenable
tagsInput.disabled = true;

tagsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let tags = tagsInput.value.split(" ");
        newTags = [];
        for (let tag of tags) {
            // if tag is not start with #, then add # to the start of the tag
            if (!/^#/.test(tag)) {
                tag = "#" + tag;
            }
            newTags.push(tag);
        }
        tagsInput.value = "";
        console.log(newTags);

        if (currentCard) currentCard.tags = newTags;
    }
});

let tagsInputContainer = document.getElementById("tags-input-container");
tagsInputContainer.addEventListener("click", () => {
    if (tagsInput.disabled === true) {
        alert("Please select a card first.");
        return;
    }
});

let UploadCardList = [];

// upload card
class UploadCard {
    constructor(imageUrl, fileName, size) {
        this.imageUrl = imageUrl;
        this.fileName = fileName;
        this.size = size + "MB";
        this.name = fileName.split(".")[0];
        this.type = fileName.split(".")[1];
        this.tags = [];
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
                
                <div class="card_size">${this.size}</div>
                <div class="card_progress">
                    <div class="card_progress_bar"></div>
                    <div class="card_progress_text">0%</div>
                </div>
            </div>
        `;

        // set file name editable
        this.addFileNameEvent(card);

        // delete card
        this.addDeleteEvent(card);

        // add tags
        this.addTagsEvent(card);

        // add card to upload area
        document.getElementById("upload-list").appendChild(card);
    }


    addFileNameEvent(card) {
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

    addDeleteEvent(card) {
        let deleteIcon = card.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", () => {
            card.remove();
        });
    }

    addTagsEvent(card) {
        let cardImage = card.querySelector(".card_image");

        cardImage.addEventListener("click", () => {
            tagsInput.disabled = false;
            //focus on input box
            tagsInput.focus();
            // set placeholder
            tagsInput.setAttribute("placeholder", "Type the tags and press Enter to confirm.");
        });
    }
}


// upload card
let uploadBtn = document.getElementById("upload-btn");
uploadBtn.addEventListener("click", () => {
    for (let card of UploadCardList) {
        if (card.imageUrl && card.fileName) {
            uploadImage(card.fileName, card.imageUrl)
        } else {
            alert("Error: Upload failed.");
            return;
        }
    }
});


/*
let progress = card.querySelector(".card_progress_bar");
        let progressText = card.querySelector(".card_progress_text");
        let progressValue = 0;
        let progressInterval = setInterval(() => {
            if (progressValue >= 100) {
                clearInterval(progressInterval);
                return;
            }
            progressValue += 1;
            progress.style.width = progressValue + "%";
            progressText.innerText = progressValue + "%";
        }, 50);


*/