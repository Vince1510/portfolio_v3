import React from "react";
import "./ThemeSwitcher.css";

interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <div>
      <div className="switch">
        <input
          type="checkbox"
          className="switch__input"
          id="Switch"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <label className="switch__label" htmlFor="Switch">
          <span className="switch__indicator"></span>
          <span className="switch__decoration"></span>
        </label>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
