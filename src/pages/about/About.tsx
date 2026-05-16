import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardActionArea, Typography, Box } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useLanguage } from "../../context/LanguageContext";
import "./About.scss";

interface AboutPageProps {
  showUI: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ showUI }) => {
  const { translate } = useLanguage();

  const hubCards = [
    {
      title: translate("about.moviesTitle"),
      description: translate("about.moviesDesc"),
      icon: <MovieIcon sx={{ fontSize: 50, color: 'white' }} />,
      path: "/about/movies",
      color: "#7be08b",
      image: "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg" // Interstellar
    },
    {
      title: translate("about.seriesTitle"),
      description: translate("about.seriesDesc"),
      icon: <TvIcon sx={{ fontSize: 50, color: 'white' }} />,
      path: "/about/series",
      color: "#3bc1b6",
      image: "https://image.tmdb.org/t/p/w500/kv1nRqgebSsREnd7vdC2pSGjpLo.jpg" // Lost in Space
    },
    {
      title: translate("about.vacationTitle"),
      description: translate("about.vacationDesc"),
      icon: <BeachAccessIcon sx={{ fontSize: 50, color: 'white' }} />,
      path: "/about/vacation",
      color: "#e09545",
      image: "https://www.image2url.com/r2/default/images/1778869621846-1ff9a0d4-f692-4fa7-823f-080d103a0fad.jpg" // Mallorca
    }
  ];

  return (
    <Box className={`about-container ui-fade ${showUI ? "visible" : ""}`}>
      <Box className="about-content">
        <Box className="about-header">
          <Typography variant="h2" component="h1" gutterBottom className="about-title">
            {translate("about.heading")}
          </Typography>
          <Typography variant="h6" color="text.secondary" className="about-subtitle">
            {translate("about.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={4} className="about-cards-container">
          {hubCards.map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Link to={card.path} style={{ textDecoration: 'none' }}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div 
                      className="flip-card-front" 
                      style={{ backgroundImage: `url(${card.image})` }}
                    >
                      <div className="flip-card-front-overlay">
                        <Typography variant="h4" className="flip-card-front-title">
                          {card.title}
                        </Typography>
                      </div>
                    </div>
                    <div className="flip-card-back" style={{ backgroundColor: card.color }}>
                      <Box className="flip-card-icon">
                        {card.icon}
                      </Box>
                      <Typography gutterBottom variant="h5" component="h2" className="flip-card-back-title">
                        {card.title}
                      </Typography>
                      <Typography variant="body1" className="flip-card-back-desc">
                        {card.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutPage;
