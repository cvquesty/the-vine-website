/* ═══════════════════════════════════════════════════════════
   THE VINE — Main JavaScript

   This is the sole JavaScript file for The Vine church website.
   It handles navigation behavior, scroll-driven animations,
   contact form submission, and a couple of developer Easter eggs.

   The entire script is wrapped inside a DOMContentLoaded listener
   so that it runs safely regardless of where the <script> tag is
   placed (end of <body>, <head> with defer, etc.). Inside that
   listener, everything lives within an IIFE to avoid polluting
   the global scope.
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     DOM ELEMENT REFERENCES

     We grab all the critical elements up front and perform
     null-safety checks immediately. If any of these elements
     are missing from the page (due to an HTML typo, a partial
     render, or a future refactor that removes an ID), we bail
     out of the relevant feature rather than letting the whole
     script crash with an uncaught TypeError.
     ───────────────────────────────────────────────────────── */

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const contactForm = document.getElementById('contact-form');
  const heroVines = document.querySelector('.hero-vines');

  /*
   * All section elements that have an id attribute. These are
   * used by the scroll handler below to determine which section
   * is currently in the viewport so we can highlight the
   * corresponding navigation link.
   */
  const sections = document.querySelectorAll('section[id]');

  /*
   * All navigation anchor links. We will toggle an "active"
   * class on these to visually indicate the current section.
   */
  const navAnchors = document.querySelectorAll('.nav-link');

  /* ─────────────────────────────────────────────────────────
     MOBILE MENU TOGGLE

     The hamburger button (three horizontal bars) is only
     visible at screen widths of 650px or below (controlled by
     the CSS media query). When tapped, it toggles the "active"
     class on itself — which triggers the CSS animation that
     morphs the three bars into an "X" — and toggles the "open"
     class on the nav-links container to slide the menu into view.

     We also update the aria-expanded attribute on the button so
     that screen readers can announce whether the menu is
     currently open or closed.
     ───────────────────────────────────────────────────────── */

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isCurrentlyOpen = navLinks.classList.contains('open');

      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');

      /*
       * After toggling, update aria-expanded to reflect the new
       * state. If the menu was open before the click, it is now
       * closed, and vice versa.
       */
      navToggle.setAttribute('aria-expanded', String(!isCurrentlyOpen));
    });

    /*
     * When a visitor taps any navigation link while the mobile
     * menu is open, we close the menu automatically. Without
     * this, the menu would stay open and obscure the section
     * the visitor just navigated to.
     */
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     UNIFIED SCROLL HANDLER

     Rather than attaching three separate scroll event listeners
     (one for the navbar background, one for active-section
     highlighting, and one for the hero parallax), we register a
     single passive scroll listener that dispatches to all three
     concerns in one callback. This reduces the browser's per-
     frame event overhead and keeps scroll performance smooth.

     The parallax section uses requestAnimationFrame to ensure
     that DOM writes (transform + opacity) are batched into the
     browser's next paint cycle instead of happening synchronously
     inside the scroll event, which can cause layout thrashing.
     ───────────────────────────────────────────────────────── */

  let parallaxFrameRequested = false;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    /*
     * NAVBAR BACKGROUND —
     * Once the visitor scrolls more than 50 pixels down from the
     * top of the page, we add the "scrolled" class to the nav
     * element. This causes the CSS to make the nav background
     * more opaque and show a subtle bottom border, giving a clear
     * visual separation between the nav bar and the page content
     * beneath it. When the visitor scrolls back to the top, we
     * remove the class so the nav returns to its transparent state.
     */
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 50);
    }

    /*
     * ACTIVE SECTION HIGHLIGHTING —
     * We loop through every <section> that has an id attribute and
     * check whether the current scroll position (plus a 100-pixel
     * offset to account for the fixed navbar height) falls within
     * that section's vertical bounds. When it does, we add the
     * "active" class to the matching nav link and remove it from
     * all others. This gives visitors a persistent visual cue of
     * where they are on the page as they scroll.
     */
    var adjustedScroll = scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (adjustedScroll >= sectionTop && adjustedScroll < sectionTop + sectionHeight) {
        navAnchors.forEach(function (anchor) {
          anchor.classList.remove('active');
          if (anchor.getAttribute('href') === '#' + sectionId) {
            anchor.classList.add('active');
          }
        });
      }
    });

    /*
     * HERO PARALLAX —
     * As the visitor scrolls down the page, we gently push the
     * decorative vine/circuit SVG background downward at 15% of
     * the scroll speed and fade it out slightly. This creates a
     * subtle depth effect without being distracting. We only apply
     * this while the hero section is still in the viewport (i.e.,
     * scrollY is less than the viewport height) to avoid needless
     * DOM writes once the hero is fully scrolled out of view.
     *
     * We use requestAnimationFrame here to batch the style changes
     * into the browser's next paint cycle. Without this, rapid
     * scroll events could trigger layout recalculations on every
     * single event firing, which causes visible jank on lower-end
     * devices.
     */
    if (heroVines && scrollY < window.innerHeight && !parallaxFrameRequested) {
      parallaxFrameRequested = true;

      window.requestAnimationFrame(function () {
        heroVines.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
        heroVines.style.opacity = Math.max(0.1, 0.5 - scrollY * 0.0005);
        parallaxFrameRequested = false;
      });
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────────────────
     SCROLL-REVEAL ANIMATIONS (IntersectionObserver)

     Elements that carry the data-reveal attribute start out
     invisible (opacity: 0, translated 30px downward — see the
     CSS). As the visitor scrolls and these elements enter the
     viewport, we add the "revealed" class to trigger a smooth
     fade-and-slide-up transition.

     We use IntersectionObserver instead of a scroll-position
     check because it is far more performant — the browser only
     notifies us when an element actually crosses the visibility
     threshold, rather than us polling on every scroll event.

     Once an element has been revealed, we stop observing it
     (observer.unobserve) so the browser can release the
     tracking overhead. The reveal is a one-way animation — we
     never hide elements again once they have appeared.

     If the browser does not support IntersectionObserver (very
     old browsers), we fall back to revealing everything at once
     so the content is never permanently hidden.
     ───────────────────────────────────────────────────────── */

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
      /*
       * threshold: 0.1 means the callback fires once at least
       * 10% of the element is visible. This feels natural — the
       * element starts animating just after its top edge peeks
       * into the viewport.
       *
       * rootMargin: '0px 0px -50px 0px' shrinks the observable
       * area by 50px at the bottom, so elements need to scroll
       * a bit further into view before triggering. This prevents
       * reveals from firing when an element is barely visible at
       * the very bottom edge of the screen.
       */
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback for browsers without IntersectionObserver support:
     * reveal all elements immediately so content is never hidden. */
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ─────────────────────────────────────────────────────────
     CONTACT FORM HANDLING

     The form does not currently submit to a real backend. When
     the visitor clicks "Send It," we prevent the default browser
     submission, show a friendly confirmation message, and log
     the data to the console for demo/development purposes.

     In a production deployment, you would wire this up to a
     service like Netlify Forms, Formspree, EmailJS, or a custom
     API endpoint. The FormData collection below is already
     structured for easy integration with any of those.

     RACE CONDITION GUARD —
     We track an active timer ID so that if the visitor somehow
     manages to submit the form multiple times in rapid
     succession (e.g., double-clicking), we cancel the previous
     reset timer before starting a new one. Without this guard,
     overlapping setTimeout chains would cause the submit button
     to flicker unpredictably between "Sent!" and its default
     state.
     ───────────────────────────────────────────────────────── */

  var formResetTimerId = null;
  var noteResetTimerId = null;

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /*
       * Collect all form field values into a plain object.
       * FormData captures every <input>, <textarea>, and <select>
       * that has a name attribute inside the form.
       */
      var formData = new FormData(contactForm);
      var data = Object.fromEntries(formData.entries());

      var btn = contactForm.querySelector('button[type="submit"]');
      var note = contactForm.querySelector('.form-note');

      if (!btn || !note) {
        return;
      }

      /*
       * Cancel any previously scheduled reset timers. This
       * prevents a race condition where a second submit fires
       * before the first reset completes, which would cause the
       * button and note to jump between states unpredictably.
       */
      if (formResetTimerId) {
        clearTimeout(formResetTimerId);
        formResetTimerId = null;
      }
      if (noteResetTimerId) {
        clearTimeout(noteResetTimerId);
        noteResetTimerId = null;
      }

      /*
       * Save the button's original inner HTML so we can restore
       * it after showing the confirmation state. We capture this
       * fresh each time in case a previous reset cycle was
       * interrupted mid-way.
       */
      var originalHTML = btn.innerHTML;

      /* Show confirmation state on the submit button. */
      btn.innerHTML = '<span>Sent! ✓</span>';
      btn.style.background = '#3a8a3a';
      btn.disabled = true;

      /* Display a personalized thank-you message in the form note. */
      note.textContent = 'Thanks, ' + (data.name || 'friend') + '! We\'ll be in touch soon.';
      note.style.color = '#5cb85c';

      /*
       * After 4 seconds, restore the button to its original state
       * and clear the form fields. Then, after an additional 2
       * seconds, swap the thank-you note back to the default
       * privacy message. The two-stage reset gives the visitor
       * time to read the confirmation before the form resets.
       */
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

      /*
       * Log the submission data to the browser console. This is
       * useful during development and demos. In production, this
       * block can be removed or replaced with an actual HTTP
       * request to a form-handling backend.
       */
      console.log('%c🌿 The Vine — New Connection', 'color: #5cb85c; font-size: 14px; font-weight: bold;');
      console.log('%cName: ' + data.name, 'color: #a0a0b0;');
      console.log('%cEmail: ' + data.email, 'color: #a0a0b0;');
      console.log('%cInterest: ' + (data.interest || 'Not specified'), 'color: #a0a0b0;');
      console.log('%cMessage: ' + (data.message || 'No message'), 'color: #a0a0b0;');
    });
  }

  /* ─────────────────────────────────────────────────────────
     CONSOLE EASTER EGG

     When a developer opens the browser console, they are greeted
     with a styled brand message and a casual invitation to join
     The Vine's Code & Coffee group. This is a common pattern on
     tech-savvy websites and serves as a fun discovery moment for
     anyone poking around in DevTools.
     ───────────────────────────────────────────────────────── */

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

  /* ─────────────────────────────────────────────────────────
     KONAMI CODE EASTER EGG

     The classic Konami cheat code sequence is:
       ↑ ↑ ↓ ↓ ← → ← → B A

     If a visitor types this sequence on their keyboard, the page
     background briefly flashes to a dark green tint and then
     shows a playful "achievement unlocked" alert inviting them
     to the Respawn gaming night.

     We track progress through the sequence with a simple index
     counter. Each keydown event checks whether the pressed key
     matches the expected key at the current index. If it matches,
     we advance; if not, we reset to the beginning of the
     sequence.

     We use the modern e.key property (string-based key names)
     rather than the deprecated e.keyCode (numeric codes) for
     forward compatibility with current and future browser APIs.
     ───────────────────────────────────────────────────────── */

  var konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  var konamiIndex = 0;

  document.addEventListener('keydown', function (e) {
    /*
     * Normalize the comparison to lowercase so that the letter
     * keys ("B" / "b", "A" / "a") match regardless of whether
     * the visitor has Caps Lock on.
     */
    var pressedKey = e.key;
    var expectedKey = konamiSequence[konamiIndex];
    var isMatch = pressedKey === expectedKey
      || pressedKey.toLowerCase() === expectedKey.toLowerCase();

    if (isMatch) {
      konamiIndex++;

      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;

        /*
         * Flash the page background to a dark green tint for
         * half a second, then revert to the default background.
         * We set the transition first so the color change animates
         * smoothly, and we clean up BOTH the transition and the
         * background properties afterward so we don't leave
         * orphaned inline styles on the body element.
         */
        document.body.style.transition = 'background 0.5s';
        document.body.style.background = '#1a3a1a';

        setTimeout(function () {
          document.body.style.background = '';
          document.body.style.transition = '';

          alert(
            '🎮 Achievement Unlocked: KONAMI CONVERT\n\n'
            + 'You found the secret code!\n'
            + 'You\'re definitely one of us.\n\n'
            + 'See you at Respawn (Friday nights).'
          );
        }, 500);
      }
    } else {
      /*
       * If the pressed key does not match the expected key in
       * the sequence, reset the index to zero. The visitor has
       * to start the entire sequence over from the beginning.
       */
      konamiIndex = 0;
    }
  });

}); /* End of DOMContentLoaded listener. */