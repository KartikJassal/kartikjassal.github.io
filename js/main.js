/* ============================================================
   MAIN.JS v2 — Spacecraft Engineering Portfolio
   ============================================================ */

'use strict';

// ============================================================
// SITE OPTIONS
// Set animateBackground to false to keep the background artwork static.
// Set respectReducedMotion to true to disable background motion automatically
// when the visitor enables reduced motion in their operating system.
// ============================================================
const PORTFOLIO_OPTIONS = {
  animateBackground: true,
  respectReducedMotion: false,
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionBlockedByPreference = PORTFOLIO_OPTIONS.respectReducedMotion && prefersReducedMotion;
const backgroundAnimationEnabled = PORTFOLIO_OPTIONS.animateBackground && !motionBlockedByPreference;
const backgroundAnimationStatus = backgroundAnimationEnabled
  ? 'enabled'
  : motionBlockedByPreference ? 'reduced-motion' : 'disabled';

window.PORTFOLIO_OPTIONS = PORTFOLIO_OPTIONS;
document.documentElement.dataset.backgroundAnimation = backgroundAnimationStatus;
document.documentElement.classList.toggle('background-animation-enabled', backgroundAnimationEnabled);
document.documentElement.classList.toggle('background-animation-disabled', !backgroundAnimationEnabled);

// Ensure directory URLs end with a trailing slash so relative links resolve
// correctly on GitHub Pages project sites (e.g., /RepoName/ not /RepoName).
(function ensureTrailingSlashForDirectoryUrls() {
  const { origin, pathname, search, hash } = window.location;
  const isFilePath = /\/[^/]+\.[^/]+$/.test(pathname);

  if (!isFilePath && !pathname.endsWith('/')) {
    window.location.replace(`${origin}${pathname}/${search}${hash}`);
  }
})();

// ============================================================
// STARFIELD — denser, faint star-map with occasional bright stars
// ============================================================
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars, signalTrails;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    // Main field — small, faint
    const field = Array.from({ length: 280 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.9 + 0.2,
      a: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      dx: Math.random() * 0.045 + 0.012,
      dy: Math.random() * 0.022 + 0.005,
      bright: false,
    }));
    // Accent stars — larger, slightly colored
    const bright = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.8,
      a: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.002 + 0.0005,
      phase: Math.random() * Math.PI * 2,
      dx: Math.random() * 0.032 + 0.008,
      dy: Math.random() * 0.016 + 0.004,
      bright: true,
    }));
    stars = [...field, ...bright];

    // Sparse telemetry-like trails that cross the sky at long intervals.
    signalTrails = [
      { y: 0.18, duration: 8, offset: 0, color: '0, 200, 232' },
      { y: 0.48, duration: 11, offset: 3, color: '180, 220, 255' },
      { y: 0.72, duration: 13, offset: 7, color: '232, 160, 32' },
    ];
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const now = performance.now() * 0.001;
    stars.forEach(s => {
      const alpha = s.a * (0.55 + 0.45 * Math.sin(now * s.speed * 60 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.bright) {
        // Slightly blue-tinted bright stars
        ctx.fillStyle = `rgba(180, 220, 255, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(160, 200, 240, ${alpha * 0.7})`;
      }
      ctx.fill();

      if (backgroundAnimationEnabled) {
        s.x = (s.x + s.dx) % W;
        s.y = (s.y + s.dy) % H;
      }
    });

    if (backgroundAnimationEnabled) {
      signalTrails.forEach(trail => {
        const phase = ((now + trail.offset) % trail.duration) / trail.duration;
        // The trail is visible for only a short portion of each cycle.
        if (phase > 0.42) return;
        const progress = phase / 0.42;
        const x = -140 + progress * (W + 280);
        const y = H * trail.y + progress * 52;
        const gradient = ctx.createLinearGradient(x - 120, y - 24, x, y);
        gradient.addColorStop(0, `rgba(${trail.color}, 0)`);
        gradient.addColorStop(1, `rgba(${trail.color}, 0.58)`);
        ctx.beginPath();
        ctx.moveTo(x - 120, y - 24);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.35;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${trail.color}, 0.9)`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
  }

  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });
})();


// ============================================================
// ORBITAL ARC OVERLAY — SVG arcs injected into background layer
// ============================================================
(function initOrbitalOverlay() {
  const container = document.getElementById('orbital-overlay');
  if (!container) return;

  // Large sweeping arcs — inspired by star map / navigational overlays
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 1440 900');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

  const arcs = [
    // Large primary arc — upper right origin
    { cx: 1100, cy: -80, rx: 820, ry: 820, rotate: 15,  stroke: '#00c8e8', sw: 0.8, dash: '' },
    // Secondary offset arc
    { cx: 1200, cy: 100, rx: 640, ry: 640, rotate: -8,  stroke: '#00c8e8', sw: 0.5, dash: '4 12' },
    // Lower-left arc
    { cx: -120, cy: 900, rx: 600, ry: 600, rotate: 22,  stroke: '#00c8e8', sw: 0.6, dash: '' },
    // Amber navigational arc — wide, faint
    { cx: 720,  cy: 980, rx: 950, ry: 950, rotate: 0,   stroke: '#e8a020', sw: 0.5, dash: '2 16' },
    // Fine grid arc — far right
    { cx: 1500, cy: 450, rx: 480, ry: 280, rotate: -20, stroke: '#00c8e8', sw: 0.4, dash: '1 20' },
  ];

  arcs.forEach(a => {
    const ellipse = document.createElementNS(svgNS, 'ellipse');
    ellipse.setAttribute('cx', a.cx);
    ellipse.setAttribute('cy', a.cy);
    ellipse.setAttribute('rx', a.rx);
    ellipse.setAttribute('ry', a.ry);
    ellipse.setAttribute('fill', 'none');
    ellipse.setAttribute('stroke', a.stroke);
    ellipse.setAttribute('stroke-width', a.sw);
    if (a.dash) ellipse.setAttribute('stroke-dasharray', a.dash);
    if (a.rotate) ellipse.setAttribute('transform', `rotate(${a.rotate} ${a.cx} ${a.cy})`);
    svg.appendChild(ellipse);
  });

  // Fine measurement tick marks along one arc
  const tickGroup = document.createElementNS(svgNS, 'g');
  tickGroup.setAttribute('stroke', '#00c8e8');
  tickGroup.setAttribute('stroke-width', '0.5');
  tickGroup.setAttribute('opacity', '0.5');
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const r = 820;
    const cx = 1100, cy = -80;
    const x1 = cx + (r - 8)  * Math.cos(angle);
    const y1 = cy + (r - 8)  * Math.sin(angle);
    const x2 = cx + (r + 8)  * Math.cos(angle);
    const y2 = cy + (r + 8)  * Math.sin(angle);
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', x1.toFixed(1)); line.setAttribute('y1', y1.toFixed(1));
    line.setAttribute('x2', x2.toFixed(1)); line.setAttribute('y2', y2.toFixed(1));
    svg.appendChild(line);
  }
  svg.appendChild(tickGroup);

  // Crosshair node markers at arc intersections
  const nodes = [
    { x: 680, y: 190 },
    { x: 320, y: 560 },
    { x: 1080, y: 640 },
  ];
  nodes.forEach(n => {
    const g = document.createElementNS(svgNS, 'g');
    // Circle
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', n.x); c.setAttribute('cy', n.y); c.setAttribute('r', '3');
    c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#00c8e8'); c.setAttribute('stroke-width', '0.8');
    // Cross
    const h = document.createElementNS(svgNS, 'line');
    h.setAttribute('x1', n.x - 10); h.setAttribute('y1', n.y);
    h.setAttribute('x2', n.x + 10); h.setAttribute('y2', n.y);
    h.setAttribute('stroke', '#00c8e8'); h.setAttribute('stroke-width', '0.5');
    const v = document.createElementNS(svgNS, 'line');
    v.setAttribute('x1', n.x); v.setAttribute('y1', n.y - 10);
    v.setAttribute('x2', n.x); v.setAttribute('y2', n.y + 10);
    v.setAttribute('stroke', '#00c8e8'); v.setAttribute('stroke-width', '0.5');
    g.appendChild(c); g.appendChild(h); g.appendChild(v);
    svg.appendChild(g);
  });

  container.appendChild(svg);
})();


// ============================================================
// HEADER — scroll hide/show + scrolled state
// ============================================================
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    header.classList.toggle('hidden', y > lastY && y > 100);
    lastY = y;
  }, { passive: true });
})();


// ============================================================
// MOBILE NAV
// ============================================================
(function initMobileNav() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  let open = false;

  function toggle() {
    open = !open;
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  }

  btn.addEventListener('click', toggle);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', toggle));
  document.addEventListener('keydown', (e) => {
    if (open && e.key === 'Escape') toggle();
  });
})();


// ============================================================
// SCROLL REVEAL — staggered by group
// ============================================================
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Find sibling reveals and stagger them
        const siblings = e.target.parentElement
          ? [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
          : [];
        const idx = siblings.indexOf(e.target);
        e.target.style.transitionDelay = `${Math.min(idx, 5) * 70}ms`;
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => io.observe(el));
})();


// ============================================================
// ACTIVE NAV HIGHLIGHT on scroll
// ============================================================
(function initActiveNav() {
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('.header-nav a[href*="#"]')];
  if (!sections.length || !links.length) return;

  let ticking = false;

  function updateActiveNav() {
    // Use a reading line below the fixed header instead of a percentage of
    // each section. Percentage-based observers fail when a section is taller
    // than the viewport (such as Career).
    const header = document.getElementById('site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const readingLine = window.scrollY + headerHeight + Math.min(window.innerHeight * 0.24, 180);

    let currentSection = null;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= readingLine) currentSection = section;
    });

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const targetId = href.includes('#') ? href.split('#').pop() : '';
      const isActive = Boolean(currentSection && targetId === currentSection.id);
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
    });

    ticking = false;
  }

  function scheduleUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActiveNav);
  }

  updateActiveNav();
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
})();


// ============================================================
// HUD TELEMETRY — cycle placeholder values in hero
// (only cosmetic; replace with real content in production)
// ============================================================
(function initTelemetry() {
  const items = document.querySelectorAll('.hero-telem-item .val');
  if (!items.length) return;

  const datasets = [
    ['LEO', 'GEO', 'HEO'],
    ['401 km', '385 km', '420 km'],
    ['5.7°', '5.2°', '6.1°'],
  ];

  let tick = 0;
  setInterval(() => {
    tick = (tick + 1) % 3;
    items.forEach((el, i) => {
      if (datasets[i]) el.textContent = datasets[i][tick];
    });
  }, 3200);
})();


// ============================================================
// SMOOTH ANCHOR SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ============================================================
// KEYBOARD ACCESSIBILITY for clickable cards
// ============================================================
document.querySelectorAll('[role="button"]').forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});

// Keep the rubric-required identity and update date consistent on every page.
(function standardizePortfolioFooter() {
  const copy = document.querySelector('.footer-copy');
  if (!copy) return;
  copy.textContent = '© 2026 Kartik Jassal · kartikj@my.yorku.ca · Last updated: July 13, 2026';
})();
