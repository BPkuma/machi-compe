(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 随時募集セクション
  const ocSection = document.getElementById('open-call');
  if (ocSection) {
    if (reducedMotion.matches) {
      ocSection.classList.add('is-visible');
    } else {
      const ocObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            ocSection.classList.add('is-visible');
            ocObserver.unobserve(ocSection);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      ocObserver.observe(ocSection);
    }
  }

  // インタビューセクション見出し
  const interviewsHeader = document.querySelector('.interviews-section-header');
  if (interviewsHeader) {
    if (reducedMotion.matches) {
      interviewsHeader.classList.add('is-visible');
    } else {
      const ivObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            interviewsHeader.classList.add('is-visible');
            ivObserver.unobserve(interviewsHeader);
          }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });
      ivObserver.observe(interviewsHeader);
    }
  }
})();
