function signUp(event) {
    event.preventDefault();
    var userName = document.getElementById("userName").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (!userName || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    var nameRegex = /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/;

    if (!nameRegex.test(userName)) {
        alert("Full name must be two words.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Please ensure that the two passwords are identical.");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("User with this email already exists!");
        return;
    }

    var user = {
        userName: userName,
        email: email,
        password: password,
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("You signed up successfully!");
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = "login.html";
}