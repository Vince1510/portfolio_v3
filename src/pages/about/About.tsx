import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../../context/LanguageContext";
import { moviesData } from "../../data/moviesData";
import { seriesData } from "../../data/seriesData";
import { polarstepsData } from "../../data/polarstepsData";
import "./About.scss";

interface AboutPageProps {
  showUI: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ showUI }) => {
  const { translate } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const hubItems = useMemo(() => {
    const movieImages = moviesData.slice(0, 60).map((m) => m.image);
    const seriesImages = seriesData.slice(0, 35).map((s) => s.image);
    

    const customVacationImages: string[] = [
      "https://www.image2url.com/r2/default/images/1778869621846-1ff9a0d4-f692-4fa7-823f-080d103a0fad.jpg",
      "https://www.image2url.com/r2/default/images/1778932883277-8429ee09-be04-442f-9a01-86a248fb61c4.jpg",
      "https://www.image2url.com/r2/default/images/1778936419140-b9294b85-69d4-4cad-ab5c-0558ec310fad.jpg",
      "https://www.image2url.com/r2/default/images/1778936698415-c2e76669-0719-453b-ba03-477168f0ca82.jpg"
    ];

    let vacationImages: string[] = [];

    if (customVacationImages.length > 0) {
      vacationImages = customVacationImages.slice(0, 12);
    } else {
      // Gather vacation images from polarsteps automatically
      const allVacationImages: string[] = [];
      Object.values(polarstepsData).forEach(steps => {
        steps.forEach(step => {
          if (step.imageUrl && step.imageUrl.trim() !== "") {
            allVacationImages.push(step.imageUrl);
          }
        });
      });
      vacationImages = allVacationImages.slice(0, 12);
    }

    return [
      {
        title: "Movies I like",
        path: "/about/movies",
        images: movieImages,
        ratio: "9/16",
        gridClass: "grid-vertical"
      },
      {
        title: "Series I like",
        path: "/about/series",
        images: seriesImages,
        ratio: "9/16",
        gridClass: "grid-vertical"
      },
      {
        title: "My vacations",
        path: "/about/vacation",
        images: vacationImages,
        ratio: "16/9",
        gridClass: "grid-horizontal"
      }
    ];
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % hubItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + hubItems.length) % hubItems.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext(); // Swipe left
    } else if (diff < -50) {
      handlePrev(); // Swipe right
    }
    touchStartX.current = null;
  };

  return (
    <Box 
      className={`about-container ui-fade ${showUI ? "visible" : ""}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Slider */}
      <Box className="about-bg-slider">
        {hubItems.map((item, index) => (
          <Box
            key={index}
            className={`about-bg-slide ${index === activeIndex ? "active" : ""}`}
          >
            <div className={`about-bg-grid ${item.gridClass}`}>
              {item.images.map((img, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className="about-bg-grid-item"
                  style={{ 
                    backgroundImage: `url(${img})`, 
                    aspectRatio: item.ratio 
                  }}
                />
              ))}
            </div>
          </Box>
        ))}
        <Box className="about-bg-overlay" />
      </Box>

      {/* Content */}
      <Box className="about-content-fullscreen slider-layout">
        <Box className="about-header-simple">
          <Typography variant="h6" color="text.secondary" className="about-subtitle-fade">
            {translate("about.subtitle")}
          </Typography>
        </Box>

        <Box className="slider-controls">
          <IconButton onClick={handlePrev} className="slider-arrow prev-arrow">
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          
          <Box className="slider-title-wrapper">
            {hubItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`slider-title-link ${index === activeIndex ? "active" : ""}`}
              >
                <Typography variant="h1" className="about-big-title">
                  {item.title}
                </Typography>
                <Typography variant="overline" className="explore-text">
                  Tap to explore
                </Typography>
              </Link>
            ))}
          </Box>

          <IconButton onClick={handleNext} className="slider-arrow next-arrow">
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box className="slider-dots">
          {hubItems.map((_, index) => (
            <Box
              key={index}
              className={`slider-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
