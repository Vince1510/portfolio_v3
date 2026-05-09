import React, { useState, useMemo, Suspense, lazy } from "react"; // v1.1
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import ResponsiveAppBar from "./components/appbar/AppBar";
import VerticalTabs from "./components/verticaltabs/VerticalTabs";
import FullPageSection from "./components/fullpage/FullPageSection";
import { useFullPage } from "./components/fullpage/useFullPage";
import LoadingScreen from "./components/loadingscreen/LoadingScreen";
import OrientationOverlay from "./components/orientation/OrientationOverlay";

const HeaderPage = lazy(() => import("./pages/header/Header"));
const SkillsPage = lazy(() => import("./pages/skills/Skills"));
const ProjectPage = lazy(() => import("./pages/projecten/Projects"));
const ContactPage = lazy(() => import("./pages/contact/Contact"));
const BackgroundCanvas = lazy(() => import("./components/background/BackgroundCanvas"));

const TOTAL_SECTIONS = 4;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [appLoaded, setAppLoaded] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const { activeIndex, goToSection } = useFullPage(TOTAL_SECTIONS);

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

        {/* Dynamic animated background & UI - synchronized fade in */}
        <div
          style={{
            opacity: showUI ? 1 : 0,
            transition: "opacity 1.2s ease",
            pointerEvents: showUI ? "auto" : "none",
          }}
        >
          <Suspense fallback={null}>
            <BackgroundCanvas darkMode={darkMode} activeIndex={activeIndex} />
          </Suspense>

          <VerticalTabs activeTab={activeIndex} onTabClick={goToSection} />

          <ResponsiveAppBar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

            <FullPageSection index={0} activeIndex={activeIndex} id="header">
              <Suspense fallback={null}>
                <HeaderPage />
              </Suspense>
            </FullPageSection>

            <FullPageSection index={1} activeIndex={activeIndex} id="skills">
              <Suspense fallback={null}>
                <SkillsPage />
              </Suspense>
            </FullPageSection>

            <FullPageSection index={2} activeIndex={activeIndex} id="projects">
              <Suspense fallback={null}>
                <ProjectPage />
              </Suspense>
            </FullPageSection>

            <FullPageSection index={3} activeIndex={activeIndex} id="contact">
              <Suspense fallback={null}>
                <ContactPage />
              </Suspense>
            </FullPageSection>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
