import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll }
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import firebaseConfig from "./config.js";


// for npm
/*
import { initializeApp } from 'firebase/app'
import { getStorage  } from "firebase/storage";
*/

export class FBStorage {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.storage = getStorage(this.app);
        this.debug = false;
    }


    uploadFile(file, fileName) {
        return new Promise((resolve, reject) => {
            if (arguments.length !== 2) reject("Must provide file and fileName  2 arguments, " + arguments.length + " provided");
            const storageRef = ref(this.storage, fileName);
            uploadBytes(storageRef, file)
                .then((snapshot) => {
                    if (this.debug) console.log(`Uploadeding ${fileName}`);
                    getDownloadURL(snapshot.ref).then((url) => {
                        if (this.debug) console.log(`Uploaded ${fileName} successfully, url:`, url);
                        resolve(url);
                    });
                })
                .catch((error) => {
                    if (this.debug) console.log(error.code, error.message);
                    reject(error);
                });
        })
    }

    uploadFileWithRandomName(file, fileName) {
        return new Promise((resolve, reject) => {
            const timeStamp = Date.now().toString();
            this.uploadFile(file, timeStamp + fileName).then((url) => {
                resolve(url);
            }).catch((error) => {
                if (this.debug) console.log(error.code, error.message);
                reject(error);
            });
        })
    }

    deleteFile(fileName) {
        return new Promise((resolve, reject) => {
            if (arguments.length !== 1) reject("Must provide fileName as 1 argument, " + arguments.length + " provided");
            const desertRef = ref(this.storage, fileName);
            deleteObject(desertRef).then(() => {
                if (this.debug) console.log("File deleted successfully");
                resolve(true);
            }).catch((error) => {
                if (this.debug) console.log(error.code, error.message);
                reject(error);
            });
        })
    }

    async getAllFiles() {
        let images = {};
        const listRef = ref(this.storage, "/");
        let res = await listAll(listRef);
        console.log(res.items);
        for (let itemRef of res.items) {
            let url = await getDownloadURL(itemRef);
            let name = itemRef._location.path_;
            console.log(name);
            images[name] = url;
        }
        return new Promise((resolve, reject) => {
            resolve(images);
        })
    }
}


