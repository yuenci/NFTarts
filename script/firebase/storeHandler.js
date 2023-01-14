import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection, addDoc, updateDoc, serverTimestamp, deleteDoc, getDoc, getDocs, where, query, orderBy }
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import firebaseConfig from "./config.js";

// for npm
/*
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, updateDoc, serverTimestamp, deleteDoc, getDoc, getDocs, where, query, orderBy } from "firebase/firestore";
*/

export class FBStore {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.isMerge = true; // true: merge / false: overwrite
        this.debug = false;
        this.useCache = true;
        this._cache = {};
    }

    write(collectionName, document, documentID) {
        if (documentID === undefined) documentID = ""; else documentID = documentID.toString();
        this.validateThreeParams(collectionName, document, documentID);
        return new Promise((resolve, reject) => {
            if (arguments.length === 2) {
                //  autoId
                addDoc(collection(this.db, collectionName), { ...document }).then((docRef) => {
                    if (this.debug) console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                });
            }
            else if (arguments.length === 3) {
                //  documentID  and merge / overwrite
                setDoc(doc(this.db, collectionName, documentID), { ...document }, { merge: this.isMerge }).then(() => {
                    if (this.debug) console.log(`"Document ${documentID} successfully written!"`);
                    return true;
                }).catch((error) => {
                    console.error(`Error writing document: ${documentID}`, error);
                    return false;
                });
            }
            else {
                reject("Invalid number of arguments, expected 2 or 3, got " + arguments.length);
            }
        });
    }

    readCollection(collectionName) {
        if (arguments.length !== 1) throw new Error("Invalid number of arguments, expected 1, got " + arguments.length);
        if (this.validate(collectionName) !== "string") throw new Error("Invalid collection name, expected string, got " + typeof collection);

        return new Promise((resolve, reject) => {
            try {
                getDocs(collection(this.db, collectionName)).then((querySnapshot) => {
                    const data = this.snapshotToObj(querySnapshot);
                    if (this.useCache) this.cache[collectionName] = data;
                    if (this.debug) console.log(`collect ${collectionName} data: `, data);
                    resolve(data);
                });
            } catch (error) {
                console.error(`Error reading collection: ${collectionName}`, error);
                reject(`Error reading collection: ${collectionName}`, error)
            }
        });
    }

    get cache() {
        return this._cache;
    }

    readDocument(collectionName, documentID) {
        if (arguments.length !== 2) throw new Error("Invalid number of arguments, expected 2, got " + arguments.length);
        if (this.validate(collectionName) !== "string") throw new Error("Invalid collection name, expected string, got " + typeof collection);

        documentID = documentID.toString();
        if (this.validate(documentID) !== "string") throw new Error("Invalid documentID, expected string, got " + typeof documentID);

        const docRef = doc(this.db, collectionName, documentID);

        // let docSnap = await getDoc(docRef);
        return new Promise((resolve, reject) => {
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    if (this.debug) console.log(`Document ${documentID} data:`, docSnap.data());
                    resolve(docSnap.data());
                } else {
                    if (this.debug) console.log(`No such document ${documentID}!`);
                    reject(`No such document ${documentID}!`);
                }
            }).catch((error) => {
                console.error(`Error reading document: ${documentID}`, error);
            });
        });
    }

    query(collectionName, queries, order) {
        if (arguments.length !== 2 && arguments.length !== 3) throw new Error("Invalid number of arguments, expected 2 or 3, got " + arguments.length);
        if (this.validate(collectionName) !== "string") throw new Error("Invalid collection name, expected string, got " + typeof collection);
        if (this.validate(queries) !== "object") throw new Error("Invalid queries, expected object, got " + typeof queries);

        if (arguments.length === 3) {
            if (this.validate(order) !== "object") throw new Error("Invalid order, expected object, got " + typeof order);
        }

        let q;

        if (this.validate(queries[0]) !== "object") queries = [queries];

        if (arguments.length === 2) {
            let queriesList = []
            for (let qurey of queries) {
                queriesList.push(where(qurey[0], qurey[1], qurey[2]));
                q = query(collection(this.db, collectionName), ...queriesList);
            }
        } else if (arguments.length === 3) {
            let queriesList = []
            for (let qurey of queries) {
                queriesList.push(where(qurey[0], qurey[1], qurey[2]));
                q = query(collection(this.db, collectionName), ...queriesList, orderBy(order[0], order[1]));
            }
        }
        return new Promise((resolve, reject) => {
            getDocs(q).then((querySnapshot) => {
                const data = this.snapshotToArray(querySnapshot);
                if (this.debug) console.log(`collect ${collectionName} data: `, data);
                resolve(data);
            }).catch((error) => {
                console.error(`Error reading collection: ${collectionName}`, error);
                reject(`Error reading collection: ${collectionName}`, error)
            });
        });
    }

    delete(collectionName, documentID) {
        if (arguments.length !== 2) throw new Error("Invalid number of arguments, expected 2, got " + arguments.length);
        if (this.validate(collectionName) !== "string") throw new Error("Invalid collection name, expected string, got " + typeof collection);

        documentID = documentID.toString();
        if (this.validate(documentID) !== "string") throw new Error("Invalid documentID, expected string, got " + typeof documentID);

        return new Promise((resolve, reject) => {
            deleteDoc(doc(this.db, collectionName, documentID)).then(() => {
                if (this.debug) console.log(`Document ${documentID} successfully deleted!`);
                resolve(true);
            }).catch((error) => {
                console.error(`Error removing document: ${documentID}`, error);
                reject(false);
            });
        });
    }

    update(collectionName, document, documentID) {
        if (documentID === undefined) documentID = ""; else documentID = documentID.toString();
        this.validateThreeParams(collectionName, document, documentID);

        const docRef = doc(this.db, collectionName, documentID);

        return new Promise((resolve, reject) => {
            updateDoc(docRef, { ...document }).then(() => {
                if (this.debug) console.log(`Document successfully ${documentID} updated!`);
                resolve(true);
            }).catch((error) => {
                console.error(`Error updating document: ${documentID}`, error);
                reject(false);
            });
        });
    }

    addNum(collectionName, documentID, fieldName, number) {
        if (arguments.length !== 4) throw new Error("Invalid number of arguments, expected 4, got " + arguments.length);
        if (this.validate(collectionName) !== "string") throw new Error("Invalid collection name, expected string, got " + typeof collection);
        if (this.validate(documentID) !== "string") throw new Error("Invalid documentID, expected string, got " + typeof documentID);
        if (this.validate(fieldName) !== "string") throw new Error("Invalid fieldName, expected string, got " + typeof fieldName);
        if (typeof number !== "number") throw new Error("Invalid number, expected number, got " + typeof number);

        const docRef = doc(this.db, collectionName, documentID);

        const data = {
            [fieldName]: increment(number)
        }
        return new Promise((resolve, reject) => {
            updateDoc(docRef, data).then(() => {
                if (this.debug) console.log(`Document : ${documentID} successfully updated!`);
                resolve(true);
            }).catch((error) => {
                console.error(`Error updating document: ${documentID}`, error);
                reject(false);
            });
        });
    }

    addOne(collectionName, documentID, fieldName) {
        return this.addNum(collectionName, documentID, fieldName, 1)
    }

    getCache(collectionName) {
        return new Promise((resolve, reject) => {
            if (this.cache[collectionName] !== undefined) {
                if (this.debug) console.log(`collect ${collectionName} data: `, this.cache[collectionName]);
                resolve(this.cache[collectionName]);
            } else {
                reject(`No such collection ${collectionName}!`);
            }
        });
    }

    getServerTimestamp() {
        return serverTimestamp();
    }

    validate(param) {
        // is param is an object
        if (typeof param === "object") return "object";

        // is param is a string
        if (typeof param === "string") return "string";
    }

    validateThreeParams(collectionName, document, documentID) {
        if (arguments.length !== 3) throw new Error("Invalid number of arguments, expected 3, got " + arguments.length);

        if (this.validate(collectionName) !== "string") throw new Error("Invalid collection name, expected string, got " + typeof collection);

        if (this.validate(document) !== "object") throw new Error("Invalid document, expected object, got " + typeof document);

        if (this.validate(documentID) !== "string") throw new Error("Invalid documentID, expected string, got " + typeof documentID);
    }

    snapshotToObj(snapshot) {
        const obj = {};
        snapshot.forEach(doc => {
            obj[doc.id] = doc.data();
        });
        return obj;
    }

    snapshotToArray(snapshot) {
        const arr = [];
        snapshot.forEach(doc => {
            arr.push(doc.data());
        });
        return arr;
    }
}


// TODO 增加缓存机制，如果存在缓存，优先使用缓存
// TODO 提供刷新缓存的方法
