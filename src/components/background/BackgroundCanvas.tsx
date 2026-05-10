import React, { useEffect, useRef } from "react";

// Local Imports
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

  useEffect(() => {
    if (seasonalRef.current) seasonalRef.current.setScene(activeIndex);
    if (cosmicRef.current) cosmicRef.current.setScene(activeIndex);
  }, [activeIndex]);

  // Pause the hidden background to save performance
  useEffect(() => {
    if (seasonalRef.current) seasonalRef.current.setPaused(darkMode);
    if (cosmicRef.current) cosmicRef.current.setPaused(!darkMode);
  }, [darkMode]);

  return (
    <>
      <canvas
        ref={seasonalCanvasRef}
        className="background-canvas seasonal"
      />
      <canvas
        ref={cosmicCanvasRef}
        className="background-canvas cosmic"
      />
    </>
  );
};

export default BackgroundCanvas;
