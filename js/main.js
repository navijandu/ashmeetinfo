// AOS Initialization
AOS.init({
    duration: 1200,
    once: true
});

// Typed.js
const typed = new Typed('.typed', {
    strings: ['Full Stack Developer', 'IT Technician', 'Web Designer', 'Problem Solver'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
});

// Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        size: { value: 3 },
        move: { speed: 2 },
        line_linked: { enable: true }
    }
});

document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init("dyNbevGJJR7nqMZ91");

    const form = document.getElementById('contact-form');
    const btn = document.getElementById('send-btn');

    if (!form || !btn) return;

    btn.addEventListener('click', function () {

        // Trim and validate fields
        const name = form.user_name.value.trim();
        const email = form.user_email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            showMessage("Please fill in all required fields ❌", "error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage("Please enter a valid email address ❌", "error");
            return;
        }

        btn.disabled = true;
        btn.innerHTML = "Sending... ⏳";

        // Send email via EmailJS
        emailjs.sendForm('service_dcn8fuy', 'template_5atardf', form)
            .then(function() {
                console.log("EmailJS: Email sent ✅");

                // Send data to Google Sheets
                fetch("https://script.google.com/macros/s/AKfycbzv9KNiHyo552ZEq6NnAjkBP-Nd1rlOX4VuegWwpKB-2YoSk10axLca40IMT43fqmg/exec", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, subject, message })
                })
                .then(response => response.text()) // Google Sheets returns plain text
                .then(data => {
                    console.log("Google Sheets response:", data);

                    showMessage("Message sent successfully! ✅", "success");
                    form.reset();
                })
                .catch(err => {
                    console.error("Google Sheets error:", err);
                    showMessage("Message sent via email but failed to save in Sheets ❌", "error");
                });

            }, function(error) {
                console.error("EmailJS error:", error);
                showMessage("Error sending message ❌", "error");
            })
            .finally(() => {
                btn.disabled = false;
                btn.innerHTML = "Send Message";
            });

    });

    // Function to show popup messages
    function showMessage(message, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `fixed inset-0 flex items-center justify-center z-50`;

        const innerDiv = document.createElement('div');
        innerDiv.textContent = message;
        innerDiv.className = `
            text-white px-8 py-6 rounded-xl shadow-lg
            text-center text-lg animate__animated animate__fadeInDown
            backdrop-blur-md
        `;

        innerDiv.style.backgroundColor = type === "success"
            ? "rgba(34,197,94,0.85)" // green
            : "rgba(239,68,68,0.85)"; // red

        msgDiv.appendChild(innerDiv);
        document.body.appendChild(msgDiv);

        // Auto-hide after 2 seconds
        setTimeout(() => {
            innerDiv.classList.add('animate__fadeOutUp');
            innerDiv.addEventListener('animationend', () => msgDiv.remove());
        }, 2000);
    }

});
// FILTER FUNCTIONALITY
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Active button
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projects.forEach(card => {
            if (filter === "all" || card.classList.contains(filter)) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

