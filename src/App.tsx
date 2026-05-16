import React, { useState, useMemo, Suspense, lazy } from "react";

// MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

// Local Component Imports
import { Routes, Route, useLocation } from "react-router-dom";
import ResponsiveAppBar from "./components/appbar/AppBar";
import Dock, { DockItem } from "./components/dock/Dock";
import LoadingScreen from "./components/loadingscreen/LoadingScreen";
import OrientationOverlay from "./components/orientation/OrientationOverlay";

// About Page Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoIcon from "@mui/icons-material/Info";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

// Styles
import "./index.scss";

// Lazy Loaded Components
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const AboutPage = lazy(() => import("./pages/about/About"));
const MoviesPage = lazy(() => import("./pages/movies/Movies"));
const SeriesPage = lazy(() => import("./pages/series/Series"));
const VacationPage = lazy(() => import("./pages/vacation/Vacation"));
const BackgroundCanvas = lazy(() => import("./components/background/BackgroundCanvas"));

const SECTION_IDS = ["header", "skills", "projects", "contact"];

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [appLoaded, setAppLoaded] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const isAboutPage = location.pathname.startsWith("/about");

  // Sync theme to document element for global CSS targeting
  // ... (rest of the logic remains same)
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

        <Suspense fallback={null}>
          <div className={`background-container ui-fade ${showUI ? "visible" : ""}`}>
            <BackgroundCanvas darkMode={darkMode} activeIndex={isAboutPage ? 4 : activeIndex} />
          </div>
        </Suspense>

        <Routes>
          <Route 
            path="/" 
            element={
              <Suspense fallback={null}>
                <LandingPage showUI={showUI} onActiveIndexChange={setActiveIndex} />
              </Suspense>
            } 
          />
          <Route 
            path="/about" 
            element={
              <Suspense fallback={null}>
                <AboutPage showUI={showUI} />
              </Suspense>
            } 
          />
          <Route 
            path="/about/movies" 
            element={
              <Suspense fallback={null}>
                <MoviesPage />
              </Suspense>
            } 
          />
          <Route 
            path="/about/series" 
            element={
              <Suspense fallback={null}>
                <SeriesPage />
              </Suspense>
            } 
          />
          <Route 
            path="/about/vacation" 
            element={
              <Suspense fallback={null}>
                <VacationPage />
              </Suspense>
            } 
          />
        </Routes>

        <Dock 
          activeIndex={isAboutPage ? (
            location.pathname.replace(/\/$/, "") === "/about" ? 1 :
            location.pathname.startsWith("/about/movies") ? 2 :
            location.pathname.startsWith("/about/series") ? 3 :
            location.pathname.startsWith("/about/vacation") ? 4 : 0
          ) : activeIndex} 
          items={isAboutPage ? [
            { icon: <ArrowBackIosIcon />, labelKey: "nav.home", path: "/" },
            { icon: <InfoIcon />, labelKey: "nav.aboutMe", path: "/about" },
            { icon: <MovieIcon />, labelKey: "nav.movies", path: "/about/movies" },
            { icon: <TvIcon />, labelKey: "nav.series", path: "/about/series" },
            { icon: <BeachAccessIcon />, labelKey: "nav.vacation", path: "/about/vacation" },
          ] : undefined}
          sectionIds={isAboutPage ? [] : SECTION_IDS}
          className={`ui-fade ${showUI ? "visible" : ""}`}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
