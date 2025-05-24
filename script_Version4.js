// Animated skill bars
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.bar > div').forEach(bar => {
      let width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = width; }, 500);
    });
  }, 400);

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
