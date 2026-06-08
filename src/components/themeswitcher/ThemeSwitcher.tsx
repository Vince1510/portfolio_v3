import React from "react";

// Styles
import "./ThemeSwitcher.scss";

interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleDarkMode: (event?: React.MouseEvent) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleDarkMode(e);
  };

  return (
    <div className="switch" onClick={handleClick}>
      <input
        type="checkbox"
        className="switch__input"
        id="Switch"
        checked={!darkMode}
        readOnly
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      />
      <label className="switch__label" htmlFor="Switch">
        <span className="switch__indicator"></span>
        <span className="switch__decoration"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
