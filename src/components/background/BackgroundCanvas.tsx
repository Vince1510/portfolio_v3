import React, { useEffect, useRef } from "react";
import { SeasonalBackground } from "./SeasonalBackground";
import { CosmicBackground } from "./CosmicBackground";

interface BackgroundCanvasProps {
  darkMode: boolean;
  activeIndex: number;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  darkMode,
  activeIndex,
}) => {
  const seasonalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cosmicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const seasonalRef = useRef<SeasonalBackground | null>(null);
  const cosmicRef = useRef<CosmicBackground | null>(null);

  // Initialise engines on mount — no StrictMode guard so cleanup/reinit works
  useEffect(() => {
    const sCanvas = seasonalCanvasRef.current;
    const cCanvas = cosmicCanvasRef.current;
    if (!sCanvas || !cCanvas) return;

    const seasonal = new SeasonalBackground(sCanvas);
    seasonalRef.current = seasonal;
    seasonal.init();

    const cosmic = new CosmicBackground(cCanvas);
    cosmicRef.current = cosmic;
    cosmic.init();

    return () => {
      seasonal.destroy();
      cosmic.destroy();
      seasonalRef.current = null;
      cosmicRef.current = null;
    };
  }, []);

  // Sync section → both engines whenever activeIndex changes
  useEffect(() => {
    if (seasonalRef.current) seasonalRef.current.setScene(activeIndex);
    if (cosmicRef.current) cosmicRef.current.setScene(activeIndex);
  }, [activeIndex]);

  // Pause the hidden background to save performance
  useEffect(() => {
    if (seasonalRef.current) seasonalRef.current.setPaused(darkMode);
    if (cosmicRef.current) cosmicRef.current.setPaused(!darkMode);
  }, [darkMode]);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    transition: "opacity 0.6s ease",
    pointerEvents: "none",
  };

  return (
    <>
      {/* Canvas 2D — Seasonal light mode */}
      <canvas
        ref={seasonalCanvasRef}
        style={{
          ...baseStyle,
          zIndex: darkMode ? -20 : -10,
          opacity: darkMode ? 0 : 1,
        }}
      />
      {/* WebGL — Cosmic dark mode */}
      <canvas
        ref={cosmicCanvasRef}
        style={{
          ...baseStyle,
          zIndex: darkMode ? -10 : -20,
          opacity: darkMode ? 1 : 0,
        }}
      />
    </>
  );
};

export default BackgroundCanvas;
