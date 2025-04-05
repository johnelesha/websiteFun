function logIn(event) {
    event.preventDefault();

    if (localStorage.getItem("loggedInUser")) {
        alert("A user is already logged in.");
        return;
    }

    var emailValue = document.getElementById("email").value;
    var passwordValue = document.getElementById("password").value;

    if (!emailValue || !passwordValue) {
        alert("Please fill in all fields!");
        return;
    }

    var storedUser = localStorage.getItem(emailValue);

    if (storedUser) {
        storedUser = JSON.parse(storedUser);
        if (passwordValue === storedUser.password) {
            localStorage.setItem("loggedInUser", emailValue);
            alert("Login successful!");
            redirectToHome();
        } else {
            alert("Incorrect password!");
        }
    } else {
        alert("No user with this email found. Please sign up first.");
        redirectToSignup();
    }
}

function redirectToHome() {
    window.location.href = "index.html";
}

function redirectToSignup() {
    window.location.href = "signup.html";
}