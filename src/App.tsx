import React, { useState } from "react"; // v1.1
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
import BackgroundCanvas from "./components/background/BackgroundCanvas";
import LoadingScreen from "./components/loadingscreen/LoadingScreen";
import OrientationOverlay from "./components/orientation/OrientationOverlay";

const TOTAL_SECTIONS = 4;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [appLoaded, setAppLoaded] = useState(false);
  const [showUI, setShowUI] = useState(false);
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
    const maxRadius =
      Math.hypot(Math.max(x, right), Math.max(y, bottom)) * 1.2;

    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    document.documentElement.style.setProperty("--r", `${maxRadius}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      setDarkMode((prevMode) => !prevMode);
    });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

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
          <BackgroundCanvas darkMode={darkMode} activeIndex={activeIndex} />

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
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
