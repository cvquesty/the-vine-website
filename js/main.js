/* ═══════════════════════════════════════════════════════════
   THE VINE (vine3) - Main JavaScript

   Editorial-magazine edition. Same behavior contract as the
   prior versions - nav scroll handling, mobile hamburger,
   scroll-reveal observer, contact form demo, console branding,
   and Konami code easter egg - just retuned for the rust/ink/
   newsprint palette.
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Theme tokens used in inline style updates and console logs.
  var THEME = {
    rust:    '#c8553d',
    rustHi:  '#a44427',
    teal:    '#2a5f5b',
    gold:    '#b88828',
    ink:     '#1f1d18',
    paper:   '#f4ede0',
    muted:   '#6b6556'
  };

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var contactForm = document.getElementById('contact-form');
  var sections = document.querySelectorAll('section[id], header[id]');
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

  /* ─── Scroll handler: nav state + active section ──── */
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 30);
    }

    var adjustedScroll = scrollY + 160;
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
  }, { passive: true });

  /* ─── Scroll reveal via IntersectionObserver ────── */
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

  /* ─── Contact form (demo only) ──────────────────── */
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

      btn.innerHTML = '<span>Posted! \u2713</span>';
      btn.style.background = THEME.teal;
      btn.style.borderColor = THEME.teal;
      btn.style.boxShadow = '4px 4px 0 ' + THEME.ink;
      btn.disabled = true;

      note.textContent = 'Letter received, ' + (data.name || 'friend') + '. We will be in touch soon.';
      note.style.color = THEME.teal;

      formResetTimerId = setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        contactForm.reset();
        formResetTimerId = null;

        noteResetTimerId = setTimeout(function () {
          note.textContent = 'We respect your privacy. No spam. No mailing list unless you ask.';
          note.style.color = '';
          noteResetTimerId = null;
        }, 2000);
      }, 4000);

      // Demo log; wire to Netlify / Formspree / API in production.
      console.log('%c\u2709 The Vine Gazette - New Letter', 'color: ' + THEME.rust + '; font-size: 14px; font-weight: bold; font-family: Georgia, serif;');
      console.log('%cFrom: ' + (data.name || '(unsigned)'), 'color: ' + THEME.muted + ';');
      console.log('%cReply to: ' + data.email, 'color: ' + THEME.muted + ';');
      console.log('%cInterest: ' + (data.interest || 'Not specified'), 'color: ' + THEME.muted + ';');
      console.log('%cMessage: ' + (data.message || 'No message'), 'color: ' + THEME.muted + ';');
    });
  }

  /* ─── Console branding ──────────────────────────── */
  console.log(
    '%cTHE VINE',
    'color: ' + THEME.ink + '; background: ' + THEME.paper + '; font-size: 32px; font-weight: 900; font-style: italic; font-family: Georgia, serif; padding: 4px 12px; border-left: 4px solid ' + THEME.rust + ';'
  );
  console.log(
    '%cIssue N\u00B0 01 \u2014 Athens, Tennessee \u2014 Est. 2025',
    'color: ' + THEME.rustHi + '; font-size: 11px; font-family: ui-monospace, Menlo, monospace; letter-spacing: 2px;'
  );
  console.log(
    '%c"I am the vine; you are the branches." \u2014 John 15:5',
    'color: ' + THEME.muted + '; font-size: 12px; font-family: Georgia, serif; font-style: italic;'
  );
  console.log(
    '%cReading the source? Lovely. Pull up a chair.\nConsider joining Terminal \u2014 our Code & Coffee group.\nhello@thevineathens.church',
    'color: ' + THEME.ink + '; font-size: 11px;'
  );

  /* ─── Konami code easter egg ────────────────────
     Up Up Down Down Left Right Left Right B A
     Triggers a brief rust ink-flash + Respawn invitation. */
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
        document.body.style.background = THEME.rust;

        setTimeout(function () {
          document.body.style.background = '';
          document.body.style.transition = '';

          alert(
            '\u2606 Achievement Unlocked: KONAMI CONVERT\n\n'
            + 'You found the secret code!\n'
            + 'You are definitely one of us.\n\n'
            + 'See you at Respawn (Friday nights).'
          );
        }, 500);
      }
    } else {
      konamiIndex = 0;
    }
  });

});
