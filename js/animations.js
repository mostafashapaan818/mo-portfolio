/* ==========================================================================
   MAGNETIC BUTTONS, SCROLL REVEALS, AND STAT COUNTERS
   ========================================================================== */

(function () {
  // 1. Magnetic Buttons
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const magneticBtns = document.querySelectorAll('.btn-magnetic');

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.04)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });
  }

  // 2. Scroll-Triggered Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Add initial reveal styles dynamically
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-stagger-1 { transition-delay: 0.1s; }
    .reveal-stagger-2 { transition-delay: 0.2s; }
    .reveal-stagger-3 { transition-delay: 0.3s; }
    .reveal-stagger-4 { transition-delay: 0.4s; }
  `;
  document.head.appendChild(styleTag);

  // 3. Live Numbers Counter Animation
  const statNumbers = document.querySelectorAll('.stat-num[data-count]');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalVal = parseInt(target.getAttribute('data-count'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        let startVal = 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease Out Quad
          const currentCount = Math.floor(progress * (2 - progress) * finalVal);
          target.textContent = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = finalVal + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  // 4. 3D Anti-Gravity Mouse Parallax for Hero Photo Container
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const photoField = document.getElementById('hero-photo-field');
    if (photoField) {
      const glowRing = photoField.querySelector('.photo-glow-ring');
      const badges = photoField.querySelectorAll('.zero-g-badge');

      photoField.addEventListener('mousemove', (e) => {
        const rect = photoField.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const tiltX = (y / (rect.height / 2)) * -14;
        const tiltY = (x / (rect.width / 2)) * 14;

        if (glowRing) {
          glowRing.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
        }

        badges.forEach((badge, index) => {
          const depth = (index + 1) * 8;
          badge.style.transform = `translate3d(${x * 0.15 * (index + 1)}px, ${y * 0.15 * (index + 1)}px, ${depth}px)`;
        });
      });

      photoField.addEventListener('mouseleave', () => {
        if (glowRing) {
          glowRing.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        }
        badges.forEach((badge) => {
          badge.style.transform = 'translate3d(0, 0, 0)';
        });
      });
    }
  }
})();
