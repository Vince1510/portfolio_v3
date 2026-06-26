import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
    cameraPos: [0, 0, 48], // Much wider overview
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
    hasRing: false,
    ringColor: "",
    atmosphereColor: "#a5d6a7",
    roughness: 0.7,
    emissive: "#0a1f0a",
    position: [24, 8, -25],
    cameraPos: [0, 0, 0],
    cameraTarget: [0, 0, 0],
  },
  // Projects cluster companion (Purple ring)
  {
    radius: 1.2,
    baseColor: "#AB47BC",
    stripeColors: ["#8E24AA", "#CE93D8", "#6A1B9A", "#BA68C8", "#4A148C"],
    hasRing: true,
    ringColor: "#9c27b0",
    atmosphereColor: "#e1bee7",
    roughness: 0.5,
    emissive: "#1a0022",
    position: [-24, -8, -22],
    cameraPos: [0, 0, 0],
    cameraTarget: [0, 0, 0],
  },
  // Contact cluster companion (Lava glowing)
  {
    radius: 0.9,
    baseColor: "#FF5722",
    stripeColors: ["#F4511E", "#FF8A65", "#D84315", "#FFCCBC", "#BF360C"],
    hasRing: false,
    ringColor: "",
    atmosphereColor: "#ffccbc",
    roughness: 0.8,
    emissive: "#3d1000",
    position: [12, -12, -15],
    cameraPos: [0, 0, 0],
    cameraTarget: [0, 0, 0],
  },
  // 4 – Cosmic / About Page
  {
    radius: 2.5,
    baseColor: "#4A148C",
    stripeColors: ["#7B1FA2", "#9C27B0", "#E1BEE7", "#6A1B9A", "#4A148C"],
    hasRing: true,
    ringColor: "#ea80fc",
    atmosphereColor: "#e1bee7",
    roughness: 0.3,
    emissive: "#220033",
    position: [0, 0, -30],
    cameraPos: [0, 5, -10],
    cameraTarget: [0, 0, -32],
  },
];

const STAR_COUNT = 2000;

// Reusable texture generator
function generatePlanetTextures(cfg: PlanetConfig) {
  const texCanvas = document.createElement("canvas");
  texCanvas.width = 1024;
  texCanvas.height = 512;
  const texCtx = texCanvas.getContext("2d")!;

  texCtx.fillStyle = cfg.baseColor;
  texCtx.fillRect(0, 0, 1024, 512);

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
    const bright =
      Math.random() > 0.5 ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
    bumpCtx.beginPath();
    bumpCtx.arc(nx, ny, nr, 0, Math.PI * 2);
    bumpCtx.fillStyle = bright;
    bumpCtx.fill();
  }
  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

  return { planetTexture, bumpTexture };
}

function generateRingTexture() {
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

  return new THREE.CanvasTexture(rCanvas);
}

function generateNebulaTexture() {
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

  return new THREE.CanvasTexture(canvas);
}

