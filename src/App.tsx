import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./index.scss";
import ResponsiveAppBar from "./components/appbar/AppBar";
import VerticalTabs from "./components/verticaltabs/VerticalTabs";
import HeaderPage from "./pages/header/Header";
import SkillsPage from "./pages/skills/Skills";
import ProjectPage from "./pages/projecten/Projects";
import ContactPage from "./pages/contact/Contact";

import FullPageSection from "./components/fullpage/FullPageSection";
import { useFullPage } from "./components/fullpage/useFullPage";

const TOTAL_SECTIONS = 4;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { activeIndex, goToSection } = useFullPage(TOTAL_SECTIONS);

  const toggleDarkMode = (event?: React.MouseEvent) => {
    const isViewTransitionSupported =
      // @ts-ignore
      document.startViewTransition !== undefined;

    if (!isViewTransitionSupported || !event) {
      setDarkMode((prevMode) => !prevMode);
      return;
    }

    const { clientX: x, clientY: y } = event;
    const right = window.innerWidth - x;
    const bottom = window.innerHeight - y;
    const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    document.documentElement.style.setProperty("--r", `${maxRadius}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      setDarkMode((prevMode) => !prevMode);
    });
  };

  useEffect(() => {
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

    const textureLoader = new THREE.TextureLoader();
    const circleTexture = textureLoader.load(
      "https://threejs.org/examples/textures/sprites/circle.png"
    );

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
      size: 0.03,
      color: 0x8c63e0,
      map: circleTexture,
      transparent: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-theme={darkMode ? "dark" : "light"}>
        <VerticalTabs activeTab={activeIndex} onTabClick={goToSection} />

        <ResponsiveAppBar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <FullPageSection index={0} activeIndex={activeIndex} id="header">
          <HeaderPage />
        </FullPageSection>

        <FullPageSection index={1} activeIndex={activeIndex} id="skills">
          <SkillsPage />
        </FullPageSection>

        <FullPageSection index={2} activeIndex={activeIndex} id="projects">
          <ProjectPage />
        </FullPageSection>

        <FullPageSection index={3} activeIndex={activeIndex} id="contact">
          <ContactPage />
        </FullPageSection>

        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -10,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
