// ==================== CONFIGURATION ====================
// CUSTOMIZATION: Change these values to personalize your website

const CONFIG = {
    // Password to unlock the website
    PASSWORD: "forever",  // Change this to your desired password
    
    // Birthday date (format: YYYY-MM-DD - year will auto-update for next birthday)
    BIRTHDAY_DATE: "2026-01-15",  // January 15th - change to actual birthday
    
    // Names for personalization
    YOUR_NAME: "Alex",  // Your name
    GIRLFRIEND_NAME: "Sarah"  // Your girlfriend's name
};

// ==================== PAGE MANAGEMENT ====================
const pages = {
    password: document.getElementById('passwordPage'),
    apology: document.getElementById('apologyPage'),
    main: document.getElementById('mainPage')
};

let currentPage = 'password';

// Function to switch between pages
function showPage(pageName) {
    // Hide all pages
    Object.keys(pages).forEach(key => {
        pages[key].classList.remove('active');
    });
    
    // Show the requested page
    setTimeout(() => {
        pages[pageName].classList.add('active');
        currentPage = pageName;
        
        // If showing apology page, start typewriter effect
        if (pageName === 'apology') {
            // Add extra delay to ensure page is fully rendered
            setTimeout(() => {
                typewriterEffect();
            }, 300);
        }
        
        // If showing main page, initialize animations
        if (pageName === 'main') {
            initScrollAnimations();
            scrollToTop();
        }
    }, 100);
}

// Scroll to top helper
function scrollToTop() {
    pages.main.scrollTop = 0;
}

// ==================== PASSWORD PAGE ====================
function setupPasswordPage() {
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === CONFIG.PASSWORD) {
            // Correct password
            errorMessage.textContent = '';
            errorMessage.style.color = '#2ecc71';
            errorMessage.textContent = '✓ Unlocking...';
            
            // Add success animation
            passwordInput.style.borderColor = '#2ecc71';
            
            // Transition to apology page after a short delay
            setTimeout(() => {
                showPage('apology');
                passwordInput.value = '';
                passwordInput.style.borderColor = '';
                errorMessage.textContent = '';
            }, 1000);
        } else {
            // Incorrect password
            errorMessage.textContent = '❌ Incorrect password. Try again!';
            errorMessage.style.color = '#DC143C';
            passwordInput.style.borderColor = '#DC143C';
            
            // Shake animation
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
                passwordInput.style.borderColor = '';
            }, 500);
        }
    });
}

// Shake animation for incorrect password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ==================== APOLOGY PAGE ====================
function setupApologyPage() {
    const continueBtn = document.getElementById('continueBtn');
    
    continueBtn.addEventListener('click', () => {
        showPage('main');
    });
    
    // Note: typewriterEffect is now called from showPage() when the page becomes active
}

function typewriterEffect() {
    const apologyMessage = document.querySelector('.apology-message');
    if (!apologyMessage) {
        console.log('Apology message not found');
        return;
    }
    
    // Get all paragraphs
    const paragraphs = Array.from(apologyMessage.querySelectorAll('p'));
    if (paragraphs.length === 0) {
        console.log('No paragraphs found');
        return;
    }
    
    console.log(`Found ${paragraphs.length} paragraphs to type`);
    
    // Store original text and prepare paragraphs
    const originalTexts = [];
    paragraphs.forEach((p) => {
        // Get text content, replacing <br> with newline
        let text = p.innerHTML;
        text = text.replace(/<br\s*\/?>/gi, '\n');
        // Remove any other HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        originalTexts.push(plainText);
        
        // Clear and hide the paragraph
        p.textContent = '';
        p.style.opacity = '0';
    });
    
    let currentParagraph = 0;
    let currentChar = 0;
    
    function typeNextChar() {
        if (currentParagraph >= paragraphs.length) {
            console.log('Typewriter effect complete');
            // Show the continue button after all text is typed
            showContinueButton();
            return;
        }
        
        const paragraph = paragraphs[currentParagraph];
        const text = originalTexts[currentParagraph];
        
        // Show paragraph and add typing class when starting
        if (currentChar === 0) {
            paragraph.style.opacity = '1';
            paragraph.classList.add('typing');
            console.log(`Starting paragraph ${currentParagraph + 1}: "${text.substring(0, 30)}..."`);
        }
        
        if (currentChar < text.length) {
            // Add next character
            paragraph.textContent = text.substring(0, currentChar + 1);
            currentChar++;
            
            // Determine typing speed based on character
            const char = text[currentChar - 1];
            let speed = 25; // Default speed
            
            if (char === '.' || char === '!' || char === '?') {
                speed = 200; // Longer pause after sentence
            } else if (char === ',') {
                speed = 100; // Medium pause after comma
            } else if (char === ' ') {
                speed = 30; // Slightly slower for spaces
            }
            
            setTimeout(typeNextChar, speed);
        } else {
            // Paragraph complete
            paragraph.classList.remove('typing');
            console.log(`Completed paragraph ${currentParagraph + 1}`);
            
            // Move to next paragraph
            currentChar = 0;
            currentParagraph++;
            setTimeout(typeNextChar, 600);
        }
    }
    
    // Start typing after a delay
    console.log('Starting typewriter effect...');
    setTimeout(typeNextChar, 1000);
}

