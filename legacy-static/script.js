// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// CHATBOT
// ========================================

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

// Toggle chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });
}

// Close chatbot
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Simulate bot response (replace with actual API call later)
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Simple bot responses (replace with AI integration later)
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cvc') || lowerMessage.includes('climatique')) {
        return 'Pour le génie climatique et CVC, nous proposons des solutions VRV/VRF, centrales de traitement d\'air, et groupes d\'eau glacée. Souhaitez-vous un audit gratuit ?';
    } else if (lowerMessage.includes('air') || lowerMessage.includes('comprimé')) {
        return 'Nous installons et maintenons des centrales d\'air comprimé avec réseaux aluminium et inox. Voulez-vous que je vous oriente vers un expert ?';
    } else if (lowerMessage.includes('piscine') || lowerMessage.includes('eau')) {
        return 'Nous réalisons des installations complètes pour piscines avec filtration, pompage, chauffage PAC et traitement automatique. Quel type de projet avez-vous ?';
    } else if (lowerMessage.includes('incendie') || lowerMessage.includes('ssi') || lowerMessage.includes('sécurité')) {
        return 'Pour la sécurité incendie, nous intervenons sur RIA, colonnes sèches, réseaux sprinkleurs et désenfumage. Avez-vous besoin d\'une mise en conformité ?';
    } else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
        return 'Bonjour ! Je suis l\'assistant technique Aeroclim. Décrivez votre projet et je vous orienterai vers la meilleure solution.';
    } else if (lowerMessage.includes('devis') || lowerMessage.includes('prix') || lowerMessage.includes('tarif')) {
        return 'Pour un devis personnalisé, je vous recommande de demander une étude gratuite. Un expert analysera vos besoins spécifiques. Souhaitez-vous que je programme cette étude ?';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('mail')) {
        return 'Vous pouvez nous contacter au +33 1 23 45 67 89 ou par email à contact@aeroclim.fr. Nous sommes disponibles 24/7 pour l\'urgence.';
    } else {
        return 'Merci pour votre message. Pour mieux vous aider, pouvez-vous préciser votre projet ? (CVC, air comprimé, piscine, sécurité incendie)';
    }
}

// ========================================
// STICKY CTA MOBILE
// ========================================

const stickyCTA = document.getElementById('stickyCTA');

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        if (window.scrollY > 300) {
            stickyCTA.classList.add('active');
        } else {
            stickyCTA.classList.remove('active');
        }
    }
});

// ========================================
// ANIMATIONS ON SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe expertise cards
document.querySelectorAll('.expertise-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe why items
document.querySelectorAll('.why-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe value cards
document.querySelectorAll('.value-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================================
// FORM HANDLING (for contact page)
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Merci pour votre message. Nous vous contacterons rapidement.');
        contactForm.reset();
    });
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Aeroclim website loaded');
});
