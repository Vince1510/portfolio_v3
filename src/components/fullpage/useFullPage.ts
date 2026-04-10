import { useState, useEffect, useRef, useCallback } from "react";

export const useFullPage = (numSections: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLockedRef = useRef(false);

  // Must be >= animation duration so the animation finishes before the next one starts.
  const LOCK_TIMEOUT = 1000;

  const goToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < numSections && !isLockedRef.current) {
        isLockedRef.current = true;
        setActiveIndex(index);
        setTimeout(() => {
          isLockedRef.current = false;
        }, LOCK_TIMEOUT);
      }
    },
    [numSections]
  );

  // Keep a stable ref to activeIndex so event handlers always see the latest value
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;

    // --- Wheel / trackpad ---
    let accumulatedDelta = 0;
    let lastWheelTime = 0;
    const WHEEL_RESET_MS = 150;

    const isInsideVerticalScrollable = (
      target: HTMLElement,
      deltaY: number
    ): boolean => {
      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflow = style.getPropertyValue("overflow-y");
        if (overflow === "auto" || overflow === "scroll") {
          const atTop = el.scrollTop === 0;
          const atBottom =
            Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
          if (deltaY > 0 && !atBottom) return true;
          if (deltaY < 0 && !atTop) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const isInsideHorizontalScrollable = (target: HTMLElement): boolean => {
      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowX = style.getPropertyValue("overflow-x");
        if (
          (overflowX === "auto" || overflowX === "scroll") &&
          el.scrollWidth > el.clientWidth
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      // Ignore horizontal scroll (e.g. trackpad sidescroll or carousel drag)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // If inside a vertically scrollable container that still has room, let it scroll
      if (isInsideVerticalScrollable(e.target as HTMLElement, e.deltaY)) return;

      e.preventDefault();

      if (isLockedRef.current) {
        accumulatedDelta = 0;
        return;
      }

      const now = Date.now();
      if (now - lastWheelTime > WHEEL_RESET_MS) {
        accumulatedDelta = 0;
      }
      lastWheelTime = now;
      accumulatedDelta += e.deltaY;

      const THRESHOLD = 80;
      if (accumulatedDelta > THRESHOLD) {
        accumulatedDelta = 0;
        goToSection(activeIndexRef.current + 1);
      } else if (accumulatedDelta < -THRESHOLD) {
        accumulatedDelta = 0;
        goToSection(activeIndexRef.current - 1);
      }
    };

    // --- Touch (mobile) ---
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLockedRef.current) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const absDeltaX = Math.abs(currentX - touchStartX);
      const absDeltaY = Math.abs(currentY - touchStartY);

      // If swipe is primarily horizontal, allow native horizontal scroll
      // (e.g. project carousel) — do NOT prevent default
      if (absDeltaX > absDeltaY) {
        if (isInsideHorizontalScrollable(e.target as HTMLElement)) {
          return; // Let the carousel handle it natively
        }
      }

      // Check vertical scrollable container
      let target = e.target as HTMLElement;
      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        const overflow = style.getPropertyValue("overflow-y");
        if (
          (overflow === "auto" || overflow === "scroll") &&
          target.scrollHeight > target.clientHeight
        ) {
          const atTop = target.scrollTop === 0;
          const atBottom =
            Math.ceil(target.scrollTop + target.clientHeight) >=
            target.scrollHeight;
          const goingUp = currentY < touchStartY;
          const goingDown = currentY > touchStartY;

          if ((atTop && goingDown) || (atBottom && goingUp)) {
            break; // At boundary → allow full-page transition
          }
          return; // Not at boundary → allow native scroll
        }
        target = target.parentElement as HTMLElement;
      }

      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLockedRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = Math.abs(touchStartX - touchEndX);

      // Only trigger vertical section change if swipe is more vertical than horizontal
      if (deltaX > Math.abs(deltaY)) return;

      if (deltaY > 50) {
        goToSection(activeIndexRef.current + 1);
      } else if (deltaY < -50) {
        goToSection(activeIndexRef.current - 1);
      }
    };

    // --- Keyboard ---
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        goToSection(activeIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        goToSection(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToSection]);

  return { activeIndex, setActiveIndex, goToSection };
};
