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
    "particles": {
        "number": {
            "value": 80
        },
        "size": {
            "value": 3
        },
        "move": {
            "speed": 2
        },
        "line_linked": {
            "enable": true
        }
    }
});
