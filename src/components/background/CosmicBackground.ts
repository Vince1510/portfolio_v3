// CosmicBackground.ts
// Three.js engine for the dark-mode cosmic background.
// Section mapping: 0=Earth, 1=Saturn-ring planet, 2=Ice planet, 3=Mars-like planet

import * as THREE from "three";
import gsap from "gsap";

interface PlanetConfig {
  radius: number;
  baseColor: string;
  stripeColors: string[];
  hasRing: boolean;
  ringColor: string;
  atmosphereColor: string;
  roughness: number;
  emissive: string;
  position: [number, number, number];
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
}

const PLANET_CONFIGS: PlanetConfig[] = [
  // 0 – Earth (Home -> Wide view of all planets)
  {
    radius: 2.2,
    baseColor: "#1565C0",
    stripeColors: ["#0D47A1", "#1976D2", "#2196F3", "#1B5E20", "#2E7D32"],
    hasRing: false,
    ringColor: "",
    atmosphereColor: "#82b1ff",
    roughness: 0.6,
    emissive: "#0d1a2e",
    position: [-16, 10, -4], 
    cameraPos: [0, 0, 48],   // Much wider overview
    cameraTarget: [0, 0, 0],
  },
  // 1 – Saturn-like ring planet (Skills)
  {
    radius: 1.9,
    baseColor: "#F9A825",
    stripeColors: ["#F57F17", "#FDD835", "#FFE082", "#E65100", "#FF8F00"],
    hasRing: true,
    ringColor: "#bf8e3a",
    atmosphereColor: "#ffe57f",
    roughness: 0.4,
    emissive: "#2a1a00",
    position: [18, 12, -20],
    cameraPos: [22, 14, -13], // Repositioned for moved planet
    cameraTarget: [17, 11, -21], // Off-center focus
  },
  // 2 – Ice planet (Projects)
  {
    radius: 2.0,
    baseColor: "#B3E5FC",
    stripeColors: ["#81D4FA", "#E1F5FE", "#0277BD", "#4FC3F7", "#ffffff"],
    hasRing: false,
    ringColor: "",
    atmosphereColor: "#b3e5fc",
    roughness: 0.8,
    emissive: "#001a2e",
    position: [-18, -14, -15],
    cameraPos: [-22, -12, -8], // Repositioned for moved planet
    cameraTarget: [-17, -14.5, -15.5],
  },
  // 3 – Mars-like (Contact)
  {
    radius: 1.7,
    baseColor: "#BF360C",
    stripeColors: ["#E64A19", "#BF360C", "#8D3A1C", "#D84315", "#FF7043"],
    hasRing: false,
    ringColor: "",
    atmosphereColor: "#ff8a65",
    roughness: 0.9,
    emissive: "#1a0500",
    position: [18, -14, -8],
    cameraPos: [22.5, -12, -2], // Repositioned for moved planet
    cameraTarget: [17.5, -14.5, -8.5],
  },
  // --- CLUSTER COMPANIONS (Extra planets visible alongside the main ones) ---
  // Skills cluster companion (Green gas)
  {
    radius: 0.8,
    baseColor: "#4CAF50",
    stripeColors: ["#388E3C", "#81C784", "#2E7D32", "#66BB6A", "#1B5E20"],
    hasRing: false, ringColor: "", atmosphereColor: "#a5d6a7", roughness: 0.7, emissive: "#0a1f0a",
    position: [24, 8, -25], cameraPos: [0,0,0], cameraTarget: [0,0,0],
  },
  // Projects cluster companion (Purple ring)
  {
    radius: 1.2,
    baseColor: "#AB47BC",
    stripeColors: ["#8E24AA", "#CE93D8", "#6A1B9A", "#BA68C8", "#4A148C"],
    hasRing: true, ringColor: "#9c27b0", atmosphereColor: "#e1bee7", roughness: 0.5, emissive: "#1a0022",
    position: [-24, -8, -22], cameraPos: [0,0,0], cameraTarget: [0,0,0],
  },
  // Contact cluster companion (Lava glowing)
  {
    radius: 0.9,
    baseColor: "#FF5722",
    stripeColors: ["#F4511E", "#FF8A65", "#D84315", "#FFCCBC", "#BF360C"],
    hasRing: false, ringColor: "", atmosphereColor: "#ffccbc", roughness: 0.8, emissive: "#3d1000",
    position: [12, -12, -15], cameraPos: [0,0,0], cameraTarget: [0,0,0],
  },
];

const STAR_COUNT = 2000;

export class CosmicBackground {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId = 0;
  private planets: THREE.Group[] = [];
  private bgPlanets!: THREE.Group;
  private stars!: THREE.Points;
  private currentScene = 0;
  private sunLight!: THREE.PointLight;
  private nebula!: THREE.Mesh;

