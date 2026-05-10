import React from "react";

// Styles
import "./FullPageSection.scss";

interface FullPageSectionProps {
  index: number;
  activeIndex: number;
  children: React.ReactNode;
  id?: string;
}

const FullPageSection: React.FC<FullPageSectionProps> = ({
  index,
  activeIndex,
  children,
  id,
}) => {
  let statusClass = "";
  if (index === activeIndex) {
    statusClass = "section--active";
  } else if (index < activeIndex) {
    statusClass = "section--above";
  } else {
    statusClass = "section--below";
  }

  return (
    <section id={id} className={`full-page-section ${statusClass}`}>
      <div className="full-page-content">{children}</div>
    </section>
  );
};

export default FullPageSection;
