import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import ThemeSwitcher from "../themeswitcher/ThemeSwitcher";
import Drawer from "@mui/material/Drawer";
import "./AppBar.scss";

interface ResponsiveAppBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        paddingLeft: 0,
        paddingRight: 0,
        backgroundImage: 'none',
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
              color: darkMode ? "black" : "inherit",
              textDecoration: "none",
              display: { xs: "block", md: "flex" },
            }}
          >
            {"<Vince/>"}
          </Typography>
          <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Toolbar>
        


        <Hidden mdUp>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
            <div
              style={{
                width: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div></div>
            </div>
          </Drawer>
        </Hidden>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
