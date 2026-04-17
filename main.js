(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // モバイルメニューのtop位置をヘッダー＋告知バーの実際の高さに合わせる
  function updateMobileMenuTop() {
    const header = document.querySelector('.header');
    const announceBar = document.querySelector('.announce-bar');
    if (header && announceBar && mobileMenu) {
      mobileMenu.style.top = (header.offsetHeight + announceBar.offsetHeight) + 'px';
    }
  }
  updateMobileMenuTop();
  window.addEventListener('resize', updateMobileMenuTop);

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      updateMobileMenuTop();
    });

    document.querySelectorAll('.mobile-menu-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // アンカーリンクの高速スムーズスクロール
  function smoothScrollTo(target) {
    const header = document.querySelector('.header');
    const announceBar = document.querySelector('.announce-bar');
    const offset = (header ? header.offsetHeight : 0) + (announceBar ? announceBar.offsetHeight : 0);
    const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(600, Math.max(300, Math.abs(distance) * 0.3));
    let startTime = null;

    function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(target);
    });
  });
})();
