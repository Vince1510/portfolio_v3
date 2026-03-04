import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ThemeSwitcher from "../themeswitcher/ThemeSwitcher";
import logoLight from "./apeldoorn-logo.png";
import logoDark from "./logo-apeldoorn-dark.png";
import "./AppBar.scss";

interface ResponsiveAppBarProps {
  darkMode: boolean;
  toggleDarkMode: (event?: React.MouseEvent) => void;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "none",
        boxShadow: "none",
        backgroundImage: "none",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "none",
      }}
    >
      <Container maxWidth="xl" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              cursor: "default",
              fontFamily: "monospace",
              fontWeight: 700,
              color: darkMode ? "inherit" : "black",
              textDecoration: "none",
              display: { xs: "block", md: "flex" },
            }}
          >
            {"<Vince/>"}
          </Typography>
          <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
