document.addEventListener('DOMContentLoaded', function () {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeSwitch.checked = true;
    } else {
        body.setAttribute('data-theme', 'light');
        darkModeSwitch.checked = false;
    }

    darkModeSwitch.addEventListener('change', function () {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.setAttribute('data-theme', 'dark');
    darkModeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
}

// make a scroll to top
var scrollTopButton = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }

    var section = document.querySelector('#aboutUs');
    var link = document.querySelector('#aboutLink');

    var sectionRect = section.getBoundingClientRect();
    
    var visibleAreaTop = 0.3, visibleAreaBottom = 0.5;

    if (sectionRect.top < window.innerHeight * visibleAreaTop && sectionRect.bottom > window.innerHeight * visibleAreaBottom) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function logOut(event) {
    event.preventDefault();
    var loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("No user is logged in now.");
        return;
    }

    localStorage.removeItem("loggedInUser");
    alert("You Logged out successfully!");
    location.reload();
}
