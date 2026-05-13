import React from "react";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";

// Styles
import ThemeSwitcher from "../themeswitcher/ThemeSwitcher";
import "./AppBar.scss";

interface ResponsiveAppBarProps {
  darkMode: boolean;
  toggleDarkMode: (event?: React.MouseEvent) => void;
  className?: string;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  darkMode,
  toggleDarkMode,
  className = "",
}) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      className={`appbar-root ${className}`}
    >
      <Container maxWidth="xl" className="appbar-container">
        <Toolbar
          disableGutters
          className="appbar-toolbar"
        >
          <Typography
            variant="h6"
            noWrap
            className="appbar-title"
          >
            {"<Vince/>"}
          </Typography>
          <Box className="appbar-actions">
            {/* language toggle */}
            <Button
              onClick={toggleLanguage}
              variant="outlined"
              size="small"
              className="language-toggle"
            >
              {language.toUpperCase()}
            </Button>
            {/* light dark mode toggle */}
            <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
