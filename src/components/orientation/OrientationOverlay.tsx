import React from "react";

// Styles
import "./OrientationOverlay.scss";

const OrientationOverlay: React.FC = () => {
  return (
    <div className="orientation-overlay">
      <div className="orientation-content">
        <div className="rotate-device-icon">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="phone-svg"
          >
            {/* Phone Body */}
            <rect
              x="30"
              y="15"
              width="40"
              height="70"
              rx="6"
              stroke="currentColor"
              strokeWidth="4"
            />
            {/* Screen */}
            <rect
              x="35"
              y="22"
              width="30"
              height="50"
              rx="2"
              fill="currentColor"
              fillOpacity="0.2"
            />
            {/* Button */}
            <circle cx="50" cy="78" r="3" fill="currentColor" />
          </svg>
          <div className="arrow-svg">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M70 20C110 20 95 45 80 80"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M75 15L70 20L75 25"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1>Kantel je apparaat</h1>
        <p>Voor de beste ervaring op mijn website, houd je telefoon verticaal.</p>
      </div>
    </div>
  );
};

export default OrientationOverlay;
