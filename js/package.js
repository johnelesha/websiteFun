// Add glowing effect to buttons on click
document.querySelectorAll("#flex button").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("glow");
        setTimeout(() => button.classList.remove("glow"), 500);
    });
});

function subscribe(button) {
    var loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("You need to log in first!");
        window.location.href = "login.html";
        return;
    }

    var chooseOption = button.getAttribute("data-option");
    var nameOption = button.closest('[data-name]').getAttribute("data-name");

    if (chooseOption === "first") {
        alert(`You selected the Premium option about ${nameOption}!`);
    } else {
        alert(`You selected the Normal option about ${nameOption}!`);
    }
}
