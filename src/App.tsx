import React, { useState, useRef } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
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

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const refs = {
    headerRef: useRef<HTMLDivElement>(null),
    skillsRef: useRef<HTMLDivElement>(null),
    projectsRef: useRef<HTMLDivElement>(null),
    contactRef: useRef<HTMLDivElement>(null),
  };

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
          <ContactPage/>
        </div>

        <BackToTopButton />
      </div>
    </ThemeProvider>
  );
};

export default App;
