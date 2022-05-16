var idbKeyval = function (e) {
    "use strict";

    function t(e) {
        return new Promise(((t, n) => {
            e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => n(e.error)
        }))
    }

    function n(e, n) {
        const r = function () {
            if (navigator.userAgentData || !/Safari\//.test(navigator.userAgent) || /Chrom(e|ium)\//.test(navigator.userAgent) || !indexedDB.databases) return Promise.resolve();
            let e;
            return new Promise((t => {
                const n = () => indexedDB.databases().finally(t);
                e = setInterval(n, 100), n()
            })).finally((() => clearInterval(e)))
        }().then((() => {
            const r = indexedDB.open(e);
            return r.onupgradeneeded = () => r.result.createObjectStore(n), t(r)
        }));
        return (e, t) => r.then((r => t(r.transaction(n, e).objectStore(n))))
    }
    let r;

    function o() {
        return r || (r = n("keyval-store", "keyval")), r
    }

    function u(e, n) {
        return e("readonly", (e => (e.openCursor().onsuccess = function () {
            this.result && (n(this.result), this.result.continue())
        }, t(e.transaction))))
    }
    return e.clear = function (e = o()) {
        return e("readwrite", (e => (e.clear(), t(e.transaction))))
    }, e.createStore = n, e.del = function (e, n = o()) {
        return n("readwrite", (n => (n.delete(e), t(n.transaction))))
    }, e.entries = function (e = o()) {
        const t = [];
        return u(e, (e => t.push([e.key, e.value]))).then((() => t))
    }, e.get = function (e, n = o()) {
        return n("readonly", (n => t(n.get(e))))
    }, e.getMany = function (e, n = o()) {
        return n("readonly", (n => Promise.all(e.map((e => t(n.get(e)))))))
    }, e.keys = function (e = o()) {
        const t = [];
        return u(e, (e => t.push(e.key))).then((() => t))
    }, e.promisifyRequest = t, e.set = function (e, n, r = o()) {
        return r("readwrite", (r => (r.put(n, e), t(r.transaction))))
    }, e.setMany = function (e, n = o()) {
        return n("readwrite", (n => (e.forEach((e => n.put(e[1], e[0]))), t(n.transaction))))
    }, e.update = function (e, n, r = o()) {
        return r("readwrite", (r => new Promise(((o, u) => {
            r.get(e).onsuccess = function () {
                try {
                    r.put(n(this.result), e), o(t(r.transaction))
                } catch (e) {
                    u(e)
                }
            }
        }))))
    }, e.values = function (e = o()) {
        const t = [];
        return u(e, (e => t.push(e.value))).then((() => t))
    }, e
}({});