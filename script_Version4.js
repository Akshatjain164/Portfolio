// Gradient background follows cursor
document.addEventListener('DOMContentLoaded', () => {
  let bg = document.createElement('div');
  bg.className = 'bg-gradient-cursor';
  document.body.appendChild(bg);

  document.addEventListener('mousemove', e => {
    bg.style.setProperty('--x', `${e.clientX}px`);
    bg.style.setProperty('--y', `${e.clientY}px`);
  });
});