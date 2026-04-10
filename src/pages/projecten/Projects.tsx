import * as React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import { useTheme } from "@mui/material/styles";
import "./Projects.css";

import mernImg from "./mern-auth-cover.png";
import portfolioImg from "./portfolio-site.png";
import playtoearnImg from "./play-to-earn.png";
import putitoneImg from "./putiton-e.png";
import tiktactoeImg from "./video-tik-tac-toe.mp4";

interface ProjectData {
  title: string;
  description: string;
  link: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  tags: string[];
}

const projects: ProjectData[] = [
  {
    title: "MERN Auth",
    description:
      "Ik heb van NetNinja geleerd hoe ik mern-stack projecten kan maken met JSON web tokens.",
    link: "https://github.com/Vince1510/MERN-Auth",
    mediaUrl: mernImg,
    mediaType: "image",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Portfolio Website",
    description:
      "Deze portfolio website is gemaakt met Typescript en Material UI.",
    link: "https://github.com/Vince1510/portfolio_v3",
    mediaUrl: portfolioImg,
    mediaType: "image",
    tags: ["React", "TypeScript", "MUI", "Three.js"],
  },
  {
    title: "Putiton-e",
    description:
      "Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website Putiton-e.",
    link: "https://putiton-e.com/",
    mediaUrl: putitoneImg,
    mediaType: "image",
    tags: ["Stage", "Crebos", "Web"],
  },
  {
    title: "Play to Earn",
    description:
      "Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website Play to Earn games.",
    link: "https://playtoearngames.com/",
    mediaUrl: playtoearnImg,
    mediaType: "image",
    tags: ["Stage", "Crebos", "Gaming"],
  },
  {
    title: "Tic Tac Toe",
    description: "Tic tac toe volledig met React voor 2 spelers.",
    link: "https://github.com/Vince1510/Tic-Tac-Toe",
    mediaUrl: tiktactoeImg,
    mediaType: "video",
    tags: ["React", "Game", "2-Player"],
  },
];

export default function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // Mouse drag state
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // ── Center padding ──────────────────────────────────────────────────────────
  // Set padding so first/last card can be centered in the track
  const setCenterPadding = useCallback(() => {
    window.requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.querySelector<HTMLElement>(".carousel-card");
      if (!firstCard) return;
      const padding = Math.max(0, (track.clientWidth - firstCard.offsetWidth) / 2);
      track.style.paddingLeft = `${padding}px`;
      track.style.paddingRight = `${padding}px`;
    });
  }, []);

  useEffect(() => {
    setCenterPadding();
    const ro = new ResizeObserver(setCenterPadding);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [setCenterPadding]);

  const isAutoScrolling = useRef(false);

  // ── goTo ────────────────────────────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".carousel-card")
    );
    if (!cards[index]) return;
    
    isAutoScrolling.current = true;
    setActiveIndex(index);
    track.style.scrollSnapType = "none";

    const card = cards[index];
    const targetScrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: targetScrollLeft, behavior: "smooth" });

    // Re-enable snap logic after animation completes
    setTimeout(() => {
      isAutoScrolling.current = false;
      if (trackRef.current) trackRef.current.style.scrollSnapType = "";
    }, 600);
  }, []);

  // ── Active index from scroll ─────────────────────────────────────────────────
  const updateActive = useCallback(() => {
    if (isAutoScrolling.current) return;
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".carousel-card")
    );
    let minDist = Infinity;
    let idx = 0;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        idx = i;
      }
    });
    setActiveIndex(idx);
  }, []);

  // ── Mouse drag ───────────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left-click
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    scrollLeftStart.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grabbing";
      // Disable snap during drag for smooth feel
      trackRef.current.style.scrollSnapType = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeftStart.current - dx;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (track) {
      track.style.cursor = "grab";
      track.style.scrollSnapType = "";
      if (hasDragged.current) {
        updateActive();
        // Snap to nearest card
        setTimeout(() => {
          const updatedTrack = trackRef.current;
          if (!updatedTrack) return;
          const trackCenter =
            updatedTrack.scrollLeft + updatedTrack.clientWidth / 2;
          const cards = Array.from(
            updatedTrack.querySelectorAll<HTMLElement>(".carousel-card")
          );
          let minDist = Infinity;
          let idx = 0;
          cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(cardCenter - trackCenter);
            if (dist < minDist) {
              minDist = dist;
              idx = i;
            }
          });
          goTo(idx);
        }, 50);
      }
    }
  };

  const handleCardClick = (index: number) => {
    if (hasDragged.current) return;
    goTo(index);
  };

  return (
    <div className="projects-wrapper">
      {/* Title */}
      <Typography
        variant="h4"
        component="h1"
        align="center"
        fontWeight="bold"
        sx={{
          mb: { xs: 2, md: 3 },
          color: "text.primary",
          letterSpacing: "-0.5px",
        }}
      >
        Projecten
      </Typography>

      {/* ── Carousel track ───────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="carousel-track"
        onScroll={updateActive}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              className={`carousel-card ${isActive ? "carousel-card--active" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              {/* Media */}
              <div className="carousel-card-media">
                {project.mediaType === "image" ? (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    draggable={false}
                  />
                ) : (
                  <video
                    src={project.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
                {/* Overlay glow */}
                <div className="carousel-card-glow" />
              </div>

              {/* Info */}
              <div className="carousel-card-info">
                <div className="carousel-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="carousel-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="carousel-card-title">{project.title}</h2>
                <p className="carousel-card-desc">{project.description}</p>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LinkIcon />}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    mt: "auto",
                    alignSelf: "flex-start",
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    px: 2.5,
                    bgcolor: "#8c63e0",
                    fontSize: "0.8rem",
                    "&:hover": { bgcolor: "#784bd1" },
                  }}
                >
                  View Project
                </Button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ── Dot indicators ──────────────────────────────────────── */}
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

      {/* Project counter */}
      <p className="carousel-counter">
        {activeIndex + 1} / {projects.length}
      </p>
    </div>
  );
}
