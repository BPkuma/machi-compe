(function () {
  const section = document.getElementById('open-call');
  if (!section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    // アニメーション無効時は即表示
    section.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        section.classList.add('is-visible');
        observer.unobserve(section); // 一度発火したら監視終了
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  observer.observe(section);
})();
