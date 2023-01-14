import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import firebaseConfig from "./config.js";

// For npm
/*
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
*/

export class Analysis {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.analytics = getAnalytics(this.app);
    }

    logEvent(eventName) {
        logEvent(this.analytics, eventName);
    }
}
