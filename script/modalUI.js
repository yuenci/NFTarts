import { Modal } from "./profile.js";

class AlertModal extends Modal {
    constructor(type, message, title = "Alert") {
        super();
        this.title = "Alert";
        this.type = "alert";
        this.message = "This is an alert";
    }
}