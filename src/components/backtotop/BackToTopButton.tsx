import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const buttonStyle = {
  width: "50px",
  padding: 0,
  boxShadow: "none",
  margin: 0,
  borderRadius: "50%",
  opacity: 0.8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "transparent",
  zIndex: 1000,
};

const arrowStyle = (buttonColor: string) => ({
  color: buttonColor,
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  padding: "5px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px #7be08b, 0 0 20px #e09545",
});

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonColor =
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black;

  return (
    <Button
      onClick={scrollToTop}
      variant="contained"
      style={
        {
          ...buttonStyle,
          display: isVisible ? "flex" : "none",
        } as React.CSSProperties
      }
    >
      <span style={arrowStyle(buttonColor)}>↑</span>
    </Button>
  );
};

export default BackToTopButton;
