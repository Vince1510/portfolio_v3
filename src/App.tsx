import React, { useState, useMemo, Suspense, lazy } from "react";

// MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

// Local Component Imports
import ResponsiveAppBar from "./components/appbar/AppBar";
import Dock from "./components/dock/Dock";
import LoadingScreen from "./components/loadingscreen/LoadingScreen";
import OrientationOverlay from "./components/orientation/OrientationOverlay";
import { useActiveSection } from "./hooks/useActiveSection";

// Styles
import "./index.scss";

// Lazy Loaded Pages
const HeaderPage = lazy(() => import("./pages/header/Header"));
const SkillsPage = lazy(() => import("./pages/skills/Skills"));
const ProjectPage = lazy(() => import("./pages/projecten/Projects"));
const ContactPage = lazy(() => import("./pages/contact/Contact"));
const BackgroundCanvas = lazy(() => import("./components/background/BackgroundCanvas"));

const SECTION_IDS = ["header", "skills", "projects", "contact"];

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [appLoaded, setAppLoaded] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const activeIndex = useActiveSection(SECTION_IDS);

  // Sync theme to document element for global CSS targeting
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Implement "Real VH" method - Locked to prevent Layout Shift on scroll
  React.useEffect(() => {
    let lastWidth = window.innerWidth;

    const setRealVh = () => {
      // Only update if the width changes (orientation change) 
      // to prevent layout shift when address bar hides/shows
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        lastWidth = currentWidth;
      }
    };

    // Initial set
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", setRealVh);
    return () => window.removeEventListener("resize", setRealVh);
  }, []);

  const toggleDarkMode = (event?: React.MouseEvent) => {
    const isViewTransitionSupported = document.startViewTransition !== undefined;

    if (!isViewTransitionSupported || !event) {
      setDarkMode((prevMode) => !prevMode);
      return;
    }

    const { clientX: x, clientY: y } = event;
    const right = window.innerWidth - x;
    const bottom = window.innerHeight - y;
    const maxRadius =
      Math.hypot(Math.max(x, right), Math.max(y, bottom)) * 1.2;

    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    document.documentElement.style.setProperty("--r", `${maxRadius}px`);

    document.startViewTransition(() => {
      setDarkMode((prevMode) => !prevMode);
    });
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="app-root"
        data-theme={darkMode ? "dark" : "light"}
        data-season={["spring", "summer", "autumn", "winter"][activeIndex]}
      >
        <OrientationOverlay />
        {/* Loading screen overlay */}
        {!appLoaded && (
          <LoadingScreen
            darkMode={darkMode}
            onFadeStart={() => setShowUI(true)}
            onComplete={() => setAppLoaded(true)}
          />
        )}

        <ResponsiveAppBar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          className={`ui-fade ${showUI ? "visible" : ""}`}
        />

        {/* Dynamic animated background */}
        <Suspense fallback={null}>
          <div className={`background-container ui-fade ${showUI ? "visible" : ""}`}>
            <BackgroundCanvas darkMode={darkMode} activeIndex={activeIndex} />
          </div>
        </Suspense>

        <main 
          className={`scroll-container ui-fade ${showUI ? "visible" : ""}`}
        >
          <section id="header" className="page-section">
            <Suspense fallback={null}>
              <HeaderPage />
            </Suspense>
          </section>

          <section id="skills" className="page-section">
            <Suspense fallback={null}>
              <SkillsPage />
            </Suspense>
          </section>

          <section id="projects" className="page-section">
            <Suspense fallback={null}>
              <ProjectPage />
            </Suspense>
          </section>

          <section id="contact" className="page-section">
            <Suspense fallback={null}>
              <ContactPage />
            </Suspense>
          </section>
        </main>

        <Dock 
          activeIndex={activeIndex} 
          sectionIds={SECTION_IDS}
          className={`ui-fade ${showUI ? "visible" : ""}`}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
