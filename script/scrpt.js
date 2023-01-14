//404

let error_page_back_btn = document.getElementById("Error-page-btn")
if (error_page_back_btn) {
    click_redirection(error_page_back_btn, "index.html")
}


//login

let login_btn = document.getElementById("login-btn");
if (login_btn) {
    login_btn.addEventListener("click", loginToACC)
}


function loginToACC() {
    let username_value = document.getElementById("login-username").value.toLowerCase();
    let password_value = document.getElementById("login-password").value.toLowerCase();

    if (username_value && password_value) {
        if (username_value !== "Enter your username"
            && password_value !== "Enter your password") {
            let res = verify(username_value, password_value);
            if (res) {
                if (res === "admin") {
                    window.location.href = "writer.html";
                } else {
                    localStorage.setItem("userName", username_value.toLowerCase())
                    window.location.href = "gallery.html";
                }
            } else {
                let r = confirm("Need help? Contact us!")
                if (r) {
                    window.location.href = "contactUs.html";
                }
            }
        } else {
            alert("Please enter invalid value")
        }
    } else {
        alert("Please enter invalid value")
    }
}

function verify(name, password) {
    let userInfo = {
        "yannis": {
            "password": 112233,
            "role": "admin"
        },
        "pheymin": {
            "password": 332211,
            "role": "admin"
        },
        "innis": {
            "password": 221133,
            "role": "admin"
        },
        "yannisv": {
            "password": 112233,
            "role": "nfter"
        },
        "pheyminv": {
            "password": 332211,
            "role": "nfter"
        },
        "innisv": {
            "password": 221133,
            "role": "nfter"
        }
    }

    if (name in userInfo) {
        if (userInfo[name]["password"] === password) {
            if (userInfo[name]["role"] === "nfter") {
                return "nfter"
            } else if (userInfo[name]["role"] === "admin") {
                return "admin"
            }
        }
        else {
            alert(`Password is wrong`)
            return false
        }
    } else {
        alert(`User ${name} does not exist`)
        return false
    }
}

let get_account = document.getElementById("login-text");
if (get_account) {
    get_account.addEventListener("click", function () {
        window.location.href = "signUp.html";
    })
}



//about us
let follow1 = document.getElementById("follow1");
if (follow1) {
    follow1.onclick = function () {
        window.open('https://www.facebook.com/InnisYu', '_blank');
    }
}

let follow2 = document.getElementById("follow2");
if (follow2) {
    follow2.onclick = function () {
        window.open('https://www.facebook.com/lengzhiyan1015', '_blank');
    }
}

let follow3 = document.getElementById("follow3");
if (follow3) {
    follow3.onclick = function () {
        window.open('https://www.instagram.com/p_min23/', '_blank');
    }
}
