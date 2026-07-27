// Initialize AOS Animation
AOS.init({ duration: 1000, once: true });

// Mouse Glow Follower
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
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

// Binary Matrix Particle Background
const canvas = document.getElementById('cyber-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '0110010101010101';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(7, 10, 19, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f2fe';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

// Number Counter Animation
const counters = document.querySelectorAll('.counter');
let started = false;

window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const pos = statsSection.getBoundingClientRect().top;

    if (pos < window.innerHeight && !started) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = count.toFixed(target % 1 !== 0 ? 2 : 0);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        started = true;
    }
});

// EmailJS Form Handling
emailjs.init("YOUR_PUBLIC_KEY");

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btnText = document.getElementById('btn-text');
        const spinner = document.getElementById('btn-spinner');
        const statusMsg = document.getElementById('form-status');

        btnText.textContent = "Sending...";
        spinner.classList.remove('hidden');

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
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