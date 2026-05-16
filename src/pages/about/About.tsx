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
      icon: <MovieIcon sx={{ fontSize: 40 }} />,
      path: "/about/movies",
      color: "#7be08b"
    },
    {
      title: translate("about.seriesTitle"),
      description: translate("about.seriesDesc"),
      icon: <TvIcon sx={{ fontSize: 40 }} />,
      path: "/about/series",
      color: "#3bc1b6"
    },
    {
      title: translate("about.vacationTitle"),
      description: translate("about.vacationDesc"),
      icon: <BeachAccessIcon sx={{ fontSize: 40 }} />,
      path: "/about/vacation",
      color: "#e09545"
    }
  ];

  return (
    <Box className={`about-container ui-fade ${showUI ? "visible" : ""}`} sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            {translate("about.heading")}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
            {translate("about.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {hubCards.map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column",
                  borderRadius: 4,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-8px)" }
                }}
              >
                <CardActionArea component={Link} to={card.path} sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2, color: card.color }}>
                    {card.icon}
                  </Box>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutPage;
