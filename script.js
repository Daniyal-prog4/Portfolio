// Initialize AOS Animation
AOS.init({ duration: 1000, once: true });

// Mouse Glow Follower
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

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
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// Auto Typing Animation
const words = ["Systems Engineer", "Cybersecurity Analyst", "Threat Hunter"];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const typingTarget = document.querySelector('.typing-text');

function typeEffect() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
        typingTarget.textContent = currentWord.substring(0, charIdx--);
    } else {
        typingTarget.textContent = currentWord.substring(0, charIdx++);
    }

    if (!isDeleting && charIdx === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
typeEffect();

// Image Modal Functions
function openModal(imgSrc) {
    document.getElementById('imageModal').style.display = 'flex';
    document.getElementById('imgModalTarget').src = imgSrc;
}
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
let started = false;

window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    if (window.scrollY + window.innerHeight >= statsSection.offsetTop && !started) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const inc = target / 50;
            const updateCount = () => {
                count += inc;
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
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key

document.getElementById('contact-form').addEventListener('submit', function(e) {
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
        statusMsg.style.color = "#ff4d4d";
        statusMsg.textContent = "Failed to send message. Please try again.";
    });
});