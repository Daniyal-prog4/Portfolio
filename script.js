// Initialize AOS Animation
AOS.init({ duration: 1000, once: true });

// Dynamic Typing Effect after "System Engineer &"
const typingWords = ["System Engineer", "Cybersecurity Enthusiast", "Embedded Systems Dev", "Threat Analyst"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingTarget = document.getElementById("typing-text");

function typeEffect() {
    if (!typingTarget) return;
    const currentWord = typingWords[wordIdx];
    
    if (isDeleting) {
        typingTarget.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingTarget.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % typingWords.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Mouse Glow Follower
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// Mobile Navigation Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };
}

// Interactive Cyber Grid / Network Background Animation
const canvas = document.getElementById('cyber-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(0, 242, 254, ${1 - distance / 120})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Image Modal Functions
function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgModalTarget');
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Programming Languages Modal Functions
function openLanguagesModal() {
    document.getElementById('languagesModal').style.display = 'flex';
}

function closeLanguagesModal() {
    document.getElementById('languagesModal').style.display = 'none';
}

// Stats Counter Animation (Count-Up to exact values like 3.42 CGPA)
const counters = document.querySelectorAll('.counter');
let started = false;

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const decimals = +counter.getAttribute('data-decimals') || 0;
        let count = 0;
        const speed = target / 60;

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = count.toFixed(decimals);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target.toFixed(decimals);
            }
        };
        updateCount();
    });
}

// Skills Progress Bars Fill Animation
const progressBars = document.querySelectorAll('.progress');
let skillsAnimated = false;

function animateSkills() {
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
    });
}

// Scroll Trigger for Counter & Skills
window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    if (statsSection && !started) {
        const pos = statsSection.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            startCounters();
            started = true;
        }
    }

    const skillsSection = document.getElementById('skills');
    if (skillsSection && !skillsAnimated) {
        const pos = skillsSection.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            animateSkills();
            skillsAnimated = true;
        }
    }
});

// EmailJS Form Handling
emailjs.init("Kw3VOULhGP9sg1D-y");

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btnText = document.getElementById('btn-text');
        const spinner = document.getElementById('btn-spinner');
        const statusMsg = document.getElementById('form-status');

        btnText.textContent = "Sending...";
        spinner.classList.remove('hidden');

        emailjs.send("service_ojxdxdm", "template_cuaoaji", {
            from_name: document.getElementById('user_name').value,
            reply_to: document.getElementById('user_email').value,
            phone: document.getElementById('user_phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        }).then(() => {
            btnText.textContent = "Send Message";
            spinner.classList.add('hidden');
            statusMsg.style.color = "#00f2fe";
            statusMsg.textContent = "Message sent successfully!";
            this.reset();
        }, (err) => {
            btnText.textContent = "Send Message";
            spinner.classList.add('hidden');
            statusMsg.style.color = "#ff4757";
            statusMsg.textContent = "Failed to send message.";
        });
    });
}
