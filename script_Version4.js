 // Smooth scroll for sidebar nav
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Optional: update active class
    document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});
