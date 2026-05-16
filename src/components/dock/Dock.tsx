import React from "react";

// MUI Imports
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { Link, useNavigate } from "react-router-dom";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";

// Styles
import "./Dock.scss";

export interface DockItem {
  icon: React.ReactNode;
  labelKey: string;
  path?: string; // For routing
  sectionId?: string; // For scrolling
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

const Dock: React.FC<DockProps> = ({ activeIndex, items, sectionIds, className }) => {
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const currentItems = items || defaultDockItems;

  const handleClick = (item: DockItem, index: number) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (sectionIds && sectionIds[index]) {
      const el = document.getElementById(sectionIds[index]);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className={`dock ${className || ""}`} aria-label="Site navigation">
      <div className="dock-track">
        <div className="contactanimate1" />
        <div className="contactanimate2" />
        {currentItems.map((item, index) => (
          <button
            key={index}
            className={`dock-item ${index === activeIndex ? "dock-item--active" : ""}`}
            onClick={() => handleClick(item, index)}
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
