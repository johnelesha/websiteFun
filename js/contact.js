emailjs.init("oW4WIH1TtGzKfOASn");
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
        alert("All fields are required!");
        return;
    }

    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    emailjs.send("service_qgl6usb", "template_z0q8obf", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    })
        .then(
            function (response) {
                alert("Message sent successfully!");
                console.log("SUCCESS!", response.status, response.text);
                document.getElementById("contact-form").reset();
            },
            function (error) {
                alert("Failed to send the message. Please try again.");
                console.log("FAILED...", error);
            }
        );
});