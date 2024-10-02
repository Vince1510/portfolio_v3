import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./VerticalTabs.scss";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface ScrollToRef {
  headerRef: React.RefObject<HTMLDivElement>;
  skillsRef: React.RefObject<HTMLDivElement>;
  projectsRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const VerticalTabs: React.FC<{ scrollToRef: ScrollToRef }> = ({
  scrollToRef,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  React.useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopupOpen]);

  React.useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(
            {
              header: 0,
              skills: 1,
              projects: 2,
              contact: 3,
            }[entry.target.id] ?? 0
          );
        }
      });
    }, options);

    Object.values(scrollToRef).forEach((refObject) => {
      if (refObject.current) {
        observer.observe(refObject.current);
      }
    });

    return () => {
      Object.values(scrollToRef).forEach((refObject) => {
        if (refObject.current) {
          observer.unobserve(refObject.current);
        }
      });
    };
  }, [scrollToRef]);

  const handleTabClick = (index: number) => {
    const targetRef = [
      scrollToRef.headerRef,
      scrollToRef.skillsRef,
      scrollToRef.projectsRef,
      scrollToRef.contactRef,
    ][index];

    if (targetRef?.current) {
      gsap.to(window, {
        scrollTo: { y: targetRef.current, autoKill: false },
        duration: 1,
        ease: "bounce.out",
      });
    }

    setActiveTab(index);
    togglePopup();
  };

  return (
    <Box className="vertical-tabs-container">
      {isPopupOpen && <div className="vertical-tabs-popup-background" />}
      <Box
        className={`vertical-tabs-popup ${isPopupOpen ? "open" : ""}`}
        ref={popupRef}
      >
        <div className="arrow" onClick={togglePopup}>
          ᐳ
        </div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          value={activeTab}
        >
          {["<Home/>", "<Skills/>", "<Projects/>", "<Contact/>"].map(
            (label, index) => (
              <Tab
                key={index}
                label={label}
                onClick={() => handleTabClick(index)}
                className="vertical-tab"
              />
            )
          )}
        </Tabs>
      </Box>
    </Box>
  );
};

export default VerticalTabs;
