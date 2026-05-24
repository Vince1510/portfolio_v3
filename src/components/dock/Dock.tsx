import React from "react";
import { styled, keyframes, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { ACCENT_DARK, ACCENT_LIGHT } from "../../theme/theme";

// Default icon imports
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// ── Keyframe animations (replaces Dock.scss @keyframes) ──────────────────────
const animFirstGlass = keyframes`
  from { transform: translateY(0) scale(1); }
  to   { transform: translateY(100px) scale(1.2); }
`;

const animSecondGlass = keyframes`
  from { transform: translateY(0) scale(1); }
  to   { transform: translateY(-100px) scale(1.2); }
`;

const dockDotIn = keyframes`
  from { transform: translateX(-50%) scale(0); opacity: 0; }
  to   { transform: translateX(-50%) scale(1); opacity: 1; }
`;

// ── Styled components (replaces Dock.scss) ───────────────────────────────────
const DockRoot = styled("nav")({
  position: "fixed",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  pointerEvents: "none",
  "@media (max-width: 480px)": {
    bottom: "calc(24px + env(safe-area-inset-bottom))",
    width: "95%",
    display: "flex",
    justifyContent: "center",
  },
});

const DockTrack = styled("div")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "8px 12px",
  borderRadius: 20,
  pointerEvents: "auto",
  background:
    theme.palette.mode === "dark"
      ? "rgba(10,10,30,0.55)"
      : "rgba(255,255,255,0.7)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.08)"
  }`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)"
      : "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
  "@media (max-width: 480px)": {
    gap: 0,
    padding: "4px 8px",
    borderRadius: 18,
    scale: "0.9",
  },
}));

const GlowOrb = styled("div", {
  shouldForwardProp: (p) => p !== "variant",
})<{ variant: "first" | "second" }>(({ variant }) => ({
  width: 300,
  height: 300,
  position: "absolute",
  borderRadius: "50%",
  zIndex: -1,
  pointerEvents: "none",
  filter: "blur(60px)",
  ...(variant === "first"
    ? {
        top: -120,
        left: -100,
        backgroundColor: "#7be08b",
        opacity: 0.2,
        animation: `${animFirstGlass} 15s linear infinite alternate`,
      }
    : {
        bottom: -120,
        right: -100,
        backgroundColor: "#e09545",
        opacity: 0.15,
        animation: `${animSecondGlass} 20s linear infinite alternate`,
      }),
}));

// Defined before DockItemButton so Emotion can use component interpolation
const DockLabel = styled("span", {
  shouldForwardProp: (p) => p !== "active",
})<{ active?: boolean }>(({ active }) => ({
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
  opacity: active ? 1 : 0,
  maxHeight: active ? 20 : 0,
  overflow: "hidden",
  transition: "all 0.25s ease",
  "@media (max-width: 480px)": {
    fontSize: 7,
  },
}));

const IconWrapper = styled("span")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    fontSize: 22,
    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    "@media (max-width: 480px)": {
      fontSize: 18,
    },
  },
});

const DockItemButton = styled("button", {
  shouldForwardProp: (p) => p !== "active",
})<{ active?: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === "dark";
  const accent = isDark ? ACCENT_DARK : ACCENT_LIGHT;

  return {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: "8px 14px",
    border: "none",
    background: active ? alpha(accent, 0.1) : "transparent",
    cursor: "pointer",
    borderRadius: 14,
    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    color: active ? accent : alpha(theme.palette.text.primary, 0.5),
    // Hover state
    "&:hover": {
      transform: "translateY(-4px) scale(1.1)",
      color: active ? accent : alpha(theme.palette.text.primary, 0.9),
      background: alpha(theme.palette.text.primary, 0.05),
      [`& ${IconWrapper} svg`]: { transform: "scale(1.15)" },
      [`& ${DockLabel}`]: { opacity: 1, maxHeight: 20 },
    },
    "@media (max-width: 480px)": {
      padding: "6px 8px",
    },
  };
});

const DockIndicator = styled("span")(({ theme }) => ({
  position: "absolute",
  bottom: 2,
  left: "50%",
  transform: "translateX(-50%)",
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: theme.palette.mode === "dark" ? ACCENT_DARK : ACCENT_LIGHT,
  animation: `${dockDotIn} 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards`,
}));

// ── Types & defaults ─────────────────────────────────────────────────────────
export interface DockItem {
  icon: React.ReactNode;
  labelKey: string;
  path?: string;
  sectionId?: string;
}

interface DockProps {
  activeIndex: number;
  items?: DockItem[];
  sectionIds?: string[];
  className?: string;
}

const defaultDockItems: DockItem[] = [
  { icon: <HomeIcon />, labelKey: "nav.home", sectionId: "header" },
  { icon: <CodeIcon />, labelKey: "nav.skills", sectionId: "skills" },
  { icon: <FolderOpenIcon />, labelKey: "nav.projects", sectionId: "projects" },
  { icon: <MailOutlineIcon />, labelKey: "nav.contact", sectionId: "contact" },
];

// ── Component ────────────────────────────────────────────────────────────────
const Dock: React.FC<DockProps> = ({ activeIndex, items, sectionIds, className }) => {
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const currentItems = items || defaultDockItems;

  const handleClick = (item: DockItem, index: number) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.sectionId) {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (sectionIds?.[index]) {
      document.getElementById(sectionIds[index])?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <DockRoot aria-label="Site navigation" className={className}>
      <DockTrack>
        <GlowOrb variant="first" />
        <GlowOrb variant="second" />
        {currentItems.map((item, index) => {
          const active = index === activeIndex;
          return (
            <DockItemButton
              key={index}
              active={active}
              onClick={() => handleClick(item, index)}
              aria-label={translate(item.labelKey)}
              title={translate(item.labelKey)}
            >
              <IconWrapper>{item.icon}</IconWrapper>
              <DockLabel active={active}>{translate(item.labelKey)}</DockLabel>
              {active && <DockIndicator />}
            </DockItemButton>
          );
        })}
      </DockTrack>
    </DockRoot>
  );
};

export default Dock;
