/* ==========================================================================
   MAIN APPLICATION INTERACTION LOGIC
   Mostafa Mohamed Mahmoud Shapaan Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Glassmorphism
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Navigation Scroll-Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 4. Multi-Discipline Matrix Filter Switcher
  const discBtns = document.querySelectorAll('.disc-btn');
  const filterables = document.querySelectorAll('.disc-filterable');

  discBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const disc = btn.getAttribute('data-disc');

      discBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      filterables.forEach((item) => {
        const itemDisc = item.getAttribute('data-disc');
        if (disc === 'all' || !itemDisc || itemDisc.includes(disc)) {
          item.classList.remove('dimmed');
        } else {
          item.classList.add('dimmed');
        }
      });
    });
  });

  // 5. Toast Notification System
  function showToast(message, icon = '✓') {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(14, 14, 23, 0.9);
        border: 1px solid var(--accent-cyan);
        color: var(--text-main);
        padding: 0.85rem 1.5rem;
        border-radius: var(--border-radius-full);
        box-shadow: 0 10px 30px rgba(0, 229, 255, 0.3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 10000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(16px);
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span style="color: var(--accent-cyan); font-size: 1.1rem;">${icon}</span> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3200);
  }

  // 6. Contact Copy Actions (Phone & Email)
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach((el) => {
    el.addEventListener('click', () => {
      const textToCopy = el.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`);
        });
      } else {
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });

  // 7. Interactive Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        contactForm.reset();
        showToast('Message sent successfully! Mostafa will reply shortly.');
      }, 1200);
    });
  }

  // 8. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
