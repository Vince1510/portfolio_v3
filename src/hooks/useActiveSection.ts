import { useState, useEffect, useRef } from "react";

/**
 * Lightweight hook that uses IntersectionObserver to track
 * which section is most visible in the viewport.
 */
export const useActiveSection = (sectionIds: string[]): number => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ratioMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.current.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with the highest visibility ratio
        let maxRatio = 0;
        let maxIndex = 0;
        sectionIds.forEach((id, index) => {
          const ratio = ratioMap.current.get(id) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxIndex = index;
          }
        });

        setActiveIndex(maxIndex);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeIndex;
};
