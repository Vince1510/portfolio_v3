import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { gsap } from "gsap";
import "./index.scss";
import ResponsiveAppBar from "./components/appbar/AppBar";
import CustomScrollLine from "./components/customscroll/CustomScrollLine";
import BackToTopButton from "./components/backtotop/BackToTopButton";
import VerticalTabs from "./components/verticaltabs/VerticalTabs";
import HeaderPage from "./pages/header/Header";
import SkillsPage from "./pages/skills/Skills";
import ProjectPage from "./pages/projecten/Projects";
import ContactPage from "./pages/contact/Contact";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const refs = {
    headerRef: useRef<HTMLDivElement>(null),
    skillsRef: useRef<HTMLDivElement>(null),
    projectsRef: useRef<HTMLDivElement>(null),
    contactRef: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Load a Circle Texture for the Particles
    const textureLoader = new THREE.TextureLoader();
    const circleTexture = textureLoader.load(
      "https://threejs.org/examples/textures/sprites/circle.png"
    );

    // Particle Setup
    const particlesCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x8c63e0,
      map: circleTexture,
      transparent: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 10; // Start camera further out

    // GSAP Landing Animation for camera and particles
    gsap.to(camera.position, {
      z: 5, // Zoom into position
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      particlesMaterial,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.inOut" }
    );

    const mouse = {
      x: 0,
      y: 0,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      particles.position.x = mouse.x * 2;
      particles.position.y = mouse.y * 2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "light" : "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-theme={darkMode ? "light" : "dark"}>
        <VerticalTabs scrollToRef={refs} />
        <CustomScrollLine />

        <div id="header" ref={refs.headerRef}>
          <ResponsiveAppBar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <HeaderPage />
        </div>
        <div id="skills" ref={refs.skillsRef}>
          <SkillsPage />
        </div>
        <div id="projects" ref={refs.projectsRef}>
          <ProjectPage />
        </div>
        <div id="contact" ref={refs.contactRef}>
          <ContactPage />
        </div>

        <BackToTopButton />

        <canvas
          ref={canvasRef}
          style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
