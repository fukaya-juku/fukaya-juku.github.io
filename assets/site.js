(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menu drawer
  var btn = document.querySelector('.menu-btn');
  var drawer = document.getElementById('drawer');
  if (btn && drawer) {
    btn.addEventListener('click', function () {
      var open = drawer.hasAttribute('hidden');
      if (open) drawer.removeAttribute('hidden'); else drawer.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hasAttribute('hidden')) { drawer.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) { drawer.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', 'false'); } });
  }

  // sliders
  function step(track, dir) {
    var slide = track.children[0];
    if (!slide) return;
    var w = slide.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    var max = track.scrollWidth - track.clientWidth - 2;
    if (dir > 0 && track.scrollLeft >= max) track.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
    else if (dir < 0 && track.scrollLeft <= 2) track.scrollTo({ left: track.scrollWidth, behavior: reduce ? 'auto' : 'smooth' });
    else track.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
  }
  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var track = root.querySelector('.sl-track, .hs-track');
    var timer = null;
    var playBtn = root.querySelector('[data-play]');
    var auto = root.hasAttribute('data-auto') && !reduce;
    function play() { stop(); timer = setInterval(function () { step(track, 1); }, 4500); if (playBtn) { playBtn.setAttribute('aria-pressed', 'true'); playBtn.setAttribute('aria-label', '自動再生を止める'); } }
    function stop() { if (timer) clearInterval(timer); timer = null; if (playBtn) { playBtn.setAttribute('aria-pressed', 'false'); playBtn.setAttribute('aria-label', '自動再生する'); } }
    var prev = root.querySelector('[data-prev]'), next = root.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { stop(); step(track, -1); });
    if (next) next.addEventListener('click', function () { stop(); step(track, 1); });
    if (playBtn) playBtn.addEventListener('click', function () { timer ? stop() : play(); });
    // 何枚目かを表示（例：3 / 10）
    var n = track.children.length;
    if (root.classList.contains('slider') && n > 1 && prev) {
      var count = document.createElement('span');
      count.className = 'sl-count';
      prev.after(count);
      var upd = function () {
        var s = track.children[0], w = s.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
        var i = Math.min(n, Math.round(track.scrollLeft / w) + 1);
        count.textContent = i + ' / ' + n;
      };
      track.addEventListener('scroll', upd, { passive: true }); upd();
    }
    if (auto) {
      play();
      root.addEventListener('mouseenter', stop);
      root.addEventListener('focusin', stop);
      track.addEventListener('touchstart', stop, { passive: true });
    }
  });

  // image zoom (lightbox)
  var lb = document.getElementById('lb');
  if (lb) {
    var lbImg = lb.querySelector('img'), lbClose = lb.querySelector('.lb-close'), lastFocus = null;
    function closeLb() { lb.setAttribute('hidden', ''); lb.classList.remove('big'); lbImg.removeAttribute('src'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-zoom]');
      if (!a) return;
      e.preventDefault();
      lastFocus = a;
      var small = a.querySelector('img');
      lbImg.src = a.getAttribute('href');
      lbImg.alt = small ? small.alt : '';
      lb.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    });
    lbImg.addEventListener('click', function () { lb.classList.toggle('big'); });
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-scroll')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hasAttribute('hidden')) closeLb(); });
  }

  // back to top
  var bt = document.querySelector('.back-top');
  if (bt) {
    var onScroll = function () { bt.classList.toggle('show', window.scrollY > 600); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
