/* ═══════════════════════════════════════════════════════════
   THE VINE — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Navigation scroll effect ──────────────────────── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── Mobile menu toggle ────────────────────────────── */
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ──────────── */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ── Active nav link highlighting ──────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  /* ── Contact form handling ─────────────────────────── */
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // For now, show a friendly confirmation
    // In production, wire this up to a backend, Netlify Forms, Formspree, etc.
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Sent! ✓</span>';
    btn.style.background = '#3a8a3a';
    btn.disabled = true;

    // Show a thank you message
    const note = contactForm.querySelector('.form-note');
    note.textContent = 'Thanks, ' + (data.name || 'friend') + '! We\'ll be in touch soon.';
    note.style.color = '#5cb85c';

    // Reset after a few seconds
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
      setTimeout(() => {
        note.textContent = 'We respect your privacy. No spam. No mailing list unless you ask.';
        note.style.color = '';
      }, 2000);
    }, 4000);

    // Log to console for demo purposes
    console.log('%c🌿 The Vine — New Connection', 'color: #5cb85c; font-size: 14px; font-weight: bold;');
    console.log('%cName: ' + data.name, 'color: #a0a0b0;');
    console.log('%cEmail: ' + data.email, 'color: #a0a0b0;');
    console.log('%cInterest: ' + (data.interest || 'Not specified'), 'color: #a0a0b0;');
    console.log('%cMessage: ' + (data.message || 'No message'), 'color: #a0a0b0;');
  });

  /* ── Console Easter Egg ────────────────────────────── */
  console.log(
    '%c🌿 The Vine',
    'color: #5cb85c; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(92,184,92,0.3);'
  );
  console.log(
    '%cWhere Misfits Find Family',
    'color: #d4a843; font-size: 14px; font-style: italic;'
  );
  console.log(
    '%c"I am the vine; you are the branches." — John 15:5',
    'color: #a0a0b0; font-size: 11px;'
  );
  console.log(
    '%cLooking at the source code? We like you already.\nConsider joining Terminal — our Code & Coffee group.\nhello@thevineathens.church',
    'color: #666680; font-size: 11px;'
  );

  /* ── Konami Code Easter Egg ────────────────────────── */
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        // Easter egg: flash the vine green
        document.body.style.transition = 'background 0.5s';
        document.body.style.background = '#1a3a1a';
        setTimeout(() => {
          document.body.style.background = '';
          alert('🎮 Achievement Unlocked: KONAMI CONVERT\n\nYou found the secret code!\nYou\'re definitely one of us.\n\nSee you at Respawn (Friday nights).');
        }, 500);
      }
    } else {
      konamiIndex = 0;
    }
  });

  /* ── Smooth parallax for hero vines ────────────────── */
  const heroVines = document.querySelector('.hero-vines');
  if (heroVines) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroVines.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
        heroVines.style.opacity = Math.max(0.1, 0.5 - scrollY * 0.0005);
      }
    }, { passive: true });
  }

})();