function showContinueButton() {
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        setTimeout(() => {
            continueBtn.classList.add('show');
            console.log('Continue button shown');
        }, 500);
    }
}

// ==================== MAIN PAGE - BIRTHDAY COUNTDOWN ====================
function getNextBirthday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Parse the birthday date
    const birthdayParts = CONFIG.BIRTHDAY_DATE.split('-');
    const birthdayMonth = parseInt(birthdayParts[1]) - 1; // Month is 0-indexed
    const birthdayDay = parseInt(birthdayParts[2]);
    
    // Create birthday date for this year
    let nextBirthday = new Date(currentYear, birthdayMonth, birthdayDay);
    
    // If birthday has passed this year, set it to next year
    if (today > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, birthdayMonth, birthdayDay);
    }
    
    return nextBirthday;
}

function updateBirthdayCountdown() {
    const now = new Date();
    const birthday = getNextBirthday();
    const diff = birthday - now;
    
    if (diff <= 0) {
        // It's her birthday!
        document.getElementById('days').textContent = '🎉';
        document.getElementById('hours').textContent = '🎂';
        document.getElementById('minutes').textContent = '🎈';
        document.getElementById('seconds').textContent = '🎁';
        
        // Update the message
        const countdownContainer = document.querySelector('.birthday-counter h3');
        if (countdownContainer) {
            countdownContainer.textContent = "🎉 IT'S YOUR SPECIAL DAY! 🎉";
        }
        return;
    }
    
    // Calculate time remaining
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

function startBirthdayCountdown() {
    // Update immediately
    updateBirthdayCountdown();
    
    // Update every second
    setInterval(updateBirthdayCountdown, 1000);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        root: pages.main,
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all timeline items and sections
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== FLOATING HEARTS GENERATION ====================
function createFloatingHeart(container) {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.opacity = '0';
    heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.pointerEvents = 'none';
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

function startFloatingHearts() {
    const containers = document.querySelectorAll('.floating-hearts');
    
    containers.forEach(container => {
        // Create initial hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart(container);
            }, i * 1000);
        }
        
        // Continue creating hearts periodically
        setInterval(() => {
            createFloatingHeart(container);
        }, 3000);
    });
}

// ==================== SMOOTH SCROLL ====================
function setupSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
                timelineSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ==================== PERSONALIZATION ====================
function personalizeContent() {
    // Replace placeholders with actual names using a more targeted approach
    const elementsToReplace = document.querySelectorAll('p, h1, h2, h3, h4, .apology-message, .love-letter');
    
    elementsToReplace.forEach(element => {
        if (element.innerHTML.includes('[YOUR_NAME]') || 
            element.innerHTML.includes('[GIRLFRIEND_NAME]')) {
            
            element.innerHTML = element.innerHTML
                .replace(/\[YOUR_NAME\]/g, CONFIG.YOUR_NAME)
                .replace(/\[GIRLFRIEND_NAME\]/g, CONFIG.GIRLFRIEND_NAME);
        }
    });
}

