/* ============================================================
   EVOLVE — animated canvas background (no external video needed)
   Particle constellation + drifting HUD arcs + cursor parallax.
   Self-contained, DPR-aware, pauses when tab hidden, honours
   prefers-reduced-motion.
   ============================================================ */
(() => {
  const canvas = document.getElementById("scene");
  if (!canvas) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d", { alpha: true });

  let W = 0, H = 0, DPR = 1;
  let particles = [];
  let arcs = [];
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  let running = true;

  const NEON = [56, 225, 255];
  const VIOLET = [124, 92, 255];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
  }

  function seed() {
    // particle count scales with area, capped for performance
    const count = Math.min(110, Math.floor((W * H) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
      hue: Math.random() > 0.7 ? VIOLET : NEON,
    }));
    arcs = [
      { cx: W * 0.78, cy: H * 0.22, rad: Math.min(W, H) * 0.42, a: 0, spd: 0.0008, span: 1.1, col: NEON },
      { cx: W * 0.78, cy: H * 0.22, rad: Math.min(W, H) * 0.30, a: 2, spd: -0.0013, span: 0.8, col: VIOLET },
      { cx: W * 0.15, cy: H * 0.85, rad: Math.min(W, H) * 0.36, a: 1, spd: 0.001, span: 0.9, col: NEON },
    ];
  }

  function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    // smooth cursor easing for parallax
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    const px = (mouse.x - 0.5) * 40;
    const py = (mouse.y - 0.5) * 40;

    // --- HUD arcs ---
    arcs.forEach((arc) => {
      arc.a += arc.spd;
      ctx.save();
      ctx.translate(px * 0.5, py * 0.5);
      ctx.beginPath();
      ctx.arc(arc.cx, arc.cy, arc.rad, arc.a, arc.a + arc.span);
      ctx.strokeStyle = rgba(arc.col, 0.25);
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);
      ctx.stroke();
      // glowing tip
      const tx = arc.cx + Math.cos(arc.a + arc.span) * arc.rad;
      const ty = arc.cy + Math.sin(arc.a + arc.span) * arc.rad;
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(arc.col, 0.9);
      ctx.shadowColor = rgba(arc.col, 0.9);
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    });

    // --- particles + links ---
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      const dx = p.x + px, dy = p.y + py;
      ctx.beginPath();
      ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(p.hue, 0.8);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ddx = p.x - q.x, ddy = p.y - q.y;
        const d = Math.hypot(ddx, ddy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.moveTo(dx, dy);
          ctx.lineTo(q.x + px, q.y + py);
          ctx.strokeStyle = rgba(NEON, (1 - d / maxDist) * 0.12);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(frame);
  }

  function renderStatic() {
    // single non-animated frame for reduced-motion users
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(p.hue, 0.6);
      ctx.fill();
    });
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", (e) => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = e.clientY / window.innerHeight;
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden && !reduce;
    if (running) requestAnimationFrame(frame);
  });

  resize();
  if (reduce) { renderStatic(); }
  else { requestAnimationFrame(frame); }
})();