const Planet = ({
  cfg,
  index,
  isPaused,
}: {
  cfg: PlanetConfig;
  index: number;
  isPaused: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  const { planetTexture, bumpTexture } = useMemo(
    () => generatePlanetTextures(cfg),
    [cfg],
  );
  const ringTexture = useMemo(
    () => (cfg.hasRing ? generateRingTexture() : null),
    [cfg.hasRing],
  );

  useFrame(({ clock }) => {
    if (isPaused) return;
    const t = clock.getElapsedTime();
    if (groupRef.current && planetRef.current) {
      const speeds = [0.008, 0.006, 0.005, 0.007, 0.008, 0.006, 0.005, 0.007];
      planetRef.current.rotation.y =
        t * (speeds[index % speeds.length] || 0.005);
      groupRef.current.position.y =
        cfg.position[1] + Math.sin(t * 0.6 + index) * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={cfg.position}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[cfg.radius, 32, 32]} />
        <meshStandardMaterial
          map={planetTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          roughness={cfg.roughness}
          metalness={0.05}
          emissive={new THREE.Color(cfg.emissive)}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[cfg.radius * 1.06, 32, 32]} />
        <meshBasicMaterial
          color={cfg.atmosphereColor}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Saturn ring */}
      {cfg.hasRing && ringTexture && (
        <mesh rotation-x={Math.PI / 2.8}>
          <ringGeometry args={[cfg.radius * 1.4, cfg.radius * 2.4, 64]} />
          <meshBasicMaterial
            map={ringTexture}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
};

const Stars = ({ isPaused }: { isPaused: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, colors } = useMemo(() => {
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
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (isPaused) return;
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.012;
      pointsRef.current.rotation.x = Math.sin(t * 0.005) * 0.08;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.5 + Math.sin(t * 1.8) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={STAR_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.35}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

const BgPlanets = ({ isPaused }: { isPaused: boolean }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const bgPlanetCount = 35;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < bgPlanetCount; i++) {
        const r = Math.random() * 0.3 + 0.05;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const distance = 25 + Math.random() * 40;

        dummy.position.set(
          distance * Math.sin(phi) * Math.cos(theta),
          distance * Math.sin(phi) * Math.sin(theta),
          distance * Math.cos(phi),
        );
        dummy.scale.set(r, r, r);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(
          i,
          new THREE.Color().setHSL(Math.random(), 0.6, 0.4),
        );
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor)
        meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [dummy]);

  useFrame(({ clock }) => {
    if (isPaused) return;
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.005;
      meshRef.current.rotation.x = t * 0.003;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, bgPlanetCount]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial roughness={0.7} metalness={0.2} />
    </instancedMesh>
  );
};

const Nebula = ({ isPaused }: { isPaused: boolean }) => {
  const nebulaRef = useRef<THREE.Mesh>(null);
  const nebulaTexture = useMemo(() => generateNebulaTexture(), []);

  useFrame(({ clock }) => {
    if (isPaused) return;
    const t = clock.getElapsedTime();
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <mesh ref={nebulaRef} position={[0, 0, -60]} rotation={[0, 0, 0.3]}>
      <planeGeometry args={[300, 300]} />
      <meshBasicMaterial
        map={nebulaTexture}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const SceneRig = ({ activeIndex }: { activeIndex: number }) => {
  const { camera } = useThree();
  const sunLightRef = useRef<THREE.PointLight>(null);
  const cameraTargetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    // Initial camera setup
    const cfg = PLANET_CONFIGS[activeIndex] || PLANET_CONFIGS[0];
    camera.position.set(...cfg.cameraPos);
    cameraTargetRef.current.set(...cfg.cameraTarget);
    camera.lookAt(cameraTargetRef.current);

    // Setup light
    if (sunLightRef.current) {
      sunLightRef.current.position.set(0, 5, 8);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cfg = PLANET_CONFIGS[activeIndex] || PLANET_CONFIGS[0];

    gsap.to(camera.position, {
      x: cfg.cameraPos[0],
      y: cfg.cameraPos[1],
      z: cfg.cameraPos[2],
      duration: 1.8,
      ease: "power3.inOut",
    });

    gsap.to(cameraTargetRef.current, {
      x: cfg.cameraTarget[0],
      y: cfg.cameraTarget[1],
      z: cfg.cameraTarget[2],
      duration: 1.8,
      ease: "power3.inOut",
    });

    if (sunLightRef.current) {
      const lightColors = [0xffeedd, 0xffe0a0, 0xaaddff, 0xff9977, 0xdda0ff];
      const targetColor = lightColors[activeIndex] || 0xffeedd;

      gsap.to(sunLightRef.current.color, {
        r: ((targetColor >> 16) & 0xff) / 255,
        g: ((targetColor >> 8) & 0xff) / 255,
        b: (targetColor & 0xff) / 255,
        duration: 1.8,
        ease: "power2.inOut",
      });

      gsap.to(sunLightRef.current.position, {
        x: cfg.cameraPos[0] - 5,
        y: cfg.cameraPos[1] + 5,
        z: cfg.cameraPos[2] + 5,
        duration: 1.8,
        ease: "power2.inOut",
      });
    }
  }, [activeIndex, camera]);

  useFrame(() => {
    camera.lookAt(cameraTargetRef.current);
  });

  return (
    <>
      <ambientLight color={0x334466} intensity={2.5} />
      <pointLight
        ref={sunLightRef}
        color={0xffeedd}
        intensity={6}
        position={[0, 5, 8]}
        castShadow={false}
      />
      <pointLight color={0x334488} intensity={2} position={[10, -3, -5]} />
    </>
  );
};

interface R3FSpaceBackgroundProps {
  activeIndex: number;
  isPaused: boolean;
}

const R3FSpaceBackground: React.FC<R3FSpaceBackgroundProps> = ({
  activeIndex,
  isPaused,
}) => {
  return (
    <Canvas
      className="background-canvas space"
      style={{ display: isPaused ? "none" : "block" }} // Hide or manage in parent
      camera={{ fov: 60, near: 0.1, far: 1000 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      onCreated={({ gl, scene }) => {
        scene.background = new THREE.Color(0x000510);
        scene.fog = new THREE.Fog(0x000510, 80, 200);
      }}
    >
      <SceneRig activeIndex={activeIndex} />
      <Stars isPaused={isPaused} />
      <Nebula isPaused={isPaused} />
      {PLANET_CONFIGS.map((cfg, index) => (
        <Planet key={index} cfg={cfg} index={index} isPaused={isPaused} />
      ))}
      <BgPlanets isPaused={isPaused} />
    </Canvas>
  );
};

export default R3FSpaceBackground;
