import React from "react";

// MUI Imports
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";

// Styles
import "./Dock.scss";

interface DockProps {
  activeIndex: number;
  sectionIds: string[];
  className?: string;
}

const dockItems = [
  { icon: <HomeIcon />, labelKey: "nav.home" },
  { icon: <CodeIcon />, labelKey: "nav.skills" },
  { icon: <FolderOpenIcon />, labelKey: "nav.projects" },
  { icon: <MailOutlineIcon />, labelKey: "nav.contact" },
];

const Dock: React.FC<DockProps> = ({ activeIndex, sectionIds, className }) => {
  const { translate } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`dock ${className || ""}`} aria-label="Site navigation">
      <div className="dock-track">
        <div className="contactanimate1" />
        <div className="contactanimate2" />
        {dockItems.map((item, index) => (
          <button
            key={index}
            className={`dock-item ${index === activeIndex ? "dock-item--active" : ""}`}
            onClick={() => scrollTo(sectionIds[index])}
            aria-label={translate(item.labelKey)}
            title={translate(item.labelKey)}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{translate(item.labelKey)}</span>
            {index === activeIndex && <span className="dock-indicator" />}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Dock;
