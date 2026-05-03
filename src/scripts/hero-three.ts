const canvas = document.querySelector<HTMLCanvasElement>("#hero-three-scene");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !prefersReducedMotion) {
  await import("./hero-three-scene");
}
