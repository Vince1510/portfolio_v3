import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./VerticalTabs.css";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface ScrollToRef {
  scrollToRef: {
    headerRef: React.RefObject<HTMLDivElement>;
    skillsRef: React.RefObject<HTMLDivElement>;
    projectsRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
  };
}

const handleTabClick = (
  index: number,
  setActiveTab: (index: number) => void,
  togglePopup: () => void
) => {
  setActiveTab(index);
  togglePopup(); // Close the popup when a tab is clicked
};

export default function VerticalTabs({ scrollToRef }: ScrollToRef) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const togglePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

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
          switch (entry.target.id) {
            case "header":
              setActiveTab(0);
              break;
            case "skills":
              setActiveTab(1);
              break;
            case "projects":
              setActiveTab(2);
              break;
            case "contact":
              setActiveTab(3);
              break;
            default:
              setActiveTab(0);
          }
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
    const { headerRef, skillsRef, projectsRef, contactRef } = scrollToRef;
    let targetRef: React.RefObject<HTMLDivElement> | null = null;

    switch (index) {
      case 0:
        targetRef = headerRef;
        break;
      case 1:
        targetRef = skillsRef;
        break;
      case 2:
        targetRef = projectsRef;
        break;
      case 3:
        targetRef = contactRef;
        break;
      default:
        break;
    }

    if (targetRef?.current) {
      gsap.to(window, {
        scrollTo: { y: targetRef.current, autoKill: false }, // scrollTo the element
        duration: 1, // duration of the animation
        ease: "bounce.out", // easing function for bounce effect
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
          <Tab
            label="<Home/>"
            onClick={() => handleTabClick(0)}
            className="vertical-tab"
          />
          <Tab
            label="<Skills/>"
            onClick={() => handleTabClick(1)}
            className="vertical-tab"
          />
          <Tab
            label="<Projects/>"
            onClick={() => handleTabClick(2)}
            className="vertical-tab"
          />
          <Tab
            label="<Contact/>"
            onClick={() => handleTabClick(3)}
            className="vertical-tab"
          />
        </Tabs>
      </Box>
    </Box>
  );
}
