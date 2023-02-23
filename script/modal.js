export class Modal {
    constructor() {
        this.modal = document.getElementById("modal");
        this.modalContent = "";
    }

    showModal() {
        this.modal.classList.remove("hidden");
        let scrollTop = document.documentElement.scrollTop;
        this.modal.style.top = scrollTop + "px";
        Scroll.disableScroll();
        this.modal.addEventListener("click", (e) => {
            if (e.target.id === "modal") {
                this.hideModal();
            }
        });
    }

    hideModal() {
        this.modal.classList.add("hidden");
        this.modal.innerHTML = "";
        Scroll.enableScroll();
    }
}

export class Scroll {
    static keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    static supportsPassive = false;
    static wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    static wheelOpt = { passive: false };

    static preventDefault(e) {
        e.preventDefault();
    }

    static preventDefaultForScrollKeys(e) {

        if (Scroll.keys[e.keyCode]) {
            Scroll.preventDefault(e);
            return false;
        }
    }

    constructor() {
        try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get: () => {
                    Scroll.supportsPassive = true;
                },
            }));
        } catch (e) { }

        Scroll.wheelOpt = Scroll.supportsPassive ? { passive: false } : false;
    }

    // call this to Disable
    static disableScroll() {
        window.addEventListener("DOMMouseScroll", Scroll.preventDefault, { passive: false }); // older FF
        window.addEventListener(Scroll.wheelEvent, Scroll.preventDefault, Scroll.wheelOpt); // modern desktop
        window.addEventListener("touchmove", Scroll.preventDefault, Scroll.wheelOpt); // mobile
        window.addEventListener("keydown", Scroll.preventDefaultForScrollKeys, { passive: false });
    }

    // call this to Enable
    static enableScroll() {
        window.removeEventListener("DOMMouseScroll", Scroll.preventDefault, false);
        window.removeEventListener(Scroll.wheelEvent, Scroll.preventDefault, Scroll.wheelOpt);
        window.removeEventListener("touchmove", Scroll.preventDefault, Scroll.wheelOpt);
        window.removeEventListener("keydown", Scroll.preventDefaultForScrollKeys, false);
    }
}
