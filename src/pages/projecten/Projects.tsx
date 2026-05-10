import * as React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// MUI Imports
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";

// Assets & Styles
import mernImg from "../../assets/images/mern-auth-cover.png";
import portfolioImg from "../../assets/images/portfolio-site.png";
import playtoearnImg from "../../assets/images/play-to-earn.png";
import putitoneImg from "../../assets/images/putiton-e.png";
import tiktactoeImg from "../../assets/images/tic-tac-toe.png";
import iamImg from "../../assets/images/iam-self-service.png";
import witgoedImg from "../../assets/images/Witgoed-Hellevoetsluis.png";
import krausImg from "../../assets/images/Teamkraus.png";
import "./Projects.scss";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface ProjectData {
  title: string;
  description: string;
  link: string;
  mediaUrl: string;
  tags: string[];
}

const projects: ProjectData[] = [
  {
    title: "Witgoed Hellevoetsluis",
    description:
      "Website gemaakt voor Witgoed Hellevoetsluis en Meubeldiscount met React, TypeScript en MUI.",
    link: "https://www.meubeldiscountbzoon.com/",
    mediaUrl: witgoedImg,
    tags: ["React", "TypeScript", "MUI"],
  },
  {
    title: "Enovation IAM Self Service",
    description:
      "Tijdens mijn stage bij Enovation heb ik de IAM Self Service applicatie gemigreerd van Angular 1 naar Angular v18.",
    link: "https://enovationgroup.com/",
    mediaUrl: iamImg,
    tags: ["Angular v18", "Migration", "Stage"],
  },
  {
    title: "Team Kraus",
    description:
      "De officiële website voor Albert Kraus en Gradus Kraus, gemaakt met HTML, CSS en JavaScript.",
    link: "https://teamkraus.nl/",
    mediaUrl: krausImg,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Portfolio Website",
    description:
      "Deze portfolio website is gemaakt met Typescript en Material UI.",
    link: "https://github.com/Vince1510/portfolio_v3",
    mediaUrl: portfolioImg,
    tags: ["React", "TypeScript", "MUI", "Three.js"],
  },
  {
    title: "Putiton-e",
    description:
      "Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website Putiton-e.",
    link: "https://putiton-e.com/",
    mediaUrl: putitoneImg,
    tags: ["Stage", "Crebos", "Web"],
  },
  {
    title: "Play to Earn",
    description:
      "Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website Play to Earn games.",
    link: "https://playtoearngames.com/",
    mediaUrl: playtoearnImg,
    tags: ["Stage", "Crebos", "Gaming"],
  },
  {
    title: "Tic Tac Toe",
    description: "Tic tac toe volledig met React voor 2 spelers.",
    link: "https://tictactoe-vince.web.app",
    mediaUrl: tiktactoeImg,
    tags: ["React", "Game", "2-Player"],
  },
  {
    title: "MERN Auth",
    description:
      "Ik heb van NetNinja geleerd hoe ik mern-stack projecten kan maken met JSON web tokens.",
    link: "https://github.com/Vince1510/MERN-Auth",
    mediaUrl: mernImg,
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export default function Project() {
  const { translate } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isAutoScrolling = useRef(false);

  // 1. DYNAMIC CENTERING PADDING
  // We need to add padding to the container so that the first and last cards can be centered.
  const updatePadding = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector(".carousel-card") as HTMLElement;
    if (!firstCard) return;
    
    // Total padding to center a card: (containerWidth - cardWidth) / 2
    const padding = (track.clientWidth - firstCard.offsetWidth) / 2;
    track.style.paddingLeft = `${padding}px`;
    track.style.paddingRight = `${padding}px`;
  }, []);

  useEffect(() => {
    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, [updatePadding]);

  // 2. INTERSECTION OBSERVER FOR ACTIVE INDEX
  // Highly performant way to track which card is currently centered
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observerOption = {
      root: track,
      threshold: 0.6, // Fire when 60% of the card is visible
      rootMargin: "0px -25% 0px -25%" // Focus on the center area
    };

    const callback: IntersectionObserverCallback = (entries) => {
      if (isAutoScrolling.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOption);
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // 3. ROBUST NAVIGATION
  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    isAutoScrolling.current = true;
    setActiveIndex(index);
    
    // Temporarily disable snap to allow GSAP to scroll smoothly
    track.style.scrollSnapType = "none";

    const targetOffset = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;

    gsap.to(track, {
      scrollTo: { x: targetOffset },
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isAutoScrolling.current = false;
        track.style.scrollSnapType = "x mandatory";
      }
    });
  };

  // 4. MOUSE DRAG HELPER
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollLeftStart.current = trackRef.current?.scrollLeft || 0;
    if (trackRef.current) {
      trackRef.current.style.scrollSnapType = "none";
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // multiplier for speed
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  return (
    <div className="projects-wrapper">
      <Typography
        variant="h4"
        component="h1"
        className="projects-heading"
      >
        {translate("projects.heading")}
      </Typography>

      <div
        ref={trackRef}
        className="carousel-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`carousel-card ${isActive ? "carousel-card--active" : ""}`}
              onClick={() => goTo(index)}
            >
              <div className="carousel-card-media">
                <img src={project.mediaUrl} alt={project.title} draggable={false} />
                <div className="carousel-card-glow" />
              </div>

              <div className="carousel-card-info">
                <div className="carousel-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="carousel-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="carousel-card-title">{project.title}</h2>
                <p className="carousel-card-desc">{translate(`projects.items.${index}.description`)}</p>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LinkIcon />}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="project-link-button"
                >
                  {translate("projects.viewProject")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === activeIndex ? "carousel-dot--active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Ga naar project ${index + 1}`}
          />
        ))}
      </div>

      <p className="carousel-counter">
        {activeIndex + 1} / {projects.length}
      </p>
    </div>
  );
}
