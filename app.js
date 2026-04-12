// ── Nav scroll state ─────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile menu ──────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');
menuToggle.addEventListener('click', () => {
  const open = menuPanel.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
menuPanel.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    menuPanel.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll reveal (Intersection Observer) ────────────────
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}

// ── FAQ accordion ────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0';
    }
  });
});

// ── Year in footer ───────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
