// === SPA Navigation ===
const navBtns = document.querySelectorAll('.nav-btn');
const pages = {
    about: document.getElementById('about-page'),
    skills: document.getElementById('skills-page'),
    projects: document.getElementById('projects-page'),
    contact: document.getElementById('contact-page')
};
function showPage(page) {
    Object.entries(pages).forEach(([key, el]) => {
        if (key === page) {
            el.classList.add('active');
            el.setAttribute('tabindex', '0');
        } else {
            el.classList.remove('active');
            el.setAttribute('tabindex', '-1');
        }
    });
    navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.section === page));
    pages[page].focus();
}
navBtns.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.section));
    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') showPage(btn.dataset.section);
    });
});
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (pages[hash]) showPage(hash);
});
(function () {
    const hash = window.location.hash.replace('#', '');
    if (pages[hash]) showPage(hash);
})();
document.addEventListener('keydown', e => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (e.key >= '1' && e.key <= '4') {
        const keys = ['about', 'skills', 'projects', 'contact'];
        showPage(keys[parseInt(e.key) - 1]);
    }
});

// === Sidebar hover/collapse/expand ===
const sidebarNav = document.getElementById('sidebar-nav');
function isMobile() { return window.innerWidth < 720; }
function updateSidebarState() {
    // On phone use expanded sidebar, on desktop collapse/expand
    if (isMobile()) sidebarNav.classList.add('expanded');
    else sidebarNav.classList.remove('expanded');
}
window.addEventListener('resize', updateSidebarState);
updateSidebarState();

// === Skills: expandable ===
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (!card.classList.contains('active')) {
            document.querySelectorAll('.skill-card.active').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { card.click(); }
    });
});

// === Projects: flip cards ===
document.querySelectorAll('.flipcard').forEach(card => {
    card.addEventListener('click', function () {
        card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { card.click(); }
    });
});

// === Theme (Gradient) Slider ===
const shinyPresets = [
    { // shiny blue-black
        g1: [17, 19, 29],   // #11131d
        g2: [102, 179, 255],// #66b3ff
        primary: [102, 179, 255]
    },
    { // inverted: shiny blue-gold
        g1: [102, 179, 255],// #66b3ff
        g2: [17, 19, 29],   // #11131d
        primary: [255, 225, 86] // #ffe156
    }
];
function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
    return [
        Math.round(lerp(c1[0], c2[0], t)),
        Math.round(lerp(c1[1], c2[1], t)),
        Math.round(lerp(c1[2], c2[2], t))
    ];
}
function rgb(c) { return `rgb(${c[0]},${c[1]},${c[2]})`; }

const slider = document.getElementById('theme-slider');
const sliderDot = document.getElementById('slider-dot');
function updateTheme(val) {
    // val: 0..100
    let t = val / 100;
    const p1 = shinyPresets[0], p2 = shinyPresets[1];
    const g1 = lerpColor(p1.g1, p2.g1, t);
    const g2 = lerpColor(p1.g2, p2.g2, t);
    const primary = [
        Math.round(lerp(p1.primary[0], p2.primary[0], t)),
        Math.round(lerp(p1.primary[1], p2.primary[1], t)),
        Math.round(lerp(p1.primary[2], p2.primary[2], t))
    ];
    document.documentElement.style.setProperty('--gradient1', rgb(g1));
    document.documentElement.style.setProperty('--gradient2', rgb(g2));
    document.documentElement.style.setProperty('--primary', rgb(primary));
    sliderDot.style.background = rgb(primary);
}
slider.addEventListener('input', function () {
    updateTheme(this.value);
});
updateTheme(slider.value);
setTimeout(() => showPage('about'), 50);

// === Modern Gradient Spheres, Grid, Glow, Noise, and Interactive Particles ===

// Already in HTML: .gradient-background, .gradient-sphere, .grid-overlay, .glow, .noise-overlay, .particles-container

const particlesContainer = document.getElementById('particles-container');
const particleCount = window.innerWidth < 600 ? 40 : 80; // Fewer particles on mobile

// Create floating particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Initial position
    resetParticle(particle);

    particlesContainer.appendChild(particle);

    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';

    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);

    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        // Move in a slight direction
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; // Move upwards

        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        // Reset after animation completes
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Mouse interaction for burst effect and sphere movement
document.addEventListener('mousemove', (e) => {
    // Don't spawn extra particles on very small screens
    if(window.innerWidth<480) return;

    // Create particles at mouse position
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;

    // Create temporary particle
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Small size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Position at mouse
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';

    particlesContainer.appendChild(particle);

    // Animate outward
    setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }, 10);

    // Subtle movement of gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

    spheres.forEach(sphere => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Make sure everything updates if screen size changes (particles, sidebar, etc.)
window.addEventListener('resize', () => {
    updateSidebarState();
    // Optional: If you want to reset particles on resize for perf, clear and re-add:
    // particlesContainer.innerHTML = '';
    // for (let i = 0; i < (window.innerWidth < 600 ? 40 : 80); i++) createParticle();
});