  private cameraTarget = new THREE.Vector3(0, 0, 0);

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  init() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000510);
    // Light fog for depth (very subtle)
    this.scene.fog = new THREE.Fog(0x000510, 80, 200);

    // Camera
    const cfg = PLANET_CONFIGS[0];
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(...cfg.cameraPos);
    this.cameraTarget.set(...cfg.cameraTarget);
    this.camera.lookAt(this.cameraTarget);

    // Lighting — bright enough to see planets clearly
    const ambientLight = new THREE.AmbientLight(0x334466, 2.5);
    this.scene.add(ambientLight);

    this.sunLight = new THREE.PointLight(0xffeedd, 6, 0);
    this.sunLight.position.set(0, 5, 8);
    this.sunLight.castShadow = false;
    this.scene.add(this.sunLight);

    // Fill light from opposite side
    const fillLight = new THREE.PointLight(0x334488, 2, 0);
    fillLight.position.set(10, -3, -5);
    this.scene.add(fillLight);

    // Stars
    this.buildStars();

    // Nebula background
    this.buildNebula();

    // Build all 4 planets (all visible by default)
    PLANET_CONFIGS.forEach((pCfg) => {
      const group = this.buildPlanet(pCfg);
      this.planets.push(group);
      this.scene.add(group);
    });

    // Background distant small planets / moons
    this.bgPlanets = new THREE.Group();
    for (let i = 0; i < 35; i++) {
      const r = Math.random() * 0.3 + 0.05;
      const geo = new THREE.SphereGeometry(r, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.6, 0.4),
        roughness: 0.7,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const distance = 25 + Math.random() * 40;
      mesh.position.set(
        distance * Math.sin(phi) * Math.cos(theta),
        distance * Math.sin(phi) * Math.sin(theta),
        distance * Math.cos(phi)
      );
      this.bgPlanets.add(mesh);
    }
    this.scene.add(this.bgPlanets);

    window.addEventListener("resize", this.onResize);
    this.loop();
  }

  setScene(index: number) {
    if (index === this.currentScene) return;

    this.currentScene = index;
    const cfg = PLANET_CONFIGS[index];

    // Camera move
    gsap.to(this.camera.position, {
      x: cfg.cameraPos[0],
      y: cfg.cameraPos[1],
      z: cfg.cameraPos[2],
      duration: 1.8,
      ease: "power3.inOut",
    });

    // Animate target vector independently to make the lookAt smooth
    gsap.to(this.cameraTarget, {
      x: cfg.cameraTarget[0],
      y: cfg.cameraTarget[1],
      z: cfg.cameraTarget[2],
      duration: 1.8,
      ease: "power3.inOut",
    });

    // Sun light color & position shift
    const lightColors = [0xffeedd, 0xffe0a0, 0xaaddff, 0xff9977];
    gsap.to(this.sunLight.color, {
      r: ((lightColors[index] >> 16) & 0xff) / 255,
      g: ((lightColors[index] >> 8) & 0xff) / 255,
      b: (lightColors[index] & 0xff) / 255,
      duration: 1.8,
      ease: "power2.inOut",
    });

    gsap.to(this.sunLight.position, {
      x: cfg.cameraPos[0] - 5,
      y: cfg.cameraPos[1] + 5,
      z: cfg.cameraPos[2] + 5,
      duration: 1.8,
      ease: "power2.inOut",
    });
  }

  // ─── STARS ─────────────────────────────────────────────────────────────────
  private buildStars() {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 120;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const warmth = Math.random();
      colors[i * 3] = 0.85 + warmth * 0.15;
      colors[i * 3 + 1] = 0.85 + warmth * 0.1;
      colors[i * 3 + 2] = 1;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    this.stars = new THREE.Points(geo, mat);
    this.scene.add(this.stars);
  }

  // ─── NEBULA ────────────────────────────────────────────────────────────────
  private buildNebula() {
    // Soft glowing planes behind the scene to simulate nebula clouds
    const nebulaGeo = new THREE.PlaneGeometry(300, 300);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const radGrad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
    radGrad.addColorStop(0, "rgba(60,0,120,0.25)");
    radGrad.addColorStop(0.4, "rgba(0,20,100,0.12)");
    radGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    const nebulaMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    this.nebula.position.set(0, 0, -60);
    this.nebula.rotation.z = 0.3;
    this.scene.add(this.nebula);
  }

  // ─── PLANET BUILDER ────────────────────────────────────────────────────────
  private buildPlanet(cfg: PlanetConfig): THREE.Group {
    const group = new THREE.Group();
    group.position.set(...cfg.position);

    // Procedural planet texture
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 1024;
    texCanvas.height = 512;
    const texCtx = texCanvas.getContext("2d")!;

    // Base fill
    texCtx.fillStyle = cfg.baseColor;
    texCtx.fillRect(0, 0, 1024, 512);

    // Noise-like stripes/blobs
    cfg.stripeColors.forEach((color, i) => {
      const numBlobs = 12 + i * 6;
      for (let b = 0; b < numBlobs; b++) {
        const bx = Math.random() * 1024;
        const by = Math.random() * 512;
        const bw = 60 + Math.random() * 180;
        const bh = 20 + Math.random() * 60;
        const grad = texCtx.createRadialGradient(bx, by, 0, bx, by, bw);
        grad.addColorStop(0, color + "cc");
        grad.addColorStop(1, color + "00");
        texCtx.fillStyle = grad;
        texCtx.beginPath();
        texCtx.ellipse(bx, by, bw, bh, Math.random() * Math.PI, 0, Math.PI * 2);
        texCtx.fill();
      }
    });

    // Craters for rocky planets (scenes 2,3)
    if (cfg.roughness > 0.7) {
      for (let c = 0; c < 30; c++) {
        const cx = Math.random() * 1024;
        const cy = Math.random() * 512;
        const cr = Math.random() * 25 + 5;
        const cGrad = texCtx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        cGrad.addColorStop(0, "rgba(0,0,0,0.4)");
        cGrad.addColorStop(0.6, "rgba(0,0,0,0.1)");
        cGrad.addColorStop(0.9, "rgba(255,255,255,0.15)");
        cGrad.addColorStop(1, "rgba(255,255,255,0)");
        texCtx.fillStyle = cGrad;
        texCtx.beginPath();
        texCtx.arc(cx, cy, cr, 0, Math.PI * 2);
        texCtx.fill();
      }
    }

    const planetTexture = new THREE.CanvasTexture(texCanvas);

    // Bump map
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 512;
    bumpCanvas.height = 256;
    const bumpCtx = bumpCanvas.getContext("2d")!;
    bumpCtx.fillStyle = "#888";
    bumpCtx.fillRect(0, 0, 512, 256);
    for (let n = 0; n < 400; n++) {
      const nx = Math.random() * 512;
      const ny = Math.random() * 256;
      const nr = Math.random() * 20;
      const bright = Math.random() > 0.5 ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
      bumpCtx.beginPath();
      bumpCtx.arc(nx, ny, nr, 0, Math.PI * 2);
      bumpCtx.fillStyle = bright;
      bumpCtx.fill();
    }
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

    // Planet sphere
    const geo = new THREE.SphereGeometry(cfg.radius, 64, 64);
    const mat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      roughness: cfg.roughness,
      metalness: 0.05,
      emissive: new THREE.Color(cfg.emissive),
      emissiveIntensity: 1.2,
    });
    const planet = new THREE.Mesh(geo, mat);
    planet.castShadow = false;
    planet.receiveShadow = false;
    group.add(planet);

    // Atmosphere glow
    const atmGeo = new THREE.SphereGeometry(cfg.radius * 1.06, 32, 32);
    const atmMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(cfg.atmosphereColor),
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(atmGeo, atmMat));

    // Saturn ring
    if (cfg.hasRing) {
      const innerR = cfg.radius * 1.4;
      const outerR = cfg.radius * 2.4;
      const ringGeo = new THREE.RingGeometry(innerR, outerR, 64);

      // Procedural ring texture
      const rCanvas = document.createElement("canvas");
      rCanvas.width = 256;
      rCanvas.height = 1;
      const rCtx = rCanvas.getContext("2d")!;
      const rGrad = rCtx.createLinearGradient(0, 0, 256, 0);
      rGrad.addColorStop(0, "rgba(0,0,0,0)");
      rGrad.addColorStop(0.1, "rgba(180,130,60,0.7)");
      rGrad.addColorStop(0.4, "rgba(220,180,80,0.5)");
      rGrad.addColorStop(0.6, "rgba(200,160,70,0.8)");
      rGrad.addColorStop(0.85, "rgba(160,120,50,0.4)");
      rGrad.addColorStop(1, "rgba(0,0,0,0)");
      rCtx.fillStyle = rGrad;
      rCtx.fillRect(0, 0, 256, 1);

      const ringTex = new THREE.CanvasTexture(rCanvas);
      const ringMat = new THREE.MeshBasicMaterial({
        map: ringTex,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.8;
      group.add(ring);
    }

    return group;
  }

  // ─── ANIMATION LOOP ────────────────────────────────────────────────────────
  private loop = () => {
    this.animationId = requestAnimationFrame(this.loop);

    const t = Date.now() * 0.001;

    // Livelier star movement
    this.stars.rotation.y = t * 0.012;
    this.stars.rotation.x = Math.sin(t * 0.005) * 0.08;
    
    // Suble star twinkling
    if (this.stars.material instanceof THREE.PointsMaterial) {
      this.stars.material.opacity = 0.5 + Math.sin(t * 1.8) * 0.15;
    }

    // Increased planet rotation and movement
    this.planets.forEach((group, i) => {
      // Significantly faster rotation
      const speeds = [0.008, 0.006, 0.005, 0.007];
      group.children[0].rotation.y = t * speeds[i];
      
      // Amplified bobbing (vertical floating)
      group.position.y = PLANET_CONFIGS[i].position[1] + Math.sin(t * 0.6 + i) * 0.2;
      
      // Added subtle sway (X-axis)
      group.rotation.x = Math.sin(t * 0.3 + i) * 0.05;
    });

    // Faster nebula rotation
    this.nebula.rotation.z = t * 0.02;

    // Distant small planets orbit speedup
    if (this.bgPlanets) {
      this.bgPlanets.rotation.y = t * 0.005;
      this.bgPlanets.rotation.x = t * 0.003;
    }

    // Direct the camera to the animated target
    this.camera.lookAt(this.cameraTarget);

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
  }
}