// ==================== INITIALIZATION ====================
function init() {
    // Personalize content with names
    personalizeContent();
    
    // Setup page event listeners
    setupPasswordPage();
    setupApologyPage();
    
    // Start birthday countdown
    startBirthdayCountdown();
    
    // Start floating hearts animation
    startFloatingHearts();
    
    // Setup smooth scroll
    setupSmoothScroll();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== ADDITIONAL FEATURES ====================

// Add sparkle effect on mouse move (optional enhancement)
document.addEventListener('mousemove', (e) => {
    if (currentPage === 'main' && Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Prevent scrolling on password and apology pages
pages.password.addEventListener('wheel', (e) => {
    if (currentPage === 'password') {
        e.preventDefault();
    }
});

pages.apology.addEventListener('wheel', (e) => {
    if (currentPage === 'apology' && e.deltaY < 0) {
        e.preventDefault();
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c❤️ Made with Love ❤️', 'color: #DC143C; font-size: 20px; font-weight: bold;');
console.log('%cCustomization Guide:', 'color: #FF1493; font-size: 16px; font-weight: bold;');
console.log('%c1. Edit CONFIG object in script.js to change password, dates, and names', 'color: #666;');
console.log('%c2. Replace placeholder text in index.html for apology message and love letter', 'color: #666;');
console.log('%c3. Add your photos by uncommenting img tags and updating src paths', 'color: #666;');
console.log('%c4. Customize timeline events by editing the HTML', 'color: #666;');

// ==================== I LOVE YOU ANIMATION SYSTEM ====================

// Configuration for animations
const ANIMATION_CONFIG = {
    particleCount: 50,
    heartColors: ['#FF1493', '#DC143C', '#FFD700', '#FF69B4', '#FFC0CB'],
    particleTypes: ['❤️', '💕', '💖', '💗', '💓', '💝', '✨', '⭐', '💫'],
    particleLifetime: 2500,
    heartFloatCount: 12,
    rosePetalCount: 20
};

// Canvas setup and particle system
let canvas, ctx;
let particles = [];
let mouseX = 0, mouseY = 0;

function setupLoveAnimation() {
    canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize floating hearts
    createFloatingHearts();
    
    // Initialize rose petals
    createRosePetals();
    
    // Start animation loop
    animateParticles();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle class
class Particle {
    constructor(x, y, type = 'heart') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.symbol = ANIMATION_CONFIG.particleTypes[Math.floor(Math.random() * ANIMATION_CONFIG.particleTypes.length)];
        this.color = ANIMATION_CONFIG.heartColors[Math.floor(Math.random() * ANIMATION_CONFIG.heartColors.length)];
        this.size = Math.random() * 20 + 15;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8 - 3;
        this.life = ANIMATION_CONFIG.particleLifetime;
        this.maxLife = ANIMATION_CONFIG.particleLifetime;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 5;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.15; // Gravity
        this.rotation += this.rotationSpeed;
        this.life -= 16;
        return this.life > 0;
    }
    
    draw() {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, 0, 0);
        
        ctx.restore();
    }
}

// Create particle burst
function createParticleBurst(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    for (let i = 0; i < ANIMATION_CONFIG.heartFloatCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
        heart.style.color = ANIMATION_CONFIG.heartColors[Math.floor(Math.random() * ANIMATION_CONFIG.heartColors.length)];
        
        const angle = (Math.PI * 2 * i) / ANIMATION_CONFIG.heartFloatCount;
        const radius = 200 + Math.random() * 100;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = (i * 0.5) + 's';
        
        container.appendChild(heart);
    }
}

// Create rose petals
function createRosePetals() {
    const section = document.querySelector('.love-animation-section');
    if (!section) return;
    
    function addPetal() {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        section.appendChild(petal);
        
        setTimeout(() => petal.remove(), 15000);
    }
    
    // Initial petals
    for (let i = 0; i < ANIMATION_CONFIG.rosePetalCount; i++) {
        setTimeout(() => addPetal(), i * 200);
    }
    
    // Continuous petals
    setInterval(addPetal, 1000);
}

// Animate particles
function animateParticles() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter(particle => {
        const alive = particle.update();
        if (alive) {
            particle.draw();
        }
        return alive;
    });
    
    requestAnimationFrame(animateParticles);
}

// Initialize love animation when main page is shown
const originalShowPage = showPage;
showPage = function(pageName) {
    originalShowPage(pageName);
    if (pageName === 'main') {
        setTimeout(setupLoveAnimation, 100);
        setupScrollDownArrow();
    }
};

// Setup scroll down arrow
function setupScrollDownArrow() {
    const scrollArrow = document.querySelector('.scroll-down-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}
