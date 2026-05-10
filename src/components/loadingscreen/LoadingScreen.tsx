import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Styles
import "./LoadingScreen.scss";

interface LoadingScreenProps {
  onComplete: () => void;
  onFadeStart: () => void;
  darkMode: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeStart, darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Smooth intro sequence for the loading screen itself
    gsap.fromTo(logoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });

    // We want to hold the screen for 2.5 seconds total (time for shaders/canvas to build/warmup), then fade out
    const tl = gsap.timeline({
      delay: 0.8,
      onComplete: () => {
        onComplete();
      }
    });

    // Pulsate the logo while waiting (2 seconds)
    tl.to(logoRef.current, {
      opacity: 0.4,
      scale: 0.95,
      yoyo: true,
      repeat: 3,
      duration: 0.4,
      ease: "power1.inOut"
    });

    // Zoom and fade out the container overlay
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: "power3.inOut",
      onStart: () => {
        onFadeStart();
      }
    });
  }, [onComplete, onFadeStart]);

  return (
    <div 
      ref={containerRef} 
      className={`loading-screen ${darkMode ? "dark" : "light"}`}
    >
      <h1 ref={logoRef} className="loading-logo">
        {"<Vince/>"}
      </h1> 
      <div className="spinner-3d">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
