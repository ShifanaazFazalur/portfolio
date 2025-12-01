// script.js

document.addEventListener('DOMContentLoaded', function () {
  /* ========== MOBILE NAV ========== */
  const burger = document.querySelector('.burger');
  const header = document.querySelector('header');
  const desktopNav = header ? header.querySelector('nav') : null;

  if (burger && header && desktopNav) {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.innerHTML = desktopNav.innerHTML;
    header.after(mobileNav);

    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========== SLIDER DOTS (ALL auto-slider) ========== */
  document.querySelectorAll('.auto-slider').forEach(slider => {
    const dotsWrap = slider.parentElement.querySelector('.slider-dots');
    if (!dotsWrap) return;

    function pageSize() {
      return slider.clientWidth || 1;
    }

    function pageCount() {
      const pages = Math.round(slider.scrollWidth / pageSize());
      return Math.max(1, pages);
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      let pages = pageCount();

      // For Skills & Classes, always show at least 2 dots
      if (slider.closest('#skills') || slider.closest('#classes')) {
        pages = Math.max(2, pages);
      }

      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => {
          slider.scrollTo({ left: i * pageSize(), behavior: 'smooth' });
        });
        dotsWrap.appendChild(dot);
      }
      updateDots();
    }

    function updateDots() {
      const dots = dotsWrap.querySelectorAll('.dot');
      if (!dots.length) return;
      const idx = Math.round(slider.scrollLeft / pageSize());
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    slider.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', buildDots);
    window.addEventListener('load', buildDots);
    setTimeout(buildDots, 500);
    buildDots();
  });
});
