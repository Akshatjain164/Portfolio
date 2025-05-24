// Radar landing animation and redirect
window.addEventListener('DOMContentLoaded', () => {
  const radarLanding = document.getElementById('radar-landing');
  const mainSite = document.getElementById('main-site');
  const radarBall = document.querySelector('.radar-ball');
  const radarSound = document.getElementById('radar-sound');
  setTimeout(() => {
    radarSound.play();
    radarBall.classList.add('found');
    document.querySelector('.radar-instructions').textContent = "Dragon Ball found! Welcome!";
    setTimeout(() => {
      radarLanding.style.opacity = 0;
      setTimeout(() => {
        radarLanding.style.display = "none";
        mainSite.style.display = "";
      }, 900);
    }, 2100);
  }, 1900);

  // Animated skill bars
  setTimeout(() => {
    document.querySelectorAll('.bar > div').forEach(bar => {
      let width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = width; }, 500);
    });
  }, 3200);

  // Sidebar scroll
  document.querySelectorAll('.sidebar-icon').forEach(icon => {
    icon.addEventListener('click', e => {
      e.preventDefault();
      const href = icon.getAttribute('href');
      if (href && document.querySelector(href)) {
        document.querySelector(href).scrollIntoView({behavior: "smooth"});
      }
    });
  });
});
