import React, { useState, useEffect } from "react";
import "./CustomScrollLine.scss";

const CustomScrollLine: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(scrollPercentage);
    };

    window.addEventListener("scroll", updateScrollPercentage);

    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
    };
  }, []);

  return (
    <>
      <div
        className="custom-scroll-line top"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
      <div
        className="custom-scroll-line bottom"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
      <div
        className="custom-scroll-line left"
        style={{ height: `${scrollPercentage}%` }}
      ></div>
      <div
        className="custom-scroll-line right"
        style={{ height: `${scrollPercentage}%` }}
      ></div>
    </>
  );
};

export default CustomScrollLine;
