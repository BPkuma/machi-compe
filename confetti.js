(function () {
  const canvas = document.getElementById('confetti-canvas');
  const section = document.getElementById('schedule');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  const COLORS = ['#e07b39','#5c3d1e','#7c9a6e','#c4a882','#f5c842','#e85d75','#4fa3d1'];
  const SHAPES = ['rect','ribbon'];
  const COUNT = 130;
  let pieces = [];
  let raf;
  let running = false;

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function randomPiece() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 8 + 5,
      h: Math.random() * 14 + 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      speed: Math.random() * 1.6 + 0.8,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.12,
      swing: Math.random() * 1.2 + 0.4,
      swingOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.6,
    };
  }

  function init() {
    resize();
    pieces = Array.from({ length: COUNT }, randomPiece);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = performance.now() / 1000;

    pieces.forEach(p => {
      p.y += p.speed;
      p.x += Math.sin(t * p.swing + p.swingOffset) * 0.8;
      p.angle += p.spin;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;

      if (p.shape === 'ribbon') {
        ctx.beginPath();
        ctx.moveTo(-p.w / 2, 0);
        ctx.quadraticCurveTo(0, -p.h / 2, p.w / 2, 0);
        ctx.quadraticCurveTo(0,  p.h / 2, -p.w / 2, 0);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();
    });

    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    init();
    draw();
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // prefers-reduced-motion が有効な場合は起動しない
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  // IntersectionObserver でセクションが見えたら起動
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? start() : stop());
  }, { threshold: 0.01 });

  observer.observe(section);
  window.addEventListener('resize', () => { if (running) { resize(); } });

  // 設定が途中で変わった場合も追従
  reducedMotion.addEventListener('change', e => { if (e.matches) stop(); });
})();
