import * as React from "react";

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

// Local Imports

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

  return (
    <div className="projects-wrapper">
      <Typography
        variant="h4"
        component="h1"
        className="projects-heading"
      >
        {translate("projects.heading")}
      </Typography>

      <div className="projects-grid">
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              className="project-card"
            >
              <div className="project-card-media">
                <img src={project.mediaUrl} alt={project.title} draggable={false} />
                <div className="project-card-glow" />
              </div>

              <div className="project-card-info">
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="project-card-title">{project.title}</h2>
                <p className="project-card-desc">{translate(`projects.items.${index}.description`)}</p>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LinkIcon />}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-button"
                >
                  {translate("projects.viewProject")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
