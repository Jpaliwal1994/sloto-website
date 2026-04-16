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

// ── Pricing toggle (Monthly / Annual) ────────────────────
const planToggleBtns = document.querySelectorAll('.plan-toggle-btn');
const planAmount = document.getElementById('planAmount');
const planPeriod = document.getElementById('planPeriod');
const planSub = document.getElementById('planSub');
const planBadge = document.getElementById('planBadge');

const PLANS = {
  monthly: { amount: '€2.99', period: '/ month', sub: 'Billed monthly', badge: false },
  annual:  { amount: '€19.99', period: '/ year', sub: 'Save ~45% vs monthly', badge: true },
};

planToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const plan = PLANS[btn.dataset.plan];
    if (!plan) return;

    planToggleBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active);
    });

    planAmount.textContent = plan.amount;
    planPeriod.textContent = plan.period;
    planSub.textContent = plan.sub;
    planBadge.hidden = !plan.badge;
  });
});

// ── Year in footer ───────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
