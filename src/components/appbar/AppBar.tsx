import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ThemeSwitcher from "../themeswitcher/ThemeSwitcher";
import { useLanguage } from "../../context/LanguageContext";
import "./AppBar.scss";

interface ResponsiveAppBarProps {
  darkMode: boolean;
  toggleDarkMode: (event?: React.MouseEvent) => void;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={toggleLanguage}
              variant="outlined"
              size="small"
              sx={{
                minWidth: "auto",
                px: 1,
                py: 0.5,
                borderRadius: "20px",
                borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                color: darkMode ? "#fff" : "#000",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: darkMode ? "#fff" : "#000",
                  backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }
              }}
            >
              {language.toUpperCase()}
            </Button>
            <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
