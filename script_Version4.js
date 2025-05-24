// Gradient background follows cursor
document.addEventListener('DOMContentLoaded', () => {
  let bg = document.querySelector('.bg-gradient-cursor');
  document.addEventListener('mousemove', e => {
    bg.style.setProperty('--x', `${e.clientX}px`);
    bg.style.setProperty('--y', `${e.clientY}px`);
  });

  // Typing effect
  const roles = [
    "Aspiring Software Developer",
    "Open Source Enthusiast",
    "Web Creator",
    "Dragon Ball Fan"
  ];
  let typingEl = document.getElementById('typing-intro');
  let roleIdx = 0, charIdx = 0, isDeleting = false, delay = 95, pause = 1200;
  function type() {
    let text = roles[roleIdx];
    typingEl.textContent = isDeleting
      ? text.substring(0, charIdx--)
      : text.substring(0, charIdx++);
    if (!isDeleting && charIdx > text.length) {
      isDeleting = true;
      setTimeout(type, pause);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? delay/2 : delay);
    }
  }
  type();

  // Animate skill bars on load
  document.querySelectorAll('.bar > div').forEach(bar => {
    let width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = width; }, 400);
  });

  // Project card tilt effect
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.querySelector('.card-inner').style.transform =
        `rotateY(${x/12}deg) rotateX(${-y/16}deg)`;
    });
    card.addEventListener('mouseleave', e => {
      card.querySelector('.card-inner').style.transform = '';
    });
    card.addEventListener('click', () => {
      card.querySelector('.card-inner').classList.toggle('flipped');
    });
  });

  // Theme toggle with Dragon Ball animation
  const themeBtn = document.getElementById('toggle-theme');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if(document.body.classList.contains('light-mode')) {
      document.body.style.background = "#faf3e5";
      document.body.style.color = "#222";
      themeBtn.querySelector('.dragonball').style.background =
        "radial-gradient(circle, #ffe000 70%, #fff 100%)";
    } else {
      document.body.style.background = "";
      document.body.style.color = "";
      themeBtn.querySelector('.dragonball').style.background =
        "radial-gradient(circle, #ffe000 70%, #ffbe00 100%)";
    }
  });

  // Dragon Ball Radar animation - flash on hover
  const radar = document.getElementById('dragonball-radar');
  radar.addEventListener('mouseenter', () => {
    radar.querySelector('.radar-inner').style.background = "#39ff1490";
    radar.querySelector('.radar-inner').animate([
      { boxShadow: "0 0 0 0 #39ff14" },
      { boxShadow: "0 0 30px 10px #39ff14" },
      { boxShadow: "0 0 0 0 #39ff14" }
    ], { duration: 700, iterations: 1 });
  });
  radar.addEventListener('mouseleave', () => {
    radar.querySelector('.radar-inner').style.background = "#1f4736cc";
  });
  radar.addEventListener('click', () => {
    // Animate the radar dots
    radar.querySelectorAll('.radar-dot').forEach(dot => {
      dot.animate([
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(1.7)", opacity: 0.6 },
        { transform: "scale(1)", opacity: 1 }
      ], { duration: 700, iterations: 1 });
    });
  });

  // Konami Code Easter Egg
  const konami = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA
  let kIdx = 0;
  document.addEventListener('keydown', e => {
    if (e.keyCode === konami[kIdx]) {
      kIdx++;
      if (kIdx === konami.length) {
        showDragonballEasterEgg();
        kIdx = 0;
      }
    } else {
      kIdx = 0;
    }
  });
  function showDragonballEasterEgg() {
    let egg = document.createElement('img');
    egg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Dragon_Ball_icon.svg/120px-Dragon_Ball_icon.svg.png";
    egg.className = "konami-dragonball";
    document.body.appendChild(egg);
    document.getElementById('easter-egg-sound').play();
    setTimeout(() => egg.remove(), 1700);
  }
});
