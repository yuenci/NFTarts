//  toast
class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('toast-container');
        document.body.appendChild(this.container);
        this.toasts = [];
    }

    show(message, duration = 3000, type = "success") {
        let colorMap = {
            "success": "#94d82d",
            "error": "#eb0028",
            "warning": "#ff9900",
            "info": "#adb5bd"
        };


        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = message;
        toast.style.backgroundColor = colorMap[type];
        this.container.appendChild(toast);
        this.toasts.push(toast);

        setTimeout(() => {
            this.container.removeChild(toast);
            this.toasts.splice(this.toasts.indexOf(toast), 1);
        }, duration);
    }
}

const toast = new Toast();

// btn2.addEventListener('click', () => {

//     //toast.show('Hello, World!Hello, World!Hello'); // 显示 "Hello, World!" 并在 3 秒后消失
//     //toast.show('Goodbye!', 5000); // 显示 "Goodbye!" 并在 5 秒后消失
//     //toast.show('Hello, World!', 10000, 'error'); // 显示 "Hello, World!" 并在 10 秒后消失
//     toast.show('Hello, World!', 3000, 'success');
// });


// confirmBox

function confirmBox(message, successCallback, errorCallback, title = "") {
    var confirmBox = document.createElement('div');
    confirmBox.className = 'confirm-box';

    if (title !== "") {
        var confirmTitle = document.createElement('div');
        confirmTitle.className = 'confirm-title';
        confirmTitle.innerHTML = title;
        confirmBox.appendChild(confirmTitle);
    }

    var confirmText = document.createElement('div');
    confirmText.className = 'confirm-text';
    confirmText.innerHTML = message;

    var confirmButtons = document.createElement('div');
    confirmButtons.className = 'confirm-buttons';

    var confirmButtonYes = document.createElement('button');
    confirmButtonYes.className = 'confirm-button confirm-yes';
    confirmButtonYes.innerHTML = 'Yes';
    confirmButtonYes.onclick = function () {
        successCallback();
        document.body.removeChild(confirmBox);
        document.body.removeChild(confirmOverlay);
    };

    var confirmButtonNo = document.createElement('button');
    confirmButtonNo.className = 'confirm-button confirm-no';
    confirmButtonNo.innerHTML = 'No';
    confirmButtonNo.onclick = function () {
        errorCallback();
        document.body.removeChild(confirmBox);
        document.body.removeChild(confirmOverlay);
    };

    var confirmOverlay = document.createElement('div');
    confirmOverlay.className = 'confirm-overlay';
    confirmOverlay.onclick = function () {
        document.body.removeChild(confirmBox);
        document.body.removeChild(confirmOverlay);
    };

    confirmBox.appendChild(confirmText);
    confirmBox.appendChild(confirmButtons);
    confirmButtons.appendChild(confirmButtonYes);
    confirmButtons.appendChild(confirmButtonNo);

    document.body.appendChild(confirmOverlay);
    document.body.appendChild(confirmBox);
}




// btn1.addEventListener('click', () => {
//     console.log('You clicked the button!');
    // confirmBox('Are you sure?', function () {
    //     console.log('You clicked Yes!');
    // }, function () {
    //     console.log('You clicked No!');
    // })
// });

// 

