const btn = document.querySelector('#btn');

// class Toast {
//     constructor() {
//         this.container = document.createElement('div');
//         this.container.classList.add('toast-container');
//         document.body.appendChild(this.container);
//     }

//     show(message, duration = 10000) {
//         const toast = document.createElement('div');
//         toast.classList.add('toast');
//         toast.innerHTML = message;
//         this.container.appendChild(toast);

//         setTimeout(() => {
//             this.container.removeChild(toast);
//         }, duration);
//     }
// }

class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('toast-container');
        document.body.appendChild(this.container);
        this.toasts = [];
    }

    show(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = message;
        this.container.appendChild(toast);
        this.toasts.push(toast);

        setTimeout(() => {
            this.container.removeChild(toast);
            this.toasts.splice(this.toasts.indexOf(toast), 1);
        }, duration);
    }
}



const toast = new Toast();

btn.addEventListener('click', () => {

    toast.show('Hello, World!'); // 显示 "Hello, World!" 并在 3 秒后消失
    //toast.show('Goodbye!', 5000); // 显示 "Goodbye!" 并在 5 秒后消失
});