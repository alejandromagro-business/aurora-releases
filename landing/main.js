// Everything the page does after it has loaded.
//
// Out of the HTML and into its own file so the Content-Security-Policy can say
// script-src 'self' and mean it. An inline script forces either 'unsafe-inline',
// which is most of the protection gone, or a hash that has to be regenerated on
// every edit and silently breaks the page when somebody forgets.

  // The copyright year, on whichever pages have one.
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

  // Scroll reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
  document.querySelectorAll('.obs').forEach((el) => io.observe(el));

  // Screenshot parallax: each shot drifts by its own small factor as it
  // crosses the viewport. Read positions and write transforms inside one
  // rAF frame, so scrolling never has to wait on layout.
  const shots = [...document.querySelectorAll('.shot img')].map((img) => ({
    img, depth: parseFloat(img.closest('.shot').dataset.depth) || 0.06,
  }));
  if (shots.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let queued = false;
    const draw = () => {
      queued = false;
      const mid = innerHeight / 2;
      for (const s of shots) {
        const r = s.img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        s.img.style.transform = `translate3d(0,${((r.top + r.height / 2 - mid) * -s.depth).toFixed(1)}px,0)`;
      }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(draw); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    draw();
  }

// ---------- mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setOpen(nav.classList.contains('open') === false));
  // Any destination closes it: leaving a menu covering the thing you just
  // asked to see is the most common way this gets built wrong.
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
  });
}

// ---------- back to top ----------
const toTop = document.getElementById('toTop');
if (toTop) {
  toTop.addEventListener('click', () => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}

// ---------- sticky call to action, and when to show either of them ----------
const stickyCta = document.getElementById('stickyCta');
// Watching the pricing section rather than a scroll position: the bar exists to
// send you to the prices, so it has nothing to say while they are on screen.
let pricingVisible = false;
const pricing = document.getElementById('pricing');
if (pricing) {
  new IntersectionObserver(([e]) => {
    pricingVisible = e.isIntersecting;
    paint();
  }, { threshold: 0 }).observe(pricing);
}

function paint() {
  const past = scrollY > innerHeight * 0.7;
  if (toTop) toTop.classList.toggle('show', past);
  if (stickyCta) stickyCta.classList.toggle('show', past && !pricingVisible);
}
let painting = false;
addEventListener('scroll', () => {
  if (painting) return;
  painting = true;
  requestAnimationFrame(() => { painting = false; paint(); });
}, { passive: true });
paint();
