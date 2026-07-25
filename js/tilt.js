/* ==========================================================================
   3D MOUSE TILT EFFECT WITH SPECULAR GLARE
   ========================================================================== */

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    let rect;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s var(--ease-out-cubic)';
    });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // tilt angle X
      const rotateY = ((x - centerX) / centerX) * 12;  // tilt angle Y

      const mouseXPct = (x / rect.width) * 100;
      const mouseYPct = (y / rect.height) * 100;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${mouseXPct}%`);
      card.style.setProperty('--mouse-y', `${mouseYPct}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s var(--ease-expo)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
})();
