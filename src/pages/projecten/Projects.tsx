import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./Projects.css";

import mernImg from "./mern-auth-cover.png";
import portfolioImg from "./portfolio-site.png";
import playtoearnImg from "./play-to-earn.png";
import putitoneImg from "./putiton-e.png";
import tiktactoeImg from "./video-tik-tac-toe.mp4"; // We'll render this as a video element

interface ProjectData {
  title: string;
  description: string;
  link: string;
  mediaUrl: string;
  mediaType: "image" | "video";
}

const projects: ProjectData[] = [
  {
    title: "MERN Auth",
    description:
      "Ik heb van NetNinja geleerd hoe ik mern-stack projecten kan maken met JSON web tokens.",
    link: "https://github.com/Vince1510/MERN-Auth",
    mediaUrl: mernImg,
    mediaType: "image",
  },
  {
    title: "Portfolio Website",
    description:
      "Deze portfolio website is gemaakt met Typescript en Material UI.",
    link: "https://github.com/Vince1510/portfolio_v3",
    mediaUrl: portfolioImg,
    mediaType: "image",
  },
  {
    title: "Putiton-e",
    description:
      "Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website Putiton-e.",
    link: "https://putiton-e.com/",
    mediaUrl: putitoneImg,
    mediaType: "image",
  },
  {
    title: "Play to Earn games",
    description:
      "Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website Play to Earn games.",
    link: "https://playtoearngames.com/",
    mediaUrl: playtoearnImg,
    mediaType: "image",
  },
  {
    title: "Tic Tac Toe",
    description: "Tic tac toe volledig met React voor 2 spelers.",
    link: "https://github.com/Vince1510/Tic-Tac-Toe",
    mediaUrl: tiktactoeImg,
    mediaType: "video",
  },
];

export default function Project() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentProject = projects[value];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        px: { xs: 2, sm: 4, md: 8 },
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Projects navigation"
        sx={{
          mb: 4,
          maxWidth: "100%",
          "& .MuiTabs-flexContainer": {
            justifyContent: isSmallScreen ? "flex-start" : "center",
          },
        }}
      >
        {projects.map((proj, idx) => (
          <Tab key={idx} label={proj.title} />
        ))}
      </Tabs>

      <Card
        className="card-project-glass"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          boxShadow: theme.palette.mode === "dark" ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)",
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
          },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
            minHeight: isSmallScreen ? "250px" : "400px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.2)",
          }}
        >
          {currentProject.mediaType === "image" ? (
            <CardMedia
              component="img"
              image={currentProject.mediaUrl}
              alt={currentProject.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                p: 2,
              }}
            />
          ) : (
            <Box
              component="video"
              src={currentProject.mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}
        >
          <CardContent sx={{ p: 0, pb: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="text.primary">
              {currentProject.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
              {currentProject.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 0, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<LinkIcon />}
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "20px",
                px: 4,
                bgcolor: "#8c63e0",
                "&:hover": {
                  bgcolor: "#784bd1",
                },
              }}
            >
              View Project
            </Button>
          </CardActions>
        </Box>
        
        {/* Ambient background glows */}
        <div className="projectanimate1"></div>
        <div className="projectanimate2"></div>
      </Card>
    </Box>
  );
}
