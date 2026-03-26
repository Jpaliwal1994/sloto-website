/* ============================================================
   sloto. — Shared JavaScript
   Applies to: investors.html, legal.html, delete-account.html
   ============================================================ */

/* REVEAL ANIMATION (investors.html — uses .reveal class)
   Triggers .visible on .reveal elements as they scroll into view.
   index.html uses AOS instead. */
(function(){
  var e = document.querySelectorAll('.reveal');
  if (!e.length) return;
  if (!('IntersectionObserver' in window)) {
    e.forEach(function(x){ x.classList.add('visible'); });
    return;
  }
  var o = new IntersectionObserver(function(en){
    en.forEach(function(x){
      if (x.isIntersecting){ x.target.classList.add('visible'); o.unobserve(x.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
  e.forEach(function(x){ o.observe(x); });
})();

/* TAB SWITCHER (legal.html only)
   Toggles between Privacy Policy and Terms & Conditions */
function show(id, el){
  document.querySelectorAll('.doc').forEach(function(d){ d.classList.remove('visible'); });
  document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
  document.getElementById(id).classList.add('visible');
  el.classList.add('active');
}
