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
}
