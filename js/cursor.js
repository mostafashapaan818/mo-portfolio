/* ==========================================================================
   INTERACTIVE GRAVITY RIPPLE & CLICK WAVE EFFECT
   Replaces custom cursor with clean native cursor + anti-gravity shockwaves
   ========================================================================== */

(function () {
  // Spawn anti-gravity energy ripple on click
  window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'gravity-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '120px';
    ripple.style.height = '120px';

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
})();
