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
  // We attach the click to the label/container to capture the exact mouse coordinates
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default checkbox action so our state toggle handles it
    toggleDarkMode(e);
  };

  return (
    <div className="switch" onClick={handleClick}>
      <input
        type="checkbox"
        className="switch__input"
        id="Switch"
        checked={!darkMode}
        readOnly // React to the container click instead
      />
      <label className="switch__label" htmlFor="Switch">
        <span className="switch__indicator"></span>
        <span className="switch__decoration"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
