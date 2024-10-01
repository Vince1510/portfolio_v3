import React, { useState, useRef } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./index.css";
import ResponsiveAppBar from "./appbar/AppBar";
import CustomScrollLine from "./customscroll/CustomScrollLine";
import BackToTopButton from "./backtotop/BackToTopButton";
import VerticalTabs from "./verticaltabs/VerticalTabs";
import HeaderPage from "./pages/header/Header";
import SkillsPage from "./pages/skills/Skills";
import ProjectPage from "./pages/projecten/Projects";
import ContactPage from "./pages/contact/Contact";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  //test

  const theme = createTheme({
    palette: {
      mode: darkMode ? "light" : "dark",
    },
  });

  const scrollToRef = { headerRef, skillsRef, projectsRef, contactRef };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-theme={darkMode ? "light" : "dark"}>
        <VerticalTabs scrollToRef={scrollToRef} />
        <CustomScrollLine />

        <div id="header" ref={headerRef}>
          <ResponsiveAppBar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <HeaderPage />
        </div>
        <div id="skills" ref={skillsRef}>
          <SkillsPage />
        </div>
        <div id="projects" ref={projectsRef}>
          <ProjectPage />
        </div>

        <div id="contact" ref={contactRef} className="page-break">
          <ContactPage
            name="Vince van Apeldoorn"
            email="vincevanapeldoorn@gmail.com"
            phone="+31 6 38457836"
          />
        </div>

        <BackToTopButton />
      </div>
    </ThemeProvider>
  );
};

export default App;
