import React from "react";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";
import ThemeSwitcher from "../themeswitcher/ThemeSwitcher";

// ── Replaces AppBar.scss entirely ────────────────────────────────────────────
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const BrandTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "monospace",
  fontWeight: 700,
  fontSize: "1.1rem",
  cursor: "default",
  color: theme.palette.text.primary,
  textDecoration: "none",
  display: "block",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
    display: "flex",
  },
})) as typeof Typography;

const ActionsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

// ── Component ────────────────────────────────────────────────────────────────
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
    <AppBar position="fixed" elevation={0} className={className}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, md: 0 } }}>
        <StyledToolbar disableGutters>
          <BrandTitle variant="h6" noWrap component="span">
            {"<Vince/>"}
          </BrandTitle>
          <ActionsBox>
            <Button onClick={toggleLanguage} variant="outlined" size="small">
              {language.toUpperCase()}
            </Button>
            <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </ActionsBox>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
