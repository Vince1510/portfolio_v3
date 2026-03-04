import { useState, useEffect, useCallback } from "react";

export const useFullPage = (numSections: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Constants
  const LOCK_TIMEOUT = 700; // time in ms to ignore consecutive scrolls

  const goToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < numSections && !isLocked) {
        setActiveIndex(index);
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), LOCK_TIMEOUT);
      }
    },
    [numSections, isLocked]
  );

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // Ignore if currently locked or doing a horizontal scroll
      if (isLocked || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Check if we are inside a scrollable element
      let target = e.target as HTMLElement;
      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        if (style.getPropertyValue("overflow-y") === "auto" || style.getPropertyValue("overflow-y") === "scroll") {
          const isAtTop = target.scrollTop === 0;
          const isAtBottom = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
          if (e.deltaY > 0 && !isAtBottom) return; // Still can scroll down internally
          if (e.deltaY < 0 && !isAtTop) return;   // Still can scroll up internally
        }
        target = target.parentElement as HTMLElement;
      }

      if (e.deltaY > 20) {
        // Scroll down -> next section
        goToSection(activeIndex + 1);
      } else if (e.deltaY < -20) {
        // Scroll up -> previous section
        goToSection(activeIndex - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Find if we are inside a scrollable element
      let target = e.target as HTMLElement;
      let canScroll = false;
      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        const overflowY = style.getPropertyValue("overflow-y");
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          target.scrollHeight > target.clientHeight
        ) {
          canScroll = true;
          // Check if we are at the top/bottom to allow swiping out
          const isAtTop = target.scrollTop === 0;
          const isAtBottom = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
          const currentY = e.touches[0].clientY;
          const isScrollingUp = currentY > touchStartY;
          const isScrollingDown = currentY < touchStartY;

          if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            // At boundary and trying to swipe further -> Allow full page transition
            canScroll = false;
          } else {
            // Still have space to scroll internally -> Don't prevent default, allow scrolling
            return;
          }
        }
        target = target.parentElement as HTMLElement;
      }
      
      if (!canScroll) e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLocked) return;
      
      // Do the same check for TouchEnd swiping
      let target = e.target as HTMLElement;
      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        if (style.getPropertyValue("overflow-y") === "auto" || style.getPropertyValue("overflow-y") === "scroll") {
          const isAtTop = target.scrollTop === 0;
          const isAtBottom = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
          const deltaY = touchStartY - e.changedTouches[0].clientY;
          
          if (Math.abs(deltaY) > 50) {
             if (deltaY > 0 && !isAtBottom) return; // Swiping up to scroll down internally
             if (deltaY < 0 && !isAtTop) return;   // Swiping down to scroll up internally
          }
        }
        target = target.parentElement as HTMLElement;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Threshold for a swipe
      if (deltaY > 50) {
        // Swipe up -> scroll down
        goToSection(activeIndex + 1);
      } else if (deltaY < -50) {
        // Swipe down -> scroll up
        goToSection(activeIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        goToSection(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        goToSection(activeIndex - 1);
      }
    };

    // Passive: false is needed to preventDefault on touchmove
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, goToSection, isLocked]);

  return { activeIndex, setActiveIndex, goToSection };
};
