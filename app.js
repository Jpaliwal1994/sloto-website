/* ============================================================
   sloto. — Shared JavaScript
   Applies to: index.html, investors.html, legal.html, delete-account.html
   ============================================================ */

/* REVEAL ANIMATION (index.html, investors.html)
   Triggers .visible on .reveal elements as they scroll into view */
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

/* DOT FIELD ANIMATION (index.html only)
   Populates #dotField with floating coloured dots */
(function(){
  var f = document.getElementById('dotField');
  if (!f) return;
  var c = ['#22C55E','#22C55E','#22C55E','#EF4444','#9CA3AF'];
  for (var i = 0; i < 20; i++){
    var d = document.createElement('div');
    d.className = 'dot';
    var s = 4 + Math.random() * 7;
    var col = c[Math.floor(Math.random() * c.length)];
    d.style.cssText =
      'width:' + s + 'px;height:' + s + 'px;background:' + col + ';' +
      'left:' + (Math.random() * 100) + '%;' +
      'top:' + (10 + Math.random() * 80) + '%;' +
      'animation-duration:' + (8 + Math.random() * 10) + 's;' +
      'animation-delay:' + (Math.random() * 12) + 's;';
    f.appendChild(d);
  }
})();

/* TAB SWITCHER (legal.html only)
   Toggles between Privacy Policy and Terms & Conditions */
function show(id, el){
  document.querySelectorAll('.doc').forEach(function(d){ d.classList.remove('visible'); });
  document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
  document.getElementById(id).classList.add('visible');
  el.classList.add('active');
}
