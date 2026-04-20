/* ═══════════════════════════════════════════════════════════
   THE VINE (vine2) - Main JavaScript

   Same behavior set as the original site - nav scroll handling,
   mobile hamburger, scroll-reveal observer, contact form demo,
   hero parallax, and a couple of console / Konami easter eggs.
   The only difference here is palette: log colors and form
   feedback colors are pulled into the balanced sage/honey scheme.
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Theme tokens used in inline style updates and console logs.
  var THEME = {
    sage:   '#5a7a52',
    sageHi: '#3d5836',
    honey:  '#d6a35a',
    honeyHi:'#8c6330',
    ink:    '#2a2620',
    muted:  '#7a705f'
  };

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var contactForm = document.getElementById('contact-form');
  var heroVines = document.querySelector('.hero-vines');
  var heroBlooms = document.querySelector('.hero-blooms');
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-link');

  /* ─── Mobile menu toggle ────────────────────────────── */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var wasOpen = navLinks.classList.contains('open');
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(!wasOpen));
    });

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── Unified scroll handler ────────────────────────── */
  var parallaxFrameRequested = false;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    // Nav background frosting once the page leaves the very top.
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 50);
    }

    // Active-section highlighting in nav.
    var adjustedScroll = scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (adjustedScroll >= top && adjustedScroll < top + height) {
        navAnchors.forEach(function (anchor) {
          anchor.classList.remove('active');
          if (anchor.getAttribute('href') === '#' + id) {
            anchor.classList.add('active');
          }
        });
      }
    });

    // Gentle hero parallax on the vines + opposite drift on blooms.
    if (scrollY < window.innerHeight && !parallaxFrameRequested) {
      parallaxFrameRequested = true;
      window.requestAnimationFrame(function () {
        if (heroVines) {
          heroVines.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
          heroVines.style.opacity = Math.max(0.15, 0.55 - scrollY * 0.0005);
        }
        if (heroBlooms) {
          heroBlooms.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
        }
        parallaxFrameRequested = false;
      });
    }
  }, { passive: true });

  /* ─── Scroll reveal via IntersectionObserver ────────── */
  var revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ─── Contact form (demo only) ──────────────────────── */
  var formResetTimerId = null;
  var noteResetTimerId = null;

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(contactForm);
      var data = Object.fromEntries(formData.entries());

      var btn = contactForm.querySelector('button[type="submit"]');
      var note = contactForm.querySelector('.form-note');
      if (!btn || !note) return;

      if (formResetTimerId) { clearTimeout(formResetTimerId); formResetTimerId = null; }
      if (noteResetTimerId) { clearTimeout(noteResetTimerId); noteResetTimerId = null; }

      var originalHTML = btn.innerHTML;

      btn.innerHTML = '<span>Sent! \u2713</span>';
      btn.style.background = 'linear-gradient(135deg, ' + THEME.sage + ', #5e8a5b)';
      btn.disabled = true;

      note.textContent = 'Thanks, ' + (data.name || 'friend') + "! We'll be in touch soon.";
      note.style.color = THEME.sage;

      formResetTimerId = setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
        formResetTimerId = null;

        noteResetTimerId = setTimeout(function () {
          note.textContent = 'We respect your privacy. No spam. No mailing list unless you ask.';
          note.style.color = '';
          noteResetTimerId = null;
        }, 2000);
      }, 4000);

      // Demo log; wire to a real backend (Netlify / Formspree / API) in production.
      console.log('%c\uD83C\uDF43 The Vine - New Connection', 'color: ' + THEME.sage + '; font-size: 14px; font-weight: bold;');
      console.log('%cName: ' + data.name, 'color: ' + THEME.muted + ';');
      console.log('%cEmail: ' + data.email, 'color: ' + THEME.muted + ';');
      console.log('%cInterest: ' + (data.interest || 'Not specified'), 'color: ' + THEME.muted + ';');
      console.log('%cMessage: ' + (data.message || 'No message'), 'color: ' + THEME.muted + ';');
    });
  }

  /* ─── Console branding ──────────────────────────────── */
  console.log(
    '%c\uD83C\uDF43 The Vine',
    'color: ' + THEME.sage + '; font-size: 26px; font-weight: bold; font-family: Georgia, serif; text-shadow: 0 2px 8px rgba(90,122,82,0.25);'
  );
  console.log(
    '%cWhere Misfits Find Family',
    'color: ' + THEME.honey + '; font-size: 15px; font-style: italic; font-family: Georgia, serif;'
  );
  console.log(
    '%c"I am the vine; you are the branches." - John 15:5',
    'color: ' + THEME.muted + '; font-size: 11px;'
  );
  console.log(
    '%cPoking around in the source? Lovely. Pull up a chair.\nConsider joining Terminal - our Code & Coffee group.\nhello@thevineathens.church',
    'color: ' + THEME.ink + '; font-size: 11px;'
  );

  /* ─── Konami code easter egg ─────────────────────────
     Up Up Down Down Left Right Left Right B A
     Triggers a soft sage flash + Respawn invitation. */
  var konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  var konamiIndex = 0;

  document.addEventListener('keydown', function (e) {
    var pressedKey = e.key;
    var expectedKey = konamiSequence[konamiIndex];
    var isMatch = pressedKey === expectedKey
      || pressedKey.toLowerCase() === expectedKey.toLowerCase();

    if (isMatch) {
      konamiIndex++;

      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;

        document.body.style.transition = 'background 0.5s';
        document.body.style.background = '#dce7d5';

        setTimeout(function () {
          document.body.style.background = '';
          document.body.style.transition = '';

          alert(
            '\uD83C\uDF43 Achievement Unlocked: KONAMI CONVERT\n\n'
            + 'You found the secret code!\n'
            + "You're definitely one of us.\n\n"
            + 'See you at Respawn (Friday nights).'
          );
        }, 500);
      }
    } else {
      konamiIndex = 0;
    }
  });

});
