/* ═══════════════════════════════════════════════════════════════
   LALITHAM ACADEMY — script.js
   Features:
     • Sticky navbar with glassmorphism on scroll
     • Mobile hamburger menu
     • Smooth scrolling with active nav link tracking
     • Scroll-reveal animations
     • Animated stat counters
     • Contact form validation
     • Button ripple effects
     • Back-to-top button
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── HELPERS ────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── DOM REFS ───────────────────────────────────────────────── */
const navbar     = $('#navbar');
const hamburger  = $('#hamburger');
const navLinks   = $('#navLinks');
const navAnchors = $$('.nav-link', navLinks);
const backToTop  = $('#backToTop');
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');
const submitBtn   = $('#submitBtn');

/* ═══════════════════════════════════════════════════════════════
   1. NAVBAR — scroll + hamburger
   ═══════════════════════════════════════════════════════════════ */

function handleNavbarScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Hamburger toggle
function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);

// Close on nav link click
navAnchors.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    hamburger.focus();
  }
});

/* ═══════════════════════════════════════════════════════════════
   2. SMOOTH SCROLL + ACTIVE NAV HIGHLIGHTING
   ═══════════════════════════════════════════════════════════════ */

// Smooth scroll for all internal links
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const offset = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--navbar-h') || '72', 10);
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const hash = anchor.getAttribute('href');
    if (hash === '#') return;
    const id = hash.slice(1);
    if (document.getElementById(id)) {
      e.preventDefault();
      smoothScrollTo(id);
    }
  });
});

// Active nav link on scroll (IntersectionObserver)
const sections = $$('main section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  }
);

sections.forEach(sec => sectionObserver.observe(sec));

/* ═══════════════════════════════════════════════════════════════
   3. SCROLL REVEAL ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */

const revealElements = $$('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings for a cascade effect
        const siblings = [...entry.target.parentElement.children].filter(
          el => el.classList.contains('reveal')
        );
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════════
   4. ANIMATED STAT COUNTERS
   ═══════════════════════════════════════════════════════════════ */

function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const duration = 1800; // ms
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-quad
    const eased = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statNums = $$('.stat__num');
let countersStarted = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries.some(e => e.isIntersecting) && !countersStarted) {
      countersStarted = true;
      statNums.forEach(animateCounter);
      statsObserver.disconnect();
    }
  },
  { threshold: 0.5 }
);

const statsSection = $('.hero__stats');
if (statsSection) statsObserver.observe(statsSection);

/* ═══════════════════════════════════════════════════════════════
   5. BACK TO TOP BUTTON
   ═══════════════════════════════════════════════════════════════ */

function handleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ═══════════════════════════════════════════════════════════════
   6. SCROLL EVENT — throttled
   ═══════════════════════════════════════════════════════════════ */

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleNavbarScroll();
      handleBackToTop();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Run once on load
handleNavbarScroll();
handleBackToTop();

/* ═══════════════════════════════════════════════════════════════
   7. CONTACT FORM VALIDATION
   ═══════════════════════════════════════════════════════════════ */

const validators = {
  name: {
    el: () => $('#name'),
    err: () => $('#nameError'),
    validate(val) {
      if (!val.trim()) return 'Name is required.';
      if (val.trim().length < 2) return 'Name must be at least 2 characters.';
      return '';
    }
  },
  phone: {
    el: () => $('#phone'),
    err: () => $('#phoneError'),
    validate(val) {
      if (!val.trim()) return 'Phone number is required.';
      const digits = val.replace(/\D/g, '');
      if (digits.length < 10) return 'Enter a valid 10-digit mobile number.';
      return '';
    }
  },
  grade: {
    el: () => $('#grade'),
    err: () => $('#gradeError'),
    validate(val) {
      if (!val) return "Please select your child's grade.";
      return '';
    }
  },
  course: {
    el: () => $('#course'),
    err: () => $('#courseError'),
    validate(val) {
      if (!val) return 'Please select a course of interest.';
      return '';
    }
  }
};

function showError(field, msg) {
  const input = field.el();
  const errEl = field.err();
  errEl.textContent = msg;
  input.classList.toggle('error', !!msg);
}

function validateField(key) {
  const field = validators[key];
  const val   = field.el().value;
  const msg   = field.validate(val);
  showError(field, msg);
  return !msg;
}

// Live validation on blur
Object.keys(validators).forEach(key => {
  const input = validators[key].el();
  if (input) {
    input.addEventListener('blur',   () => validateField(key));
    input.addEventListener('input',  () => {
      // Clear error as soon as user types
      if (input.classList.contains('error')) validateField(key);
    });
  }
});

// Form submit
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const allValid = Object.keys(validators).every(validateField);
    if (!allValid) return;

    // Simulate send (loading state)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      // Success state
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Enquiry';
      formSuccess.classList.add('show');
      contactForm.reset();

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Hide success after 6 seconds
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    }, 1200);
  });
}

/* ═══════════════════════════════════════════════════════════════
   8. RIPPLE EFFECT (JS-enhanced)
   ═══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect   = btn.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const ripple = document.createElement('span');

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      width: 0; height: 0;
      left: ${x}px; top: ${y}px;
      transform: translate(-50%, -50%);
      animation: jsRipple 0.55s ease-out forwards;
      pointer-events: none;
    `;

    // Inject keyframe once
    if (!document.getElementById('jsRippleStyle')) {
      const style = document.createElement('style');
      style.id = 'jsRippleStyle';
      style.textContent = `
        @keyframes jsRipple {
          to { width: 400px; height: 400px; opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

/* ═══════════════════════════════════════════════════════════════
   9. PRICING / COURSE CARD HOVER TILT (subtle 3D)
   ═══════════════════════════════════════════════════════════════ */

function addTiltEffect(selector) {
  $$(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 → 0.5
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotateX = y * -6;   // degrees
      const rotateY = x *  6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Only on non-touch devices
if (!window.matchMedia('(hover: none)').matches) {
  addTiltEffect('.feature-card');
  addTiltEffect('.step');
}

/* ═══════════════════════════════════════════════════════════════
   10. PHONE INPUT — auto-format
   ═══════════════════════════════════════════════════════════════ */

const phoneInput = $('#phone');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    // Strip non-digits
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
  });
}

/* ═══════════════════════════════════════════════════════════════
   INIT COMPLETE
   ═══════════════════════════════════════════════════════════════ */
console.log('%c Lalitham Academy %c Loaded ✓',
  'background:#7c3aed;color:#fff;padding:4px 10px;border-radius:4px 0 0 4px;font-weight:bold;',
  'background:#22c55e;color:#fff;padding:4px 10px;border-radius:0 4px 4px 0;font-weight:bold;'
);
