(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    var nav = document.querySelector('.lx-nav');
    function onScroll() {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var toggler = document.querySelector('.navbar-toggler');
    var navItems = document.getElementById('navItems');
    function setMenu(open) {
      if (!navItems) return;
      navItems.classList.toggle('show', open);
      document.body.classList.toggle('menu-open', open);
      if (toggler) toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (toggler && navItems) {
      toggler.addEventListener('click', function (e) {
        e.preventDefault();
        setMenu(!navItems.classList.contains('show'));
      });
      navItems.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) setMenu(false);
      });
    }

    window.__lxReveal = true;
    var reveals = document.querySelectorAll('.lx-reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    function countUp(el) {
      var to = parseInt(el.getAttribute('data-to'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1500, start = null;
      function tick(now) {
        if (!start) start = now;
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * to).toLocaleString('en-US') + (p < 1 ? '' : suffix);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = to.toLocaleString('en-US') + suffix;
      }
      requestAnimationFrame(tick);
    }
    var nums = document.querySelectorAll('[data-to]');
    if ('IntersectionObserver' in window) {
      var nio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); nio.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      nums.forEach(function (el) { nio.observe(el); });
    } else {
      nums.forEach(function (el) { countUp(el); });
    }

  });
})();
