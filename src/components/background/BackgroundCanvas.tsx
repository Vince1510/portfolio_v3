import React, { useEffect, useRef } from "react";

// Local Imports
import { SeasonalBackground } from "./SeasonalBackground";
import { SpaceBackground } from "./SpaceBackground";

interface BackgroundCanvasProps {
  darkMode: boolean;
  activeIndex: number;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  darkMode,
  activeIndex,
}) => {
  const seasonalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const spaceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const seasonalRef = useRef<SeasonalBackground | null>(null);
  const spaceRef = useRef<SpaceBackground | null>(null);

  useEffect(() => {
    const sCanvas = seasonalCanvasRef.current;
    const cCanvas = spaceCanvasRef.current;
    if (!sCanvas || !cCanvas) return;

    const seasonal = new SeasonalBackground(sCanvas);
    seasonalRef.current = seasonal;
    seasonal.init();

    const space = new SpaceBackground(cCanvas);
    spaceRef.current = space;
    space.init();

    return () => {
      seasonal.destroy();
      space.destroy();
      seasonalRef.current = null;
      spaceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (seasonalRef.current) seasonalRef.current.setScene(activeIndex);
    if (spaceRef.current) spaceRef.current.setScene(activeIndex);
  }, [activeIndex]);

  // Pause the hidden background to save performance
  useEffect(() => {
    if (seasonalRef.current) seasonalRef.current.setPaused(darkMode);
    if (spaceRef.current) spaceRef.current.setPaused(!darkMode);
  }, [darkMode]);

  return (
    <>
      <canvas
        ref={seasonalCanvasRef}
        className="background-canvas seasonal"
      />
      <canvas
        ref={spaceCanvasRef}
        className="background-canvas space"
      />
    </>
  );
};

export default BackgroundCanvas;
