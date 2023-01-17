import { FBAuth } from "../script/firebase/authHandler.js";
import { FBStore } from "../script/firebase/storeHandler.js";


const auth = new FBAuth();
const fbStore = new FBStore();



const addBtn = document.getElementById("add");
addBtn.addEventListener("click", () => {

    let caption = document.getElementById("caption").value;
    let tags = document.getElementById("tags").value.split(" ");
    for (let i = 0; i < tags.length; i++) {
        if (!tagValid(tags[i])) {
            alert("Invalid tag: " + tags[i]);
            return;
        }
    }

    let data = {
        imageUrl: "https://picsum.photos/500",
        caption: "this is caption",
        tags: ["#tag1", "#tag2"],
        uid: "asdasd",
        likes: ["asdsad1", "asdasd2"],
        comments: {},
        uid: localStorage.getItem("uidView")
    }

    fbStore.write("images", data).then(() => {
        console.log("success");
    });
});

function tagValid(tag) {
    // use regex to check if tag is valid
    let regex = new RegExp("^#[a-zA-Z0-9]+$");
    return regex.test(tag);
}

function addImage() {

}

// {
//     imageUrl: ""
//     caption: ""
//     tags: []
//     "likes": [],
//         "comments": { },
// }


console.log(Math.round(new Date().getTime() / 1000));