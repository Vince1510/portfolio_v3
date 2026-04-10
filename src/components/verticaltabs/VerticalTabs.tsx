import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./VerticalTabs.scss";

interface VerticalTabsProps {
  activeTab: number;
  onTabClick: (index: number) => void;
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({
  activeTab,
  onTabClick,
}) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  const handleOutsideClick = React.useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  }, []);

  React.useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopupOpen, handleOutsideClick]);

  const handleTabClick = (index: number) => {
    onTabClick(index);
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
          scrollButtons={false}
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
