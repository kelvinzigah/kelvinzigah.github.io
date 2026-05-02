const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const { default: gsap } = await import("gsap");

  gsap.from(".comic-kicker, .comic-title, #hero .font-display, #hero .comic-button, #hero .comic-link", {
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.06,
    delay: 0.2,
  });

  gsap.from(".dossier-visual", {
    x: 44,
    opacity: 0,
    rotate: 1.5,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.35,
  });

  document.querySelectorAll<HTMLElement>("[data-project-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const slug = tab.dataset.projectTab;
      if (!slug) return;

      requestAnimationFrame(() => {
        const panel = document.querySelector<HTMLElement>(`[data-project-panel="${slug}"]`);
        if (!panel || panel.classList.contains("hidden")) return;

        gsap.fromTo(
          panel,
          { opacity: 0, y: 18, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power2.out" },
        );
      });
    });
  });

  const canvas = document.querySelector<HTMLCanvasElement>("#trace-field");
  const context = canvas?.getContext("2d");

  if (canvas && context) {
    const points = Array.from({ length: 44 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.08 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let frame = 0;
    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      points.forEach((point, index) => {
        const x = point.x * width;
        const y = (point.y * height + Math.sin(time * 0.0004 + point.phase) * 18) % height;

        context.fillStyle = index % 3 === 0 ? "rgba(248,217,74,0.72)" : "rgba(32,231,255,0.58)";
        context.fillRect(x, y, 2, 2);

        if (index > 0 && index % 2 === 0) {
          const prev = points[index - 1];
          const px = prev.x * width;
          const py = (prev.y * height + Math.sin(time * 0.0004 + prev.phase) * 18) % height;
          const distance = Math.hypot(x - px, y - py);
          if (distance < 260) {
            context.strokeStyle = index % 4 === 0 ? "rgba(248,217,74,0.12)" : "rgba(32,231,255,0.12)";
            context.beginPath();
            context.moveTo(px, py);
            context.lineTo(x, y);
            context.stroke();
          }
        }

        point.x = (point.x + point.speed * 0.00022) % 1;
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    window.addEventListener("beforeunload", () => {
      cancelAnimationFrame(frame);
    });
  }
}
