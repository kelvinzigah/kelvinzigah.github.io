import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  DoubleSide,
  EdgesGeometry,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
} from "three";

const canvas = document.querySelector<HTMLCanvasElement>("#hero-three-scene");

if (canvas) {
  const hero = canvas.closest<HTMLElement>("#hero");
  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 80);
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "high-performance",
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  camera.position.set(0, 2.2, 18);
  camera.lookAt(0, 0, 0);

  const root = new Group();
  const parallaxTarget = new Vector2();
  const parallax = new Vector2();

  scene.add(root);
  scene.add(new AmbientLight(0x8adfff, 1.2));

  const cyan = new Color("#20e7ff");
  const yellow = new Color("#f8d94a");
  const orange = new Color("#ff8a1f");

  const board = new Mesh(
    new PlaneGeometry(15.2, 8.2, 20, 12),
    new MeshBasicMaterial({
      color: 0x0a4c83,
      transparent: true,
      opacity: 0.2,
      side: DoubleSide,
    }),
  );
  board.position.set(2.4, -0.3, -4);
  board.rotation.set(-0.18, -0.24, 0.06);
  root.add(board);

  const grid = new GridHelper(28, 28, 0x20e7ff, 0x174d71);
  grid.position.set(0, -4.7, -5.8);
  grid.rotation.x = Math.PI / 2;
  (grid.material as Material).transparent = true;
  (grid.material as Material).opacity = 0.18;
  root.add(grid);

  const chipMaterial = new MeshBasicMaterial({
    color: 0x08385f,
    transparent: true,
    opacity: 0.78,
    side: DoubleSide,
  });
  const chipEdgeMaterial = new LineBasicMaterial({
    color: cyan,
    transparent: true,
    opacity: 0.7,
  });

  const addChip = (x: number, y: number, z: number, width: number, height: number, rotation = 0) => {
    const chip = new Mesh(new PlaneGeometry(width, height), chipMaterial);
    chip.position.set(x, y, z);
    chip.rotation.set(-0.18, -0.24, rotation);
    root.add(chip);

    const edge = new LineSegments(new EdgesGeometry(chip.geometry), chipEdgeMaterial);
    edge.position.copy(chip.position);
    edge.rotation.copy(chip.rotation);
    root.add(edge);
  };

  addChip(0.4, 0.3, -3.2, 2.1, 1.65, -0.04);
  addChip(3.5, 1.1, -3.4, 1.75, 1.1, 0.03);
  addChip(4.4, -1.25, -3.6, 2.5, 0.95, 0.02);
  addChip(-1.8, -1.05, -3.5, 1.2, 0.8, -0.08);

  const traceMaterial = new LineBasicMaterial({
    color: yellow,
    transparent: true,
    opacity: 0.54,
  });
  const dimTraceMaterial = new LineBasicMaterial({
    color: cyan,
    transparent: true,
    opacity: 0.25,
  });
  const traces = new Group();

  const tracePaths = [
    [
      [-6.6, 1.9, -2.7],
      [-3.9, 1.9, -2.9],
      [-3.9, 0.8, -2.9],
      [-1.5, 0.8, -3.2],
    ],
    [
      [-2.8, -2.1, -3.2],
      [0.6, -2.1, -3.5],
      [0.6, -0.4, -3.5],
      [2.8, -0.4, -3.7],
      [2.8, 0.8, -3.7],
    ],
    [
      [1.1, 2.4, -3.6],
      [4.7, 2.4, -3.8],
      [4.7, 0.4, -3.8],
      [6.7, 0.4, -3.9],
    ],
    [
      [-5.4, -0.2, -3.1],
      [-4.2, -0.2, -3.1],
      [-4.2, -2.2, -3.1],
      [-1.1, -2.2, -3.4],
    ],
  ] as const;

  tracePaths.forEach((points, index) => {
    const geometry = new BufferGeometry().setFromPoints(
      points.map(([x, y, z]) => new Vector3(x, y, z)),
    );
    const line = new Line(geometry, index % 2 === 0 ? traceMaterial : dimTraceMaterial);
    line.rotation.set(-0.18, -0.24, 0.06);
    traces.add(line);
  });

  root.add(traces);

  const pulseGeometry = new SphereGeometry(0.08, 12, 12);
  const pulseMaterial = new MeshBasicMaterial({
    color: orange,
    transparent: true,
    opacity: 0.9,
  });
  const pulses = Array.from({ length: 7 }, (_, index) => {
    const pulse = new Mesh(pulseGeometry, pulseMaterial.clone());
    pulse.userData.phase = index / 7;
    pulse.userData.path = tracePaths[index % tracePaths.length];
    root.add(pulse);
    return pulse;
  });

  const particleCount = 90;
  const positions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    positions[index * 3] = MathUtils.randFloatSpread(20);
    positions[index * 3 + 1] = MathUtils.randFloatSpread(10);
    positions[index * 3 + 2] = MathUtils.randFloat(-9, 1);
  }

  const particleGeometry = new BufferGeometry();
  particleGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  const particles = new Points(
    particleGeometry,
    new PointsMaterial({
      color: cyan,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }),
  );
  root.add(particles);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = hero?.getBoundingClientRect();
    if (!rect) return;

    parallaxTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    parallaxTarget.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  hero?.addEventListener("pointermove", onPointerMove, { passive: true });

  let frame = 0;
  const clock = new Clock();

  const render = () => {
    const elapsed = clock.getElapsedTime();

    parallax.lerp(parallaxTarget, 0.045);
    root.rotation.y = parallax.x * 0.08 + Math.sin(elapsed * 0.22) * 0.035;
    root.rotation.x = -parallax.y * 0.035 + Math.sin(elapsed * 0.18) * 0.02;
    particles.rotation.z = elapsed * 0.012;

    pulses.forEach((pulse) => {
      const path = pulse.userData.path as readonly (readonly [number, number, number])[];
      const progress = (elapsed * 0.18 + (pulse.userData.phase as number)) % 1;
      const segmentIndex = Math.min(path.length - 2, Math.floor(progress * (path.length - 1)));
      const segmentProgress = progress * (path.length - 1) - segmentIndex;
      const start = path[segmentIndex];
      const end = path[segmentIndex + 1];

      pulse.position.set(
        MathUtils.lerp(start[0], end[0], segmentProgress),
        MathUtils.lerp(start[1], end[1], segmentProgress),
        MathUtils.lerp(start[2], end[2], segmentProgress),
      );
      pulse.scale.setScalar(1 + Math.sin(elapsed * 5 + segmentIndex) * 0.25);
      (pulse.material as MeshBasicMaterial).color.lerpColors(orange, yellow, segmentProgress);
    });

    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  frame = requestAnimationFrame(render);

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(frame);
    renderer.dispose();
    particleGeometry.dispose();
    pulseGeometry.dispose();
    board.geometry.dispose();
  });
}
