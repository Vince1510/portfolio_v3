import { createTheme, Theme, alpha } from "@mui/material/styles";

// ── Brand Tokens ─────────────────────────────────────────────────────────────
export const ACCENT_DARK  = "#7be08b"; // green  — active state in dark mode
export const ACCENT_LIGHT = "#8c63e0"; // purple — active state in light mode
export const STAR_COLOR   = "#faaf00";
export const LINK_COLOR   = "#4893FD";

// ── Theme Builder ─────────────────────────────────────────────────────────────
export const buildTheme = (darkMode: boolean): Theme => {
  const accent = darkMode ? ACCENT_DARK : ACCENT_LIGHT;

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: accent,
      },
      background: {
        default: darkMode ? "#000510" : "#f5f5f5",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
    },
    components: {
      // ── AppBar: fully transparent — glass styles live in Emotion ─────────
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            backgroundImage: "none",
            boxShadow: "none",
            backdropFilter: "none",
          },
        },
      },
      // ── Button: language toggle pill ──────────────────────────────────────
      MuiButton: {
        styleOverrides: {
          outlined: ({ theme }) => ({
            borderRadius: 20,
            fontWeight: 700,
            minWidth: "auto",
            padding: "4px 8px",
            textTransform: "uppercase" as const,
            borderColor: alpha(theme.palette.text.primary, 0.3),
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.text.primary, 0.08),
            },
          }),
        },
      },
      // ── Card: consistent border radius ───────────────────────────────────
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      // ── CircularProgress: brand colour ───────────────────────────────────
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: LINK_COLOR,
          },
        },
      },
    },
  });
};
