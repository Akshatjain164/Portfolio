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
    if (isMobile()) sidebarNav.classList.add('expanded');
    else sidebarNav.classList.remove('expanded');
}
window.addEventListener('resize', updateSidebarState);
updateSidebarState();

// === Skills: expandable ===
document.querySelectorAll('.skill-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');

    card.addEventListener('click', function (e) {
        if (!card.classList.contains('active')) {
            document.querySelectorAll('.skill-card.active').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-expanded', 'false');
            });
            card.classList.add('active');
            card.setAttribute('aria-expanded', 'true');
        } else {
            card.classList.remove('active');
            card.setAttribute('aria-expanded', 'false');
        }
    });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { card.click(); }
    });
});

// === Projects: flip cards ===
document.querySelectorAll('.flipcard').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    card.addEventListener('click', function () {
        card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', card.classList.contains('flipped'));
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

const particlesContainer = document.getElementById('particles-container');
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    resetParticle(particle);

    particlesContainer.appendChild(particle);

    animateParticle(particle);
}

function resetParticle(particle) {
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';

    return { x: posX, y: posY };
}

function animateParticle(particle) {
    const pos = resetParticle(particle);

    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;

        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;

    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';

    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';

        setTimeout(() => {
            particle.remove();
        }, 2000);
    }, 10);

    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

    spheres.forEach(sphere => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
