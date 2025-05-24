window.addEventListener('DOMContentLoaded', () => {
  const radarLanding = document.getElementById('radar-landing');
  const mainSite = document.getElementById('main-site');
  const radarBall = document.querySelector('.radar-ball');
  const radarSound = document.getElementById('radar-sound');
  const radarInstructions = document.querySelector('.radar-instructions');

  // Defensive: check for all elements
  if (radarLanding && mainSite && radarBall && radarInstructions && radarSound) {
    setTimeout(() => {
      radarSound.play();
      radarBall.classList.add('found');
      radarInstructions.textContent = "Dragon Ball found! Welcome!";
      setTimeout(() => {
        radarLanding.style.opacity = 0;
        setTimeout(() => {
          radarLanding.style.display = "none";
          mainSite.style.display = "";
        }, 900);
      }, 2100);
    }, 1900);

    // Animate skill bars after radar
    setTimeout(() => {
      document.querySelectorAll('.bar > div').forEach(bar => {
        let width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = width; }, 500);
      });
    }, 3200);
  } else {
    // Fallback: show main site after 3 seconds if something is missing
    setTimeout(() => {
      if (radarLanding) radarLanding.style.display = "none";
      if (mainSite) mainSite.style.display = "";
    }, 3000);
  }

  // Sidebar scroll (ensure this runs only when mainSite is visible)
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
