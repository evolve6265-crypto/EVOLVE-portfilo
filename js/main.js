/* ============================================================
   EVOLVE — interactions
   Lenis smooth scroll · GSAP reveals/transitions · magnetic UI
   ============================================================ */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scrolling ---------- */
  let lenis;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ---------- Page-load + liquid transitions ---------- */
  const overlay = document.getElementById("transition");
  function playIntro() {
    if (!overlay) return;
    if (!hasGSAP || reduce) { overlay.style.display = "none"; return; }
    const tl = gsap.timeline();
    tl.set(overlay, { transformOrigin: "bottom", scaleY: 1 })
      .to(overlay.querySelector(".tlogo"), { opacity: 1, duration: 0.4 })
      .to(overlay.querySelector(".tlogo"), { opacity: 0, duration: 0.3, delay: 0.15 })
      .to(overlay, { scaleY: 0, duration: 0.8, ease: "power4.inOut" })
      .set(overlay, { display: "none" });
  }
  function leaveTo(href) {
    if (!overlay || !hasGSAP || reduce) { window.location.href = href; return; }
    overlay.style.display = "flex";
    gsap.timeline()
      .set(overlay, { transformOrigin: "top", scaleY: 0 })
      .to(overlay, { scaleY: 1, duration: 0.6, ease: "power4.inOut" })
      .add(() => (window.location.href = href));
  }
  // Intercept internal page links for liquid transition
  document.querySelectorAll("a[data-transition]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || a.target === "_blank") return;
      e.preventDefault();
      leaveTo(href);
    });
  });

  /* ---------- Custom cursor ---------- */
  if (window.matchMedia("(hover: hover)").matches && !reduce) {
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
    document.querySelectorAll("a, button, .magnetic, .hud, .channel").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  /* ---------- Magnetic elements ---------- */
  if (!reduce) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      const strength = parseFloat(el.dataset.strength || "0.35");
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = "translate(0,0)"; });
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav .links");
  if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("open"));

  /* ---------- GSAP reveals ---------- */
  function initReveals() {
    if (!hasGSAP || reduce) {
      document.querySelectorAll(".reveal").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // Masked hero text reveal
    gsap.to(".mask-line span", { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.6 });
  }

  /* ---------- Number counters ---------- */
  function initCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
      const obj = { v: 0 };
      const render = () => { el.textContent = obj.v.toFixed(dec) + suffix; };
      if (!hasGSAP || reduce) { obj.v = end; render(); return; }
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => gsap.to(obj, { v: end, duration: 1.8, ease: "power2.out", onUpdate: render }),
      });
    });
  }

  /* ---------- Marquee ---------- */
  function initMarquee() {
    document.querySelectorAll(".marquee .track").forEach((track) => {
      if (reduce) return;
      const clone = track.cloneNode(true);
      track.parentNode.appendChild(clone);
      [track, clone].forEach((t, i) => {
        gsap && gsap.to(t, { xPercent: -100, repeat: -1, duration: 18, ease: "none",
          modifiers: { xPercent: gsap.utils.wrap(-100, 0) } });
      });
    });
  }

  /* ---------- Hero parallax on portrait ---------- */
  function initParallax() {
    if (!hasGSAP || reduce) return;
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      gsap.to(el, { yPercent: parseFloat(el.dataset.parallax) || -12, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    playIntro();
    initReveals();
    initCounters();
    initMarquee();
    initParallax();
  });
})();
