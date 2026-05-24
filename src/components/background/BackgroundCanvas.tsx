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

  // Only init the canvas that is actually visible on mount.
  // SeasonalBackground (23 KB) is deferred until the user first switches to light mode.
  useEffect(() => {
    const cCanvas = spaceCanvasRef.current;
    if (!cCanvas) return;

    const space = new SpaceBackground(cCanvas);
    spaceRef.current = space;
    space.init();

    // Immediately init seasonal only if starting in light mode
    if (!darkMode && seasonalCanvasRef.current) {
      const seasonal = new SeasonalBackground(seasonalCanvasRef.current);
      seasonalRef.current = seasonal;
      seasonal.init();
    }

    return () => {
      space.destroy();
      spaceRef.current = null;
      seasonalRef.current?.destroy();
      seasonalRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount only

  // Lazy-init SeasonalBackground on first switch to light mode
  useEffect(() => {
    if (!darkMode && !seasonalRef.current && seasonalCanvasRef.current) {
      const seasonal = new SeasonalBackground(seasonalCanvasRef.current);
      seasonalRef.current = seasonal;
      seasonal.init();
      seasonal.setScene(activeIndex);
    }
    seasonalRef.current?.setPaused(darkMode);
    spaceRef.current?.setPaused(!darkMode);
  }, [darkMode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    seasonalRef.current?.setScene(activeIndex);
    spaceRef.current?.setScene(activeIndex);
  }, [activeIndex]);

  return (
    <>
      <canvas ref={seasonalCanvasRef} className="background-canvas seasonal" />
      <canvas ref={spaceCanvasRef} className="background-canvas space" />
    </>
  );
};

export default BackgroundCanvas;
