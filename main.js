(function () {
  'use strict';

  // Tells the inline head script that reveal is under control here.
  document.documentElement.classList.add('reveal-ready');

  // Scroll reveal
  var revealables = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAll() {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

    revealables.forEach(function (el) { io.observe(el); });

    // Anything already in the viewport reveals immediately, without waiting
    // for the observer's first async callback.
    requestAnimationFrame(function () {
      revealables.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
    });
  }

  // Mobile nav
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  function close() {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
