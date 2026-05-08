// SeasonalBackground.ts
// Canvas 2D engine for the light-mode seasonal backgrounds.
// Section mapping: 0=Spring, 1=Summer, 2=Autumn, 3=Winter

import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularV: number;
  size: number;
  opacity: number;
  color: string;
  type?: string;
  phase?: number;      // for butterfly wing animation
  amplitude?: number;  // for butterfly wiggle
  life?: number;
  maxLife?: number;
}

const SEASON_GRADIENTS = [
  // Spring
  { top: "#fce4ec", bottom: "#e8f5e9" },
  // Summer
  { top: "#fff9c4", bottom: "#ffe0b2" },
  // Autumn
  { top: "#fff3e0", bottom: "#fbe9e7" },
  // Winter
  { top: "#e3f2fd", bottom: "#f5f5f5" },
];

export class SeasonalBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId = 0;
  private currentScene = 0;
  private targetScene = 0;
  private sceneOpacity = 1;
  private transitioning = false;
  private bgGradient: { current: { top: string; bottom: string } };
  private time = 0;
  private camera = { scale: 1, x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.bgGradient = {
      current: { ...SEASON_GRADIENTS[0] },
    };
  }

  init() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.buildScene(0);
    this.loop();
  }

  setScene(index: number) {
    if (index === this.currentScene && !this.transitioning) return;
    this.targetScene = index;
    this.transitioning = true;

    const W = this.canvas.width;
    // Direction of travel for the pan sweep
    const dir = index > this.currentScene ? 1 : -1;

    const tl = gsap.timeline({
      onComplete: () => {
        this.transitioning = false;
        this.sceneOpacity = 1;
      },
    });

    // 1. Zoom IN rapidly and pan to simulate hyper-drive travel into the scene
    tl.to(
      this.camera,
      {
        scale: 12, // Deep zoom into the particle layer
        x: W * 0.15 * dir, // Sweep sideways
        duration: 0.6,
        ease: "power2.in",
      },
      0
    );

    // Fade out particles slightly to smooth the cross-scene transition
    tl.to(
      this,
      {
        sceneOpacity: 0.0,
        duration: 0.4,
        ease: "power2.in",
      },
      0.2
    );

    // 2. Mid-point: Swap active scene entirely while we are highly blurred and zoomed in
    tl.call(() => {
      this.currentScene = this.targetScene;
      this.bgGradient.current = { ...SEASON_GRADIENTS[this.currentScene] };
      this.buildScene(this.currentScene);
      // Put the camera at the opposite side so it pans through continuously upon zooming out
      this.camera.x = -W * 0.15 * dir;
    });

    // 3. Zoom OUT to neutral viewing parameters and finish the pan
    tl.to(this.camera, {
      scale: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Fade in the new particle environment softly
    tl.to(
      this,
      {
        sceneOpacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.8"
    );
  }

  private resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  private buildScene(index: number) {
    this.particles = [];
    const W = this.canvas.width;
    const H = this.canvas.height;
    // Lower count to reduce business
    const count = Math.floor((W * H) / 25000);

    switch (index) {
      case 0: this.buildSpring(count, W, H); break;
      case 1: this.buildSummer(count, W, H); break;
      case 2: this.buildAutumn(count, W, H); break;
      case 3: this.buildWinter(count, W, H); break;
    }
  }

  // ─── SPRING ────────────────────────────────────────────────────────────────
  private buildSpring(count: number, W: number, H: number) {
    const petalColors = ["#f8bbd0", "#f48fb1", "#fce4ec", "#ffcdd2", "#ffe0b2"];
    for (let i = 0; i < count * 1.2; i++) {
      this.particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.5 + 0.2, // Slower fall
        angle: Math.random() * Math.PI * 2,
        angularV: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.6 + 0.3,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        type: "petal",
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 1.5 + 0.5,
      });
    }
    // Butterflies (reduced count and start with neutral speeds)
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.7,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        angle: 0,
        angularV: 0,
        size: Math.random() * 8 + 6, // Slightly smaller for realism
        opacity: 0.9,
        color: "",
        type: "butterfly",
        phase: Math.random() * Math.PI * 2,
        amplitude: 0, // No longer used for x-swing
      });
    }
  }

  // ─── SUMMER ────────────────────────────────────────────────────────────────
  private buildSummer(count: number, W: number, H: number) {
    // Heat shimmer particles (dust motes)
    for (let i = 0; i < count * 0.8; i++) {
      this.particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.3 + 0.05),
        angle: 0,
        angularV: 0,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.2 + 0.05,
        color: "#FFD54F",
        type: "mote",
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 2 + 0.5,
        life: Math.random() * 300,
        maxLife: Math.random() * 200 + 200,
      });
    }
  }

  // ─── AUTUMN ────────────────────────────────────────────────────────────────
  private buildAutumn(count: number, W: number, H: number) {
    const leafColors = [
      "#FF6F00", "#E65100", "#BF360C", "#FFD600",
      "#F57F17", "#D84315", "#FF8F00", "#FFA000",
    ];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * 0.8 + 0.3,
        angle: Math.random() * Math.PI * 2,
        angularV: (Math.random() - 0.5) * 0.03,
        size: Math.random() * 14 + 8,
        opacity: Math.random() * 0.5 + 0.4,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        type: "leaf",
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 2 + 1,
      });
    }
  }

  // ─── WINTER ────────────────────────────────────────────────────────────────
  private buildWinter(count: number, W: number, H: number) {
    for (let i = 0; i < count * 1.2; i++) {
      const arms = [4, 6, 8][Math.floor(Math.random() * 3)];
      this.particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.6 + 0.1,
        angle: Math.random() * Math.PI * 2,
        angularV: (Math.random() - 0.5) * 0.005,
        size: Math.random() * 12 + 4,
        opacity: Math.random() * 0.6 + 0.3,
        color: `hsl(${200 + Math.random() * 30}, 60%, ${80 + Math.random() * 15}%)`,
        type: `snowflake_${arms}`,
        phase: 0,
        amplitude: Math.random() * 1 + 0.3,
      });
    }
  }

  // ─── MAIN LOOP ─────────────────────────────────────────────────────────────
  private loop = () => {
    this.animationId = requestAnimationFrame(this.loop);
    this.time += 0.016;
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;

    // Skip if canvas is not yet sized
    if (!ctx || W === 0 || H === 0) return;

    // Draw background gradient
    const grad = this.bgGradient.current;
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, grad.top);
    gradient.addColorStop(1, grad.bottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = this.sceneOpacity;

    // Apply 2.5D Camera Transform for transition sweeps
    ctx.translate(W / 2, H / 2);
    ctx.scale(this.camera.scale, this.camera.scale);
    ctx.translate(-W / 2 + this.camera.x, -H / 2 + this.camera.y);

    switch (this.currentScene) {
      case 0: this.drawSpring(ctx, W, H); break;
      case 1: this.drawSummer(ctx, W, H); break;
      case 2: this.drawAutumn(ctx, W, H); break;
      case 3: this.drawWinter(ctx, W, H); break;
    }

    ctx.restore();
  };


  // ─── DRAW SPRING ───────────────────────────────────────────────────────────
  private drawSpring(ctx: CanvasRenderingContext2D, W: number, H: number) {
    for (const p of this.particles) {
      if (p.type === "petal") {
        p.phase! += 0.02;
        p.x += p.vx + Math.sin(p.phase!) * p.amplitude!;
        p.y += p.vy;
        p.angle += p.angularV;
      } else if (p.type === "butterfly") {
        // Organic fluttering mechanics
        p.phase! += 0.3; // Wing flap speed component
        // Wander gracefully
        p.vx += (Math.random() - 0.5) * 0.25;
        p.vy += (Math.random() - 0.5) * 0.25;
        // Limit max velocity
        p.vx = Math.max(-1.8, Math.min(1.8, p.vx));
        p.vy = Math.max(-1.8, Math.min(1.8, p.vy));
        p.x += p.vx;
        p.y += p.vy - 0.4; // Slight upward tendency

        // Rotate sprite towards velocity vector smoothly
        const targetAngle = Math.atan2(p.vy - 0.4, p.vx) + Math.PI / 2;
        // Simple angle lerp
        const diff = targetAngle - p.angle;
        p.angle += Math.atan2(Math.sin(diff), Math.cos(diff)) * 0.1;
      }

      // Wraps
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; p.vy = Math.abs(p.vy); }
      if (p.y < -40) { p.y = H + 20; p.x = Math.random() * W; }
      if (p.x < -40) p.x = W + 20;
      if (p.x > W + 40) p.x = -20;

      ctx.save();
      ctx.globalAlpha = p.opacity * this.sceneOpacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.type === "petal") {
        this.drawPetal(ctx, p);
      } else if (p.type === "butterfly") {
        this.drawButterfly(ctx, p);
      }
      ctx.restore();
    }
  }


  private drawPetal(ctx: CanvasRenderingContext2D, p: Particle) {
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    // subtle shadow for depth
    ctx.shadowBlur = 4;
    ctx.shadowColor = p.color;
  }

  private drawButterfly(ctx: CanvasRenderingContext2D, p: Particle) {
    const wingFlap = Math.sin(this.time * 8 + p.phase!) * 0.8;
    const s = p.size;
    const colors = ["#CE93D8", "#AB47BC", "#E91E63", "#FF80AB", "#FF4081"];
    const wingColor = colors[Math.floor(p.amplitude! / 10) % colors.length];

    // Left wing
    ctx.save();
    ctx.scale(wingFlap, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 1.5, -s, -s * 2, s * 0.5, -s * 0.5, s * 0.8);
    ctx.bezierCurveTo(-s * 0.2, s * 0.3, 0, s * 0.2, 0, 0);
    ctx.fillStyle = wingColor;
    ctx.globalAlpha = 0.7;
    ctx.fill();

    // Upper left wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 2, -s * 1.5, -s * 1.5, -s * 0.5, -s * 0.3, -s * 0.3);
    ctx.fillStyle = wingColor;
    ctx.fill();
    ctx.restore();

    // Right wing (mirror)
    ctx.save();
    ctx.scale(-wingFlap, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 1.5, -s, -s * 2, s * 0.5, -s * 0.5, s * 0.8);
    ctx.bezierCurveTo(-s * 0.2, s * 0.3, 0, s * 0.2, 0, 0);
    ctx.fillStyle = wingColor;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 2, -s * 1.5, -s * 1.5, -s * 0.5, -s * 0.3, -s * 0.3);
    ctx.fillStyle = wingColor;
    ctx.fill();
    ctx.restore();

    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.1, s * 0.6, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#4A148C";
    ctx.globalAlpha = 1;
    ctx.fill();
  }

  // ─── DRAW SUMMER ───────────────────────────────────────────────────────────
  private drawSummer(ctx: CanvasRenderingContext2D, W: number, H: number) {
    // Sun
    const sunX = W * 0.85;
    const sunY = H * 0.12;
    const sunR = Math.min(W, H) * 0.09;

    // Outer glow
    const glow = ctx.createRadialGradient(sunX, sunY, sunR * 0.5, sunX, sunY, sunR * 3);
    glow.addColorStop(0, "rgba(255,230,100,0.35)");
    glow.addColorStop(0.4, "rgba(255,200,50,0.15)");
    glow.addColorStop(1, "rgba(255,150,50,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * 3, 0, Math.PI * 2);
    ctx.fill();

    // Rays
    const numRays = 12;
    for (let i = 0; i < numRays; i++) {
      const rayAngle = (i / numRays) * Math.PI * 2 + this.time * 0.3;
      const inner = sunR * 1.1;
      const outer = sunR * 1.6 + Math.sin(this.time * 2 + i) * sunR * 0.15;
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(rayAngle);
      ctx.beginPath();
      ctx.moveTo(inner, -2);
      ctx.lineTo(outer, 0);
      ctx.lineTo(inner, 2);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,230,80,0.6)";
      ctx.fill();
      ctx.restore();
    }

    // Sun disc
    const sunGrad = ctx.createRadialGradient(sunX - sunR * 0.3, sunY - sunR * 0.3, sunR * 0.1, sunX, sunY, sunR);
    sunGrad.addColorStop(0, "#FFFDE7");
    sunGrad.addColorStop(0.5, "#FFD600");
    sunGrad.addColorStop(1, "#FF8F00");
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();

    // Lens flare streaks
    const flareColors = ["rgba(255,255,255,0.3)", "rgba(255,230,100,0.2)", "rgba(255,200,50,0.15)"];
    [0.3, 0.55, 0.75].forEach((t, i) => {
      const fx = sunX + (W * 0.5 - sunX) * t;
      const fy = sunY + (H * 0.5 - sunY) * t;
      const fr = 15 - i * 3;
      const fGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, fr * 3);
      fGrad.addColorStop(0, flareColors[i]);
      fGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(fx, fy, fr * 3, 0, Math.PI * 2);
      ctx.fillStyle = fGrad;
      ctx.fill();
    });

    // Heat shimmer motes
    for (const p of this.particles) {
      p.phase! += 0.03;
      p.x += p.vx + Math.sin(p.phase!) * p.amplitude!;
      p.y += p.vy;
      p.life! += 1;
      if (p.life! > p.maxLife! || p.y < -10) {
        p.y = H + 10;
        p.x = Math.random() * W;
        p.life = 0;
        p.opacity = Math.random() * 0.3 + 0.05;
      }
      const lifeRatio = p.life! / p.maxLife!;
      const alpha = Math.sin(lifeRatio * Math.PI) * p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // ─── DRAW AUTUMN ───────────────────────────────────────────────────────────
  private drawAutumn(ctx: CanvasRenderingContext2D, W: number, H: number) {
    for (const p of this.particles) {
      p.phase! += 0.025;
      p.x += p.vx + Math.sin(p.phase! + p.y * 0.01) * p.amplitude!;
      p.y += p.vy;
      p.angle += p.angularV;
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      this.drawLeaf(ctx, p.color, p.size);
      ctx.restore();
    }
  }

  private drawLeaf(ctx: CanvasRenderingContext2D, color: string, size: number) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 1.2, -size * 0.5, size * 1.2, size * 0.5, 0, size);
    ctx.bezierCurveTo(-size * 1.2, size * 0.5, -size * 1.2, -size * 0.5, 0, -size);
    ctx.fillStyle = color;
    ctx.fill();
    // Vein
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ─── DRAW WINTER ───────────────────────────────────────────────────────────
  private drawWinter(ctx: CanvasRenderingContext2D, W: number, H: number) {
    for (const p of this.particles) {
      p.phase! += 0.015;
      p.x += p.vx + Math.sin(p.phase!) * p.amplitude! * 0.5;
      p.y += p.vy;
      p.angle += p.angularV;
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      const arms = parseInt(p.type!.split("_")[1] || "6");
      this.drawSnowflake(ctx, p.color, p.size, arms);
      ctx.restore();
    }
    // Snow slope
    this.drawSnowSlope(ctx, W, H);

    // Snowman
    this.drawSnowman(ctx, W, H);
  }

  private drawSnowSlope(ctx: CanvasRenderingContext2D, W: number, H: number) {
    ctx.save();
    
    // Background Hill
    ctx.fillStyle = "rgba(225, 235, 255, 0.45)";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.7);
    ctx.bezierCurveTo(W * 0.3, H * 0.6, W * 0.7, H * 0.9, W, H * 0.75);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Foreground Slope
    const slopeGrad = ctx.createLinearGradient(0, H * 0.75, 0, H);
    slopeGrad.addColorStop(0, "#ffffff");
    slopeGrad.addColorStop(1, "#e3f2fd");
    ctx.fillStyle = slopeGrad;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.85);
    ctx.bezierCurveTo(W * 0.4, H * 0.75, W * 0.6, H * 0.95, W, H * 0.8);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Subtle shading to add depth to the "piste"
    ctx.strokeStyle = "rgba(180, 200, 240, 0.2)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.86);
    ctx.bezierCurveTo(W * 0.4, H * 0.76, W * 0.6, H * 0.96, W, H * 0.81);
    ctx.stroke();

    ctx.restore();
  }

  private drawSnowflake(ctx: CanvasRenderingContext2D, color: string, size: number, arms: number) {
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, size * 0.12);
    ctx.lineCap = "round";
    for (let i = 0; i < arms; i++) {
      const angle = (i / arms) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size);
      // Side branches
      const branchLen = size * 0.35;
      [size * 0.4, size * 0.7].forEach(pos => {
        ctx.moveTo(0, pos);
        ctx.lineTo(branchLen * 0.7, pos + branchLen * 0.7);
        ctx.moveTo(0, pos);
        ctx.lineTo(-branchLen * 0.7, pos + branchLen * 0.7);
      });
      ctx.stroke();
      ctx.restore();
    }
    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  private drawSnowman(ctx: CanvasRenderingContext2D, W: number, H: number) {
    const x = W * 0.88;
    const baseR = Math.min(H * 0.09, 70);
    const midR = baseR * 0.73;
    const headR = baseR * 0.52;
    const baseY = H - baseR * 0.5;

    // Bottom
    const shad1 = ctx.createRadialGradient(x - baseR * 0.2, baseY - baseR * 0.2, baseR * 0.1, x, baseY, baseR);
    shad1.addColorStop(0, "#ffffff");
    shad1.addColorStop(1, "#c5cae9");
    ctx.beginPath();
    ctx.arc(x, baseY, baseR, 0, Math.PI * 2);
    ctx.fillStyle = shad1;
    ctx.fill();

    // Middle
    const midY = baseY - baseR - midR * 0.8;
    const shad2 = ctx.createRadialGradient(x - midR * 0.2, midY - midR * 0.2, midR * 0.1, x, midY, midR);
    shad2.addColorStop(0, "#ffffff");
    shad2.addColorStop(1, "#c5cae9");
    ctx.beginPath();
    ctx.arc(x, midY, midR, 0, Math.PI * 2);
    ctx.fillStyle = shad2;
    ctx.fill();

    // Head
    const headY = midY - midR - headR * 0.85;
    const shad3 = ctx.createRadialGradient(x - headR * 0.2, headY - headR * 0.2, headR * 0.1, x, headY, headR);
    shad3.addColorStop(0, "#ffffff");
    shad3.addColorStop(1, "#c5cae9");
    ctx.beginPath();
    ctx.arc(x, headY, headR, 0, Math.PI * 2);
    ctx.fillStyle = shad3;
    ctx.fill();

    // Eyes
    [-headR * 0.3, headR * 0.3].forEach(ox => {
      ctx.beginPath();
      ctx.arc(x + ox, headY - headR * 0.1, headR * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = "#1a237e";
      ctx.fill();
    });

    // Carrot nose
    ctx.beginPath();
    ctx.moveTo(x, headY);
    ctx.lineTo(x + headR * 0.65, headY + headR * 0.07);
    ctx.lineTo(x, headY + headR * 0.08);
    ctx.closePath();
    ctx.fillStyle = "#FF6D00";
    ctx.fill();

    // Smile (Happier dots)
    for (let i = -2; i <= 2; i++) {
      const angle = (i / 4) * Math.PI * 0.7; // Tighter smile
      const dotX = x + Math.sin(angle) * headR * 0.5;
      const dotY = headY + headR * 0.4 + Math.cos(angle) * (headR * 0.15); // Deeper curve
      ctx.beginPath();
      ctx.arc(dotX, dotY, headR * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = "#1a237e";
      ctx.fill();
    }

    // Buttons
    [0, 0.35, 0.7].forEach(t => {
      ctx.beginPath();
      ctx.arc(x, midY - midR * 0.5 + t * midR, midR * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "#1a237e";
      ctx.fill();
    });

    // Scarf (around the neck)
    const neckY = headY + headR * 0.85;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(x - headR * 0.75, neckY - headR * 0.1);
    ctx.quadraticCurveTo(x, neckY + headR * 0.3, x + headR * 0.75, neckY - headR * 0.1);
    ctx.strokeStyle = "#C62828";
    ctx.lineWidth = headR * 0.35;
    ctx.stroke();

    // Scarf tail
    ctx.beginPath();
    ctx.moveTo(x + headR * 0.5, neckY);
    ctx.quadraticCurveTo(x + headR * 0.6, neckY + headR * 0.6, x + headR * 0.3, neckY + headR * 1.2);
    ctx.lineWidth = headR * 0.3;
    ctx.stroke();

    // Stick arms
    ctx.beginPath();
    ctx.moveTo(x - midR, midY - midR * 0.1);
    ctx.lineTo(x - midR * 1.7, midY - midR * 0.6);
    ctx.moveTo(x + midR, midY - midR * 0.1);
    ctx.lineTo(x + midR * 1.7, midY - midR * 0.6);
    ctx.strokeStyle = "#4e342e";
    ctx.lineWidth = Math.max(2, midR * 0.1);
    ctx.lineCap = "round";
    ctx.stroke();
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.resize);
  }
}
