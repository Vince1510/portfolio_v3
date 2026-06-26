import React, { useEffect, useRef } from "react";

// Local Imports
import { SeasonalBackground } from "./SeasonalBackground";
import R3FSpaceBackground from "./R3FSpaceBackground";

interface BackgroundCanvasProps {
  darkMode: boolean;
  activeIndex: number;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  darkMode,
  activeIndex,
}) => {
  const seasonalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const seasonalRef = useRef<SeasonalBackground | null>(null);

  // Lazy-init SeasonalBackground on first switch to light mode or if starting in light mode
  useEffect(() => {
    if (!darkMode && !seasonalRef.current && seasonalCanvasRef.current) {
      const seasonal = new SeasonalBackground(seasonalCanvasRef.current);
      seasonalRef.current = seasonal;
      seasonal.init();
      seasonal.setScene(activeIndex);
    }
    seasonalRef.current?.setPaused(darkMode);
  }, [darkMode, activeIndex]); 

  useEffect(() => {
    seasonalRef.current?.setScene(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (seasonalRef.current) {
        seasonalRef.current.destroy();
        seasonalRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <canvas 
        ref={seasonalCanvasRef} 
        className="background-canvas seasonal" 
        style={{ display: darkMode ? 'none' : 'block' }} 
      />
      <div 
        className="background-canvas space" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: -1,
          pointerEvents: 'none',
          display: !darkMode ? 'none' : 'block' 
        }}
      >
        <R3FSpaceBackground activeIndex={activeIndex} isPaused={!darkMode} />
      </div>
    </>
  );
};

export default BackgroundCanvas;